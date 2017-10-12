export const msgLocation = `<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[location]]></MsgType>
<Location_X><%= data.lat %></Location_X>
<Location_Y><%= data.lng %></Location_Y>
<Scale><%= data.scale %></Scale>
<Label><![CDATA[<%- data.label %>]]></Label>
<MsgId><%= data.msgId %></MsgId>
</xml>`
