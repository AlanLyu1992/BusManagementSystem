<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainPage.aspx.cs" Inherits="城市公交管理系统_ASP.MainPage" %>

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
       function LoginError() {
           alert("用户名或密码错误！");
           $("#txtUsername").val("");
           $("#txtPassword").val("");
       };
   </script>
    </head>
<body>
    <form id="form1" runat="server">
    <div>
        <img src = "/Pictures/Title.png" width = "100%" height = "30%" />
    </div>
    <br />
    <br />
    <table style="width:100%; text-align:center; height:60%">
        <tr>
            <td style="width:40%"></td>
            <td><asp:label id="lblName" runat="server" style=" font-weight:bold">用户名:</asp:label></td>
            <td><asp:TextBox ID="txtUsername" runat="server" TextMode="SingleLine"></asp:TextBox></td>
            <td style="width:40%"></td>
        </tr>
        <tr>
            <td style="width:40%"></td>
            <td><asp:label id="lblPassword" runat="server" style=" font-weight:bold">密码:</asp:label></td>
            <td><asp:TextBox ID="txtPassword" runat="server" type="password" TextMode="SingleLine"></asp:TextBox></td>
            <td style="width:40%"></td>
        </tr>
        <tr>
            <td style="width:40%"></td>
            <td></td>
            <td>
                <asp:ImageButton ID="btnLogin" runat="server" Height="30px" ImageUrl="/Pictures/LoginButton.png" 
            ToolTip="登录" onclick="btnLogin_Click"  />
            </td>
            <td style="width:40%"></td>
        </tr>
        <tr>
            <td style="width:40%"></td>
            <td><asp:LinkButton ID="btnBus" runat="server" style=" font-weight:bold" 
                    onclick="btnBus_Click">车次查询</asp:LinkButton></td>
            <td><asp:LinkButton ID="btnStation" runat="server" style=" font-weight:bold" 
                    onclick="btnStation_Click">车站查询</asp:LinkButton>&nbsp&nbsp<asp:LinkButton 
                    ID="btnRoute" runat="server" style=" font-weight:bold" onclick="btnRoute_Click">换乘查询</asp:LinkButton></td>
             <td style="width:40%"></td>
        </tr>
    </table>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div>
        <img src = "/Pictures/Buttom.png" width = "100%" height = "10%" />
    </div>
    </form>
</body>
</html>
