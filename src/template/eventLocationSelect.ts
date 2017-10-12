export const eventLocationSelect =  `<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[location_select]]></Event>
<EventKey><![CDATA[<%- data.eventKey %>]]></EventKey>
<SendLocationInfo>
<Location_X><![CDATA[<%= data.lat %>]]></Location_X>
<Location_Y><![CDATA[<%= data.lng %>]]></Location_Y>
<Scale><![CDATA[<%= data.scale %>]]></Scale>
<Label><![CDATA[<%- data.label %>]]></Label>
<Poiname><![CDATA[<%- data.poi %>]]></Poiname>
</SendLocationInfo>
</xml>`
