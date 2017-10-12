export const eventSubscribe = `<xml>
<ToUserName><![CDATA[<%- data.toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- data.fromUserName %>]]></FromUserName>
<CreateTime><%= data.timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[subscribe]]></Event>
<% if (data.eventKey) {%>
<EventKey><![CDATA[<%= data.eventKey %>]]></EventKey>
<Ticket><![CDATA[<%= data.ticket %>]]></Ticket>
<% } %>
</xml>`
