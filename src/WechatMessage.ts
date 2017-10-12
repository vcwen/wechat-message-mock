import * as camelcase from 'camelcase'
import * as ejs from 'ejs'
import * as template from './template'

export class WechatMessage {
  public msgType: string
  public eventType: string
  public data: any
  constructor(msgType: string, data: any, eventType: string = '') {
    this.msgType = msgType
    this.eventType = eventType
    this.data = data
  }
  public toXmlFormat() {
    const params = Object.assign({}, {data: this.data})
    let name
    if (this.msgType === 'event') {
      name = this.msgType + '_' + this.eventType
    } else {
      name =  'msg_' + this.msgType
    }
    const tpl = template[camelcase(name)]
    const compiled = ejs.compile(tpl)
    return compiled(params) as string
  }
}

export default WechatMessage
