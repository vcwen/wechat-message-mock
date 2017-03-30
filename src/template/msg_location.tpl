<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[location]]></MsgType>
<Location_X><%= lat %></Location_X>
<Location_Y><%= lng %></Location_Y>
<Scale><%= scale %></Scale>
<Label><![CDATA[<%- label %>]]></Label>
<MsgId><%= msgId %></MsgId>
</xml>