"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
class WechatMessage {
    constructor(msgType, eventType, data) {
        this.msgType = msgType;
        this.eventType = eventType ? eventType : '';
        this.data = data;
    }
    toXmlFormat(fromUser, toUser, timestamp) {
        const params = Object.assign({}, {
            fromUserName: fromUser,
            toUserName: toUser,
            timestamp
        }, { data: this.data });
        let filepath;
        if (this.msgType === 'event') {
            filepath = path.resolve(__dirname, `./template/${this.msgType}_${this.eventType}.tpl`);
        }
        else {
            filepath = path.resolve(__dirname, `./template/msg_${this.msgType}.tpl`);
        }
        const tpl = fs.readFileSync(filepath, 'utf8');
        const compiled = ejs.compile(tpl);
        return compiled(params);
    }
}
exports.default = WechatMessage;
