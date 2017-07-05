const querystring = require('querystring')
const request = require('request-promise')
const WechatCrypto = require('wechat-crypto')
const MessageHelper = require('./MessageHelper')

class Sender {
  constructor(appId, token, encodingAESKey) {
    this.appId = appId
    this.token = token
    this.encodingAESKey = encodingAESKey || ''
    this.wechatEncryptor = new WechatCrypto(token, encodingAESKey, appId)
  }
  send(url, message, encrypted) {
    if(encrypted) {
      message = MessageHelper.encryptMessage(this.wechatEncryptor, message)
    }
    const nonce = MessageHelper.generateNonce()
    const timestamp = MessageHelper.getTimestamp()
    const signature = MessageHelper.generateSignature(this.token, nonce, timestamp)
    const qs = querystring.stringify({
      timestamp,
      nonce,
      signature,
    })
    url += '?' + qs
    return request.post({
      uri: url,
      body: message,
      headers: {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(message),
      },
    })
  }
}

module.exports = Sender
