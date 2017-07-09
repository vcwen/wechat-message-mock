import {expect} from 'chai'
import * as crypto from 'crypto'
import * as ejs from 'ejs'
import MessageHelper from '../src/MessageHelper'

describe('MessageHelper',  () => {
  it('can generate request signature',  () => {
    const expectedSignature = '223e096377939cc3dc07fce6784299afce4ff338'
    const timestamp = 1490854140
    const nonce = 1899154533
    const signature = MessageHelper.generateSignature('qbtest', nonce, timestamp)
    expect(signature).to.equal(expectedSignature)
  })
  it('can generate nonce string',  () => {
    const nonce = MessageHelper.generateNonce()
    expect(nonce).to.match(/\d{10}/)
  })

  it('can get timestamp',  () => {
    const timestamp = MessageHelper.getTimestamp()
    expect(Date.now() - timestamp * 1000).to.below(1000)
  })

  it('can encrypt message',  () => {
    const encryptor = {
      encrypt (content) {
        const hash = crypto.createHash('sha256')
        const msg = hash.update(content).digest('hex')
        return msg
      }
    }
    const signature = MessageHelper.encryptMessage(encryptor, 'message')
    const encryptedTpl = '<xml><Encrypt><![CDATA[<%-encrypt%>]]></Encrypt></xml>'
    const compiledTpl = ejs.compile(encryptedTpl)
    const encryptMessage = encryptor.encrypt('message')
    const encrypted = compiledTpl({
      encrypt: encryptMessage
    })
    expect(signature).to.equal(encrypted)
  })
})
