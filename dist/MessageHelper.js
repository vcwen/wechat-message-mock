"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const ejs_1 = require("ejs");
const encryptedTpl = '<xml><Encrypt><![CDATA[<%-encrypt%>]]></Encrypt></xml>';
const compiledTpl = ejs_1.default.compile(encryptedTpl);
class MessageHelper {
    static generateSignature(token, nonce, timestamp) {
        const shasum = crypto.createHash('sha1');
        const arr = [token, timestamp, nonce].sort();
        shasum.update(arr.join(''));
        const signature = shasum.digest('hex');
        return signature;
    }
    static generateNonce() {
        const regex = /[1-9]\d{9}/;
        const match = regex.exec(Math.random().toString());
        if (match) {
            return match[0];
        }
        else {
            throw new Error('Failed to generate nonce string');
        }
    }
    static getTimestamp() {
        return Math.floor(Date.now() / 1000);
    }
    static encryptMessage(wechatEncryptor, content) {
        const encryptMessage = wechatEncryptor.encrypt(content);
        const encryptXml = compiledTpl({
            encrypt: encryptMessage
        });
        return encryptXml;
    }
}
exports.default = MessageHelper;
