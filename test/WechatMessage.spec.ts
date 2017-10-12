import WechatMessage from '../src/WechatMessage'
import TestHelper from './TestHelper'

describe('WechatMessage',  () => {
  describe('constructor',  () => {
    it('should be able to create common message',  () => {
      const message = new WechatMessage('text', {content: 'This is a text message.'})
      expect(message).toBeInstanceOf(WechatMessage)
    })

    it('should be able to create event message',  () => {
      const message = new WechatMessage('event', {eventKey: 'event_key'}, 'click')
      expect(message).toBeInstanceOf(WechatMessage)
    })
  })
  it('should generate xml format event message',  () => {
    const timestamp = Date.now()
    const toUserName = 'toUser'
    const fromUserName = 'fromUser'
    const message = new WechatMessage('event', {eventKey: 'event_key', toUserName, fromUserName, timestamp}, 'CLICK')

    const xml = message.toXmlFormat()
    const exepectedXml = `<xml>
<ToUserName><![CDATA[${toUserName}]]></ToUserName>
<FromUserName><![CDATA[${fromUserName}]]></FromUserName>
<CreateTime>${timestamp}</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[CLICK]]></Event>
<EventKey><![CDATA[event_key]]></EventKey>
</xml>`
    expect(xml).toBe(exepectedXml)
  })
  it('should generate xml format common message',  () => {
    const timestamp = Date.now()
    const toUserName = 'toUser'
    const fromUserName = 'fromUser'
    const message = new WechatMessage('text', {content: 'text_test', msgId: '123456',
      toUserName, fromUserName, timestamp})
    const xml = message.toXmlFormat()
    const exepectedXml = `<xml>
<ToUserName><![CDATA[${toUserName}]]></ToUserName>
<FromUserName><![CDATA[${fromUserName}]]></FromUserName>
<CreateTime>${timestamp}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[text_test]]></Content>
<MsgId>123456</MsgId>
</xml>`
    expect(xml).toBe(exepectedXml)
  })
})
