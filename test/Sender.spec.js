const expect = require('chai').expect
const ejs = require('ejs')
const qs = require('querystring')
const url = require('url')
const crypto = require('crypto')
const proxyquire = require('proxyquire')
const WechatMessage = require('../src/WechatMessage')
const MessageHelper = {
  encryptMessage: function (encryptor, content) {
    const encryptedTpl = '<xml><Encrypt><![CDATA[<%-encrypt%>]]></Encrypt></xml>'
    const compiledTpl = ejs.compile(encryptedTpl)
    const hash = crypto.createHash('sha256')
    const encryptMessage = hash.update(content).digest('hex')
    const encryptXml = compiledTpl({
      encrypt: encryptMessage,
    })
    return encryptXml
  },
}

const requestStub = {
  post: function (options, callback) {
    callback(null, {
      originUrl: options.url,
      statusCode: 200,
    }, options.body)
  },
}
const Sender = proxyquire('../src/Sender', {
  './MessageHelper': MessageHelper,
  request: requestStub,
})



describe('Sender', function () {

  it('should be able to create via constructor', function () {
    const sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
    expect(sender).to.be.instanceof(Sender)
  })

  describe('send()', function () {
    const message = new WechatMessage('event', 'click', {
      eventKey: 'event_key',
    })
    const timestamp = Date.now()
    const toUser = 'toUser'
    const fromUser = 'fromUser'
    const xml = message.toXmlFormat(fromUser, toUser, timestamp)
    const exepectedXml = `<xml>
<ToUserName><![CDATA[${toUser}]]></ToUserName>
<FromUserName><![CDATA[${fromUser}]]></FromUserName>
<CreateTime>${timestamp}</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[CLICK]]></Event>
<EventKey><![CDATA[event_key]]></EventKey>
</xml>`


    it('should have valid signature', function () {
      const sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      sender.send('http://test.com', xml, false, (err, response) => {
        expect(err).to.equal(null)
        expect(response.statusCode).to.equal(200)
        const query = qs.parse(url.parse(response.originUrl).query)
        expect(query.timestamp).to.exist
        expect(query.nonce).to.exist
        expect(query.signature).to.exist
      })
    })

    it('should send message', function () {
      const sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      sender.send('url', xml, false, (err, response, body) => {
        expect(err).to.equal(null)
        expect(response.statusCode).to.equal(200)
        expect(body).to.equal(exepectedXml)
      })
    })

    it('should send encrypted message', function () {
      const sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      const exepectedXml = MessageHelper.encryptMessage(null, xml)
      sender.send('url', xml, true, (err, response, body) => {
        expect(err).to.equal(null)
        expect(body).to.equal(exepectedXml)
      })
    })
  })
})
