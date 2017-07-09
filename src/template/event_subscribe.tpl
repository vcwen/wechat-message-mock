<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[subscribe]]></Event>
<% if (data.eventKey) {%>
<EventKey><![CDATA[<%= data.eventKey %>]]></EventKey>
<Ticket><![CDATA[<%= data.ticket %>]]></Ticket>
<% } %>
</xml>
