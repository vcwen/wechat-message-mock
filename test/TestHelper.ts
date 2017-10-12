import * as xml2js from 'xml2js'

export function  parseXML(xml): any {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, { trim: true }, (err, obj) => {
        if (err) {
          return reject(err)
        }
        resolve(obj)
      })
    })
  }
export function formatMessage(result): any {
    const message = {}
    if (typeof result === 'object') {
      for (const key in result) {
        if (!(result[key] instanceof Array) || result[key].length === 0) {
          continue
        }

        if (result[key].length === 1) {
          const val = result[key][0]
          if (typeof val === 'object') {
            message[key] = formatMessage(val)
          } else {
            message[key] = (val || '').trim()
          }
        } else {
          message[key] = result[key].map((item) => {
            return formatMessage(item)
          })
        }
      }
    }
    return message
  }
