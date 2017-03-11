<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Admin.aspx.cs" Inherits="城市公交管理系统_ASP.Admin" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta charset="UTF-8">
<title>LayOut</title>
<script type="text/javascript" src="/Scripts/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="/Scripts/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="/Scripts/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="/Scripts/ArtDialog/jquery.artDialog.js"></script>
<link rel="stylesheet" type="text/css" href="/theme/default/easyui.css"/>  
<link rel="stylesheet" type="text/css" href="/theme/icon.css"/>  
<script language="JavaScript">
    $(document).ready(function () {

    });
    </script>
    <style>
        .footer {
            width: 100%;
            text-align: center;
            line-height: 35px;
        }
 
        .top-bg {
            background-color: #d8e4fe;
            height: 80px;
        }
 
    </style>


</head>
<body class="easyui-layout">
    <div>
        <img src = "/Pictures/Title.png" width = "100%" height = "10%" />
    </div>
    <table style="width:100%; text-align:center">
        <tr>
            <td><a href = "/BusManage.aspx" style="text-align:center;color:Gray;font-weight:bold"><img src = "/Pictures/Icon.png" style = "width:20px;height:20px"/>车次管理</a><td/>
            <td><a href = "/StationManage.aspx" style="text-align:center;color:Gray;font-weight:bold"><img src = "/Pictures/Icon.png" style = "width:20px;height:20px"/>车站管理</a><td/>
            <td><a href = "/VehicleManage.aspx" style="text-align:center;color:Gray;font-weight:bold"><img src = "/Pictures/Icon.png" style = "width:20px;height:20px"/>车辆管理</a><td/>   
            <td><a href = "/DriverManage.aspx" style="text-align:center;color:Gray;font-weight:bold"><img src = "/Pictures/Icon.png" style = "width:20px;height:20px"/>司机管理</a><td/>
            <td><a href = "/MetoManage.aspx" style="text-align:center;color:Gray;font-weight:bold"><img src = "/Pictures/Icon.png" style = "width:20px;height:20px"/>备忘录</a><td/>     
        </tr>
     </table>
     <br />
     <br />
     <table>
        <tr>
            <td>
                <img src = "/Pictures/Bus.jpg" width = "50%" height = "40%" />
            </td>
            <td>
               &nbsp;<table style="width:40%">
                <tr>
                    <td><a href="" id="meto1" runat="server" style="text-align:center;color:Gray;font-weight:bold"></a></td>
                
                </tr>
                <tr>
                    <td><a href="" id="meto2" runat="server" style="text-align:center;color:Gray;font-weight:bold"></a></td>
                  
                </tr>
                <tr>
                    <td><a href="" id="meto3" runat="server" style="text-align:center;color:Gray;font-weight:bold"></a></td>
                  
                </tr>
                <tr>
                    <td><a href="" id="meto4" runat="server" style="text-align:center;color:Gray;font-weight:bold"></a></td>
                 
                </tr>
                <tr>
                    <td><a href="" id="meto5" runat="server" style="text-align:center;color:Gray;font-weight:bold"></a></td>
                   
                </tr>
               </table>
            </td>
           
        </tr>
     </table>
</body>
</html>
