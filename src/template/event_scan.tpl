<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[SCAN]]></Event>
<EventKey><![CDATA[<%- data.eventKey %>]]></EventKey>
<Ticket><![CDATA[<%- data.ticket %>]]></Ticket>
</xml>
