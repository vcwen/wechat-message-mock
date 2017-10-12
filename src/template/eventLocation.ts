export const eventLocation =  `<xml>
<ToUserName><![CDATA[<%- data.toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- data.fromUserName %>]]></FromUserName>
<CreateTime><%= data.timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[LOCATION]]></Event>
<Latitude><%= data.lat %></Latitude>
<Longitude><%= data.lng %></Longitude>
<Precision><%= data.precision %></Precision>
</xml>`
