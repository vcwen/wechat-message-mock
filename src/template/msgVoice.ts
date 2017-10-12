export const msgVoice = `<xml>
<ToUserName><![CDATA[<%- data.toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- data.fromUserName %>]]></FromUserName>
<CreateTime><%= data.timestamp %></CreateTime>
<MsgType><![CDATA[voice]]></MsgType>
<MediaId><![CDATA[<%= data.mediaId %>]]></MediaId>
<Format><![CDATA[<%= data.format %>]]></Format>
<% if (data.eventKey) {%>
<Recognition><![CDATA[<%- data.recognition %>]]></Recognition>
<% } %>
<MsgId><%= data.msgId %></MsgId>
</xml>`
