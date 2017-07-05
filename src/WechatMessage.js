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

    let filepath
    if(this.msgType === 'event') {
      filepath = path.resolve(__dirname, `./template/${this.msgType}_${this.eventType}.tpl`)
    } else {
      filepath = path.resolve(__dirname, `./template/msg_${this.msgType}.tpl`)
    }

    const tpl = fs.readFileSync(filepath, 'utf8')
    let compiled = ejs.compile(tpl)
    return compiled(params)
  }
}

module.exports = WechatMessage
