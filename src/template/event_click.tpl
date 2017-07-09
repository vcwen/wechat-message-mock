<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[CLICK]]></Event>
<EventKey><![CDATA[<%- data.eventKey %>]]></EventKey>
</xml>
