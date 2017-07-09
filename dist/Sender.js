"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring = require("querystring");
const request = require("request-promise");
const WechatCrypto = require("wechat-crypto");
const MessageHelper_1 = require("./MessageHelper");
class Sender {
    constructor(appId, token, encodingAESKey) {
        this.appId = appId;
        this.token = token;
        if (encodingAESKey) {
            this.encodingAESKey = encodingAESKey;
            this.wechatEncryptor = new WechatCrypto(token, encodingAESKey, appId);
        }
    }
    send(url, message, encrypted) {
        if (encrypted) {
            message = MessageHelper_1.default.encryptMessage(this.wechatEncryptor, message);
        }
        const nonce = MessageHelper_1.default.generateNonce();
        const timestamp = MessageHelper_1.default.getTimestamp();
        const signature = MessageHelper_1.default.generateSignature(this.token, nonce, timestamp);
        let qs;
        if (encrypted) {
            qs = querystring.stringify({
                timestamp,
                nonce,
                msg_signature: signature
            });
        }
        else {
            qs = querystring.stringify({
                timestamp,
                nonce,
                signature
            });
        }
        url += '?' + qs;
        return request.post({
            uri: url,
            body: message,
            headers: {
                'Content-Type': 'text/xml',
                'Content-Length': Buffer.byteLength(message)
            }
        });
    }
}
exports.default = Sender;
