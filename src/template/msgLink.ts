export const msgLink = `<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[link]]></MsgType>
<Title><![CDATA[<%- data.title %>]]></Title>
<Description><![CDATA[<%- data.desc %>]]></Description>
<Url><![CDATA[<%- data.url %>]]></Url>
<MsgId><%= data.msgId %></MsgId>
</xml>`
