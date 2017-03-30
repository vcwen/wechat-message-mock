const MessageHelper = require('../src/MessageHelper')
const expect = require('chai').expect
const ejs = require('ejs')
const crypto = require('crypto')

describe('MessageHelper', function () {
  it('can generate request signature', function () {
    const expectedSignature = '223e096377939cc3dc07fce6784299afce4ff338'
    const timestamp = 1490854140
    const nonce = 1899154533
    const signature = MessageHelper.generateSignature('qbtest', nonce, timestamp)
    expect(signature).to.equal(expectedSignature)
  })
  it('can generate nonce string', function () {
    const nonce = MessageHelper.generateNonce()
    expect(nonce).to.match(/\d{10}/)
  })

  it('can get timestamp', function () {
    const timestamp = MessageHelper.getTimestamp()
    expect(Date.now() - timestamp * 1000).to.below(5000)
  })

  it('can encrypt message', function () {
    const encryptor = {
      encrypt: function (content) {
        const hash = crypto.createHash('sha256')
        const encryptMessage = hash.update(content).digest('hex')
        return encryptMessage
      },
    }
    const signature = MessageHelper.encryptMessage(encryptor, 'message')
    const encryptedTpl = '<xml><Encrypt><![CDATA[<%-encrypt%>]]></Encrypt></xml>'
    const compiledTpl = ejs.compile(encryptedTpl)
    const encryptMessage = encryptor.encrypt('message')
    const encrypted = compiledTpl({
      encrypt: encryptMessage,
    })
    expect(signature).to.equal(encrypted)
  })
})
