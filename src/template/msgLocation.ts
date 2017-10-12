export const msgLocation = `<xml>
<ToUserName><![CDATA[<%- data.toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- data.fromUserName %>]]></FromUserName>
<CreateTime><%= data.timestamp %></CreateTime>
<MsgType><![CDATA[location]]></MsgType>
<Location_X><%= data.lat %></Location_X>
<Location_Y><%= data.lng %></Location_Y>
<Scale><%= data.scale %></Scale>
<Label><![CDATA[<%- data.label %>]]></Label>
<MsgId><%= data.msgId %></MsgId>
</xml>`
