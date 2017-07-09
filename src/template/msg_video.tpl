<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[shortvideo]]></MsgType>
<MediaId><![CDATA[<%= data.mediaId %>]]></MediaId>
<ThumbMediaId><![CDATA[<%= data.thumbMediaId %>]]></ThumbMediaId>
<MsgId><%= data.msgId %></MsgId>
</xml>
