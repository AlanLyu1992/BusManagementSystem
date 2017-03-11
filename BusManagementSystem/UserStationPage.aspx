<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserStationPage.aspx.cs" Inherits="城市公交管理系统_ASP.UserStationPage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
   <title></title>
    <script type="text/javascript" src="/Scripts/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="/Scripts/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="/Scripts/js/easyui-lang-zh_CN.js"></script>
<link rel="stylesheet" type="text/css" href="/theme/default/easyui.css"/>  
<link rel="stylesheet" type="text/css" href="/theme/icon.css"/>  
<script type="text/javascript">
    $(function () {
        var p = $('#dg').datagrid('getPager');
        $(p).pagination({
            pageSize: 20, //每页显示的记录条数，默认为10           
            pageList: [10, 20, 50], //可以设置每页记录条数的列表           
            beforePageText: '第', //页数文本框前显示的汉字           
            afterPageText: '页    共 {pages} 页',
            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
        });
        $("#dg").datagrid('reload');

        // reloadgrid();
    });

    function editStation() {
        var row = $('#dg').datagrid('getSelected');
        var busid = row.BusId;
        $("#flag").val("edit");
        $("#busid").val(busid);
        if (row) {
            $('#stationname').val(row.Station_Name);
            $('#bus').val(row.Bus);
            $('#dlg').dialog('open').dialog('setTitle', '查看车次信息');
            $('#fm').form('load', row);
        }
    }
    </script>
</head>
<body>
    <form id="form1" runat="server">
     <div>
        <img src = "/Pictures/Title.png" width = "100%" height = "10%" />
    </div>  
    <table id="dg" title="车站信息" class="easyui-datagrid" style="width:1350px;height:500px"
            url="StationInfo.ashx?mode=1"
            toolbar="#toolbar" pagination="true"
            rownumbers="true" fitColumns="true" singleSelect="true">
        <thead>
            <tr>
                <th field="Station_Name" width="10">车站</th>
                <th field="Bus" width="30">经过车次</th>
            </tr>
        </thead>
    </table>
    <div id="toolbar">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editStation()">查看</a>&nbsp&nbsp
       请输入要查询的车次：<input id="busname" class="easyui-textbox" style="width: 100px" />   
       <a href="#"  class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="Search()">搜索</a>  
    </div>
    <div id="dlg" class="easyui-dialog" style="width:400px;height:300px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        <div class="ftitle">车站信息</div>
        <form id="fm" method="post" novalidate>
            <div class="fitem">
                <label>站名:</label>
                <input id="stationname" class="easyui-textbox" disabled="true" required="true" onblur="checkstationname()">
            </div>
            <div class="fitem">
                <label>经过车次：</label>
                <asp:TextBox ID="bus" TextMode="MultiLine"  disabled="true"  style="width:300px;height:100px"
          runat="server"></asp:TextBox>
            </div>
            <label id = "flag"></label>
            <label id = "stationid"></label>
        </form>
    </div>
    
    <style type="text/css">
        #fm{
            margin:0;
            padding:10px 30px;
        }
        .ftitle{
            font-size:14px;
            font-weight:bold;
            padding:5px 0;
            margin-bottom:10px;
            border-bottom:1px solid #ccc;
        }
        .fitem{
            margin-bottom:5px;
        }
        .fitem label{
            display:inline-block;
            width:80px;
        }
        .fitem input{
            width:160px;
        }
    </style>
    </form>
</body>
</html>
