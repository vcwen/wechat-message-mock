export const eventPic =  `<xml>
<ToUserName><![CDATA[<%- toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%- fromUserName %>]]></FromUserName>
<CreateTime><%= timestamp %></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[<%= event %>]]></Event>
<EventKey><![CDATA[<%- eventKey %>]]></EventKey>
<SendPicsInfo>
<Count><%= count %></Count>
<PicList>
<% pics.forEach((item) => { %>
<item>
<PicMd5Sum><![CDATA[<%- item.md5Sum %>]]></PicMd5Sum>
</item>
<% }) %>
</PicList>
</SendPicsInfo>
</xml>`
