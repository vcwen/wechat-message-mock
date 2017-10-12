import WechatMessage from '../src/WechatMessage'

describe('WechatMessage',  () => {
  describe('constructor',  () => {
    it('should be able to create common message',  () => {
      const message = new WechatMessage('text', '', {content: 'This is a text message.'})
      expect(message).toBeInstanceOf(WechatMessage)
    })

    it('should be able to create event message',  () => {
      const message = new WechatMessage('event', 'click', {eventKey: 'event_key'})
      expect(message).toBeInstanceOf(WechatMessage)
    })
  })
  it('should generate xml format message',  () => {
    const message = new WechatMessage('event', 'CLICK', {eventKey: 'event_key'})
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
    expect(xml).toBe(exepectedXml)
  })
})
