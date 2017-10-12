import axios from 'axios'
import * as qs from 'querystring'
import * as url from 'url'
import * as WechatCrypto from 'wechat-crypto'
import * as xml2js from 'xml2js'
import MessageHelper from '../src/MessageHelper'
import Sender from '../src/Sender'
import WechatMessage from '../src/WechatMessage'

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
      const response = await sender.send('xml', xml, false)
      expect(response.data.body).toBe(xml)
    })

    it('should send encrypted message',  async () => {
      const sender: Sender = new Sender('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      const content = 'encrypted'
      const wechatEncryptor = new WechatCrypto('token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H', 'appId')
      const expected = MessageHelper.encryptMessage(wechatEncryptor, content)
      const response = await sender.send('encrypted', content, true)
      const msg = await parseXML(response.data.body)
      const decrypted = wechatEncryptor.decrypt(msg.xml.Encrypt[0])
      expect(decrypted.message).toBe(content)
    })
  })
})

function parseXML(xml): any {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { trim: true }, (err, obj) => {
      if (err) {
        return reject(err)
      }
      resolve(obj)
    })
  })
}
