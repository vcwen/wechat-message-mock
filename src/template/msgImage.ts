export const msgImage =  `<xml>
 <ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
 <FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
 <CreateTime><%= timestamp %></CreateTime>
 <MsgType><![CDATA[image]]></MsgType>
 <PicUrl><![CDATA[<%- data.imageUrl %>]]></PicUrl>
 <MediaId><![CDATA[<%= data.mediaId %>]]></MediaId>
 <MsgId><%= data.msgId %></MsgId>
 </xml>`
