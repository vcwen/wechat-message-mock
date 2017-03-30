const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

class WechatMessage {
  constructor(msgType, eventType, data) {
    this.msgType = msgType
    this.eventType = eventType ? eventType : ''
    this.data = data
  }
  toXmlFormat(fromUser, toUser, timestamp) {
    const params = Object.assign({}, {
      fromUserName: fromUser,
      toUserName: toUser,
      timestamp: timestamp,
    }, this.data)

    let filename = path.resolve(__dirname, `./template/${this.msgType}_${this.eventType}.tpl`)
    const tpl = fs.readFileSync(filename, 'utf8')
    let compiled = ejs.compile(tpl)
    return compiled(params)
  }
}

module.exports = WechatMessage
