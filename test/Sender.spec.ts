import {expect} from 'chai'
import * as proxyquire from 'proxyquire'
import * as qs from 'querystring'
import * as url from 'url'
import Sender from '../src/Sender'
import WechatMessage from '../src/WechatMessage'
describe('Sender',  () => {

  it('should be able to create via constructor',  () => {
    const SenderMock = require('../src/Sender').default
    const sender: Sender = new SenderMock('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
    expect(sender).to.be.instanceof(Sender)
  })

  describe('send()',  () => {
    it('should have valid signature',  (done) => {
      const message = new WechatMessage('event', 'click', {
      eventKey: 'event_key'
    })
      const timestamp = Date.now()
      const toUser = 'toUser'
      const fromUser = 'fromUser'
      const xml = message.toXmlFormat(fromUser, toUser, timestamp)
      const requestStub = {
        post (options) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(options.uri)
            })
          })
        }
      }
      const SenderMock = proxyquire('../src/Sender', {
        'request-promise': requestStub
      }).default
      const sender = new SenderMock('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      sender.send('http://test.com', xml, false).then((uri) => {
        const query = qs.parse(url.parse(uri).query)
        expect(query.timestamp).to.exist
        expect(query.nonce).to.exist
        expect(query.signature).to.exist
        done()
      })
    })

    it('should send message',  (done) => {
      const xml = '<xmlEventKey><![CDATA[event_key]]></EventKey></xml>'
      const requestStub = {
        post (options) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(options.body)
            })
          })
        }
      }
      const SenderMock = proxyquire('../src/Sender', {
        'request-promise': requestStub
      }).default
      const sender: Sender = new SenderMock('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      sender.send('url', xml, false).then((response) => {
        expect(response).to.equal(xml)
        done()
      })
    })

    it('should send encrypted message',  (done) => {
      const MessageHelper = {
        default: {
          encryptMessage() {
            return 'encrypted:<xmlEventKey><![CDATA[event_key]]></EventKey></xml>'
          },
          generateSignature() {
            return 'signature'
          },

          generateNonce() {
           return '123456789'
          },
          getTimestamp() {
            return Math.floor(Date.now() / 1000)
          }
        }
      }
      const requestStub = {
        post (options) {
          return new Promise((resolve) => {
            resolve(options.body)
          })
        }
      }
      const SenderMock = proxyquire('../src/Sender', {
        './MessageHelper': MessageHelper,
        'request-promise': requestStub
      }).default
      const sender: Sender = new SenderMock('appId', 'token', 'HBxRitJ8lEsjdkwA8w44XnxztovG7c7G3v2vMqCZ07H')
      const xml = 'encrypted:<xmlEventKey><![CDATA[event_key]]></EventKey></xml>'
      sender.send('url', xml, true).then((response) => {
        expect(response).to.equal(xml)
        done()
      })
    })
  })
})
