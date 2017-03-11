<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="test.aspx.cs" Inherits="城市公交管理系统_ASP.test" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<script type="text/javascript" src="/Scripts/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="/Scripts/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="/Scripts/js/easyui-lang-zh_CN.js"></script>

<link rel="stylesheet" type="text/css" href="/theme/default/easyui.css"/>  
<link rel="stylesheet" type="text/css" href="/theme/icon.css"/>  
 <script type="text/javascript">
   
    </script>
</head>
<body>
    <form id="form1" runat="server">
   <h2>Basic DateBox</h2>
    <p>Click the calendar image on the right side.</p>
    <div style="margin:20px 0;">
        <asp:Button ID="Button1" runat="server" Text="Button" />
    </div>
    <input class="easyui-datebox"></input>
    <h2>Multiline TextBox</h2>
	<p>This example shows how to define a textbox for the user to enter multi-line text input.</p>
	<div style="margin:20px 0;"></div>
	<input class="easyui-textbox" data-options="multiline:true" value="This TextBox will allow the user to enter multiple lines of text." style="width:300px;height:100px">
    </form>

</body>
</html>
