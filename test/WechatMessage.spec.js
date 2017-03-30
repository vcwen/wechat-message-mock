const expect = require('chai').expect
const WechatMessage = require('../src/WechatMessage')

describe('WechatMessage', function () {
  describe('constructor', function () {
    it('should be able to create common message', function () {
      const message = new WechatMessage('text', null, {content: 'This is a text message.'})
      expect(message).to.be.instanceof(WechatMessage)
    })

    it('should be able to create event message', function () {
      const message = new WechatMessage('event', 'click', {eventKey: 'event_key'})
      expect(message).to.be.instanceof(WechatMessage)
    })
  })
  it('should generate xml format message', function () {
    const message = new WechatMessage('event', 'click', {eventKey: 'event_key'})
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
    expect(xml).to.equal(exepectedXml)
  })
})
