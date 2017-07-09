<xml>
 <ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
 <FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
 <CreateTime><%= timestamp %></CreateTime>
 <MsgType><![CDATA[text]]></MsgType>
 <Content><![CDATA[<%= data.content %>]]></Content>
 <MsgId><%= data.msgId %></MsgId>
 </xml>
