import * as ejs from 'ejs'
import * as fs from 'fs'
import * as path from 'path'

export default class WechatMessage {
  public msgType: string
  public eventType: string
  public data: any
  constructor(msgType: string, eventType: string, data: any) {
    this.msgType = msgType
    this.eventType = eventType ? eventType : ''
    this.data = data
  }
  public toXmlFormat(fromUser, toUser, timestamp) {
    const params = Object.assign({}, {
      fromUserName: fromUser,
      toUserName: toUser,
      timestamp
    }, {data: this.data})

    let filepath
    if (this.msgType === 'event') {
      filepath = path.resolve(__dirname, `./template/${this.msgType}_${this.eventType}.tpl`)
    } else {
      filepath = path.resolve(__dirname, `./template/msg_${this.msgType}.tpl`)
    }

    const tpl = fs.readFileSync(filepath, 'utf8')
    const compiled = ejs.compile(tpl)
    return compiled(params)
  }
}
