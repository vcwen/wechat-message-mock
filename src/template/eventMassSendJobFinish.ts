export const eventMassSendJobFinish =  `<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[MASSSENDJOBFINISH]]></Event>
<MsgID><%= data.msgId %></MsgID>
<Status><![CDATA[sendsuccess]]></Status>
<TotalCount><%= data.total %></TotalCount>
<FilterCount><%= data.filterCount %></FilterCount>
<SentCount><%= data.sentCount %></SentCount>
<ErrorCount><%= data.errorCount %></ErrorCount>
</xml>`
