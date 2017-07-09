import * as  querystring from 'querystring'
import * as request from 'request-promise'
import * as WechatCrypto from 'wechat-crypto'
import MessageHelper from './MessageHelper'

export default class Sender {
  private appId: string
  private token: string
  private encodingAESKey?: string
  private wechatEncryptor?: any
  constructor(appId: string, token: string, encodingAESKey?: string) {
    this.appId = appId
    this.token = token
    if (encodingAESKey) {
      this.encodingAESKey = encodingAESKey
      this.wechatEncryptor = new WechatCrypto(token, encodingAESKey, appId)
    }
  }
  public send(url: string, message: string, encrypted: boolean) {
    if (encrypted) {
      message = MessageHelper.encryptMessage(this.wechatEncryptor, message)
    }
    const nonce = MessageHelper.generateNonce()
    const timestamp = MessageHelper.getTimestamp()
    const signature = MessageHelper.generateSignature(this.token, nonce, timestamp)
    let qs: string
    if (encrypted) {
      qs = querystring.stringify({
        timestamp,
        nonce,
        msg_signature: signature
      })
    } else {
      qs = querystring.stringify({
        timestamp,
        nonce,
        signature
      })
    }
    url += '?' + qs
    return request.post({
      uri: url,
      body: message,
      headers: {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(message)
      }
    })
  }
}
