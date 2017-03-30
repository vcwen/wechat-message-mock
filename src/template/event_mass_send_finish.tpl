<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[MASSSENDJOBFINISH]]></Event>
<MsgID><%= msgId %></MsgID>
<Status><![CDATA[sendsuccess]]></Status>
<TotalCount><%= total %></TotalCount>
<FilterCount><%= filterCount %></FilterCount>
<SentCount><%= sentCount %></SentCount>
<ErrorCount><%= errorCount %></ErrorCount>
</xml>