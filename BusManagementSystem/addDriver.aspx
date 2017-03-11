<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="addDriver.aspx.cs" Inherits="城市公交管理系统_ASP.addDriver" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<script type="text/javascript" src="/Scripts/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="/Scripts/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="/Scripts/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="/Scripts/js/dialog.js"></script>
<script type="text/javascript" src="/Scripts/ArtDialog/jquery.artDialog.js"></script>
<link rel="stylesheet" type="text/css" href="/theme/default/easyui.css"/>  
<link rel="stylesheet" type="text/css" href="/theme/icon.css"/>  
<script language="javascript" type="text/javascript">
</script>


</head>
<body>
  <h2>Basic Dialog</h2>
    <p>Click below button to open or close dialog.</p>
    <div style="margin:20px 0;">
        <a href="javascript:void(0)" class="easyui-linkbutton" onclick="$('#dlg').dialog('open')">Open</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" onclick="$('#dlg').dialog('close')">Close</a>
    </div>
    <div id="dlg" class="easyui-dialog" title="Basic Dialog" data-options="iconCls:'icon-save'" style="width:400px;height:200px;padding:10px">
        The dialog content.
    </div>
    
</body>
</html>
