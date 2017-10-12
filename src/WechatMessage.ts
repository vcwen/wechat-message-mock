import * as camelcase from 'camelcase'
import * as ejs from 'ejs'
import * as template from './template'

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

    let name
    if (this.msgType === 'event') {
      name = this.msgType + '_' + this.eventType
    } else {
      name =  'msg_' + this.msgType
    }
    const tpl = template[camelcase(name)]
    const compiled = ejs.compile(tpl)
    return compiled(params)
  }
}
