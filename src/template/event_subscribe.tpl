<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[<%= event %>]]></Event>
<% if (eventKey) {%>
<EventKey><![CDATA[<%= eventKey %>]]></EventKey>
<% } %>
<% if (ticket) {%>
<Ticket><![CDATA[<%= ticket %>]]></Ticket>
<% } %>
</xml>
