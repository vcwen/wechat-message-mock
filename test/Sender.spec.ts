import axios from 'axios'
import * as qs from 'querystring'
import * as url from 'url'
import * as WechatCrypto from 'wechat-crypto'
import MessageHelper from '../src/MessageHelper'
import Sender from '../src/Sender'
import WechatMessage from '../src/WechatMessage'
import {formatMessage, parseXML} from './TestHelper'

jest.mock('axios')
describe('Sender',  () => {

  it('should be able to create via constructor',  () => {
    const sender: Sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
    expect(sender).toBeInstanceOf(Sender)
  })

  describe('send()',  () => {
    it('should send message',  async () => {
      const xml = '<xmlEventKey><![CDATA[event_key]]></EventKey></xml>'
      const sender: Sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      const timestamp = Date.now()
      const toUserName = 'toUser'
      const fromUserName = 'fromUser'
      const message = new WechatMessage('event', {eventKey: 'event_key', toUserName, fromUserName, timestamp}, 'CLICK')
      const response = await sender.send('xml', message, false)
      const xmlRes = await parseXML(response.data.body)
      const res = formatMessage(xmlRes.xml)
      expect(res.MsgType).toBe('event')
      expect(res.Event).toBe('CLICK')
      expect(res.EventKey).toBe('event_key')
    })

    it('should send encrypted message',  async () => {
      const sender: Sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      const content = 'encrypted'
      const wechatEncryptor = new WechatCrypto('token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H', 'appId')
      const expected = MessageHelper.encryptMessage(wechatEncryptor, content)
      const timestamp = Date.now()
      const toUserName = 'toUser'
      const fromUserName = 'fromUser'
      const message = new WechatMessage('event', {eventKey: 'event_key', toUserName, fromUserName, timestamp}, 'view')
      const response = await sender.send('encrypted', message, true)
      const xmlRes = await parseXML(response.data.body)
      const res = formatMessage(xmlRes.xml)
      const cryptor = new WechatCrypto('token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H', 'appId')
      const decryptedXML = cryptor.decrypt(res.Encrypt)
      const messageWrapXml = decryptedXML.message
      const decodedXML = await parseXML(messageWrapXml)
      const formatted = formatMessage(decodedXML.xml)
      expect(formatted.MsgType).toBe('event')
      expect(formatted.Event).toBe('VIEW')
      expect(formatted.EventKey).toBe('event_key')
    })
  })
})
