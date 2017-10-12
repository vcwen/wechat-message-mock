export const msgLink = `<xml>
<ToUserName><![CDATA[<%- data.toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- data.fromUserName %>]]></FromUserName>
<CreateTime><%= data.timestamp %></CreateTime>
<MsgType><![CDATA[link]]></MsgType>
<Title><![CDATA[<%- data.title %>]]></Title>
<Description><![CDATA[<%- data.desc %>]]></Description>
<Url><![CDATA[<%- data.url %>]]></Url>
<MsgId><%= data.msgId %></MsgId>
</xml>`
