export const msgVideo = `<xml>
<ToUserName><![CDATA[<%- data.toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- data.fromUserName %>]]></FromUserName>
<CreateTime><%= data.timestamp %></CreateTime>
<MsgType><![CDATA[shortvideo]]></MsgType>
<MediaId><![CDATA[<%= data.mediaId %>]]></MediaId>
<ThumbMediaId><![CDATA[<%= data.thumbMediaId %>]]></ThumbMediaId>
<MsgId><%= data.msgId %></MsgId>
</xml>`
