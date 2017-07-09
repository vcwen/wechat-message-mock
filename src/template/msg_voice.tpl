<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[voice]]></MsgType>
<MediaId><![CDATA[<%= data.mediaId %>]]></MediaId>
<Format><![CDATA[<%= data.format %>]]></Format>
<% if (data.eventKey) {%>
<Recognition><![CDATA[<%- data.recognition %>]]></Recognition>
<% } %>
<MsgId><%= data.msgId %></MsgId>
</xml>
