export const msgText = `<xml>
<ToUserName><![CDATA[<%- data.toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- data.fromUserName %>]]></FromUserName>
<CreateTime><%= data.timestamp %></CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[<%= data.content %>]]></Content>
<MsgId><%= data.msgId %></MsgId>
</xml>`
