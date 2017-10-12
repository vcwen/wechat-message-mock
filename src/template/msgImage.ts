export const msgImage =  `<xml>
 <ToUserName><![CDATA[<%- data.toUserName %>]]></ToUserName>
 <FromUserName><![CDATA[<%- data.fromUserName %>]]></FromUserName>
 <CreateTime><%= data.timestamp %></CreateTime>
 <MsgType><![CDATA[image]]></MsgType>
 <PicUrl><![CDATA[<%- data.imageUrl %>]]></PicUrl>
 <MediaId><![CDATA[<%= data.mediaId %>]]></MediaId>
 <MsgId><%= data.msgId %></MsgId>
 </xml>`
