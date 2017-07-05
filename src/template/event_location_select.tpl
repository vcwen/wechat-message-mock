<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[location_select]]></Event>
<EventKey><![CDATA[<%- eventKey %>]]></EventKey>
<SendLocationInfo>
<Location_X><![CDATA[<%= lat %>]]></Location_X>
<Location_Y><![CDATA[<%= lng %>]]></Location_Y>
<Scale><![CDATA[<%= scale %>]]></Scale>
<Label><![CDATA[<%- label %>]]></Label>
<Poiname><![CDATA[<%- poi %>]]></Poiname>
</SendLocationInfo>
</xml>
