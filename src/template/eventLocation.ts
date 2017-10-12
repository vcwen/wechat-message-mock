export const eventLocation =  `<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[LOCATION]]></Event>
<Latitude><%= data.lat %></Latitude>
<Longitude><%= data.lng %></Longitude>
<Precision><%= data.precision %></Precision>
</xml>`
