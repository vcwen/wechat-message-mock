const expect = require('chai').expect
const ejs = require('ejs')
const qs = require('querystring')
const url = require('url')
const crypto = require('crypto')
const proxyquire = require('proxyquire')
const WechatMessage = require('../src/WechatMessage')


describe('Sender', function () {

  it('should be able to create via constructor', function () {
    const Sender = require('../src/Sender')
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

    it('should have valid signature', function (done) {
      const requestStub = {
        post: function (options) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(options.uri)
            })
          })
        },
      }
      const Sender = proxyquire('../src/Sender', {
        'request-promise': requestStub,
      })
      const sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      sender.send('http://test.com', xml, false).then((uri) => {
        const query = qs.parse(url.parse(uri).query)
        expect(query.timestamp).to.exist
        expect(query.nonce).to.exist
        expect(query.signature).to.exist
        done()
      })
    })

    it('should send message', function (done) {
      const xml = '<xmlEventKey><![CDATA[event_key]]></EventKey></xml>'
      const requestStub = {
        post: function (options) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(options.body)
            })
          })
        },
      }
      const Sender = proxyquire('../src/Sender', {
        'request-promise': requestStub,
      })
      const sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      sender.send('url', xml, false).then((response) => {
        expect(response).to.equal(xml)
        done()
      })
    })

    it('should send encrypted message', function (done) {
      const MessageHelper = {
        encryptMessage: function (encryptor, content) {
          return 'encrypted:' + content
        },
      }
      const exepectedXml = '<xmlEventKey><![CDATA[event_key]]></EventKey></xml>'
      const requestStub = {
        post: function (options) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(options.body)
            })
          })
        },
      }
      const Sender = proxyquire('../src/Sender', {
        './MessageHelper': MessageHelper,
        'request-promise': requestStub,
      })
      const sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      const xml = '<xmlEventKey><![CDATA[event_key]]></EventKey></xml>'
      sender.send('url', xml, true).then((response) => {
        expect(response).to.equal('encrypted:' + xml)
        done()
      })
    })
  })
})
