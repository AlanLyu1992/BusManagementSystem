<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StationManage.aspx.cs" Inherits="城市公交管理系统_ASP.StationManage" %>

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
    });

    function editStation() {
        var row = $('#dg').datagrid('getSelected');
        var stationid = row.Station_Id
        $("#flag").val("edit");
        $("#stationid").val(stationid);
        if (row) {
            $('#stationname').val(row.Station_Name.trim());
            $('#bus').val(row.Bus.trim());
            $('#dlg').dialog('open').dialog('setTitle', '编辑车次信息');
            $('#fm').form('load', row);
        }
    }

    function Search() {
        var page = $('#dg').datagrid('options').pageNumber;
        var rows = $('#dg').datagrid('options').pageSize;
        var stationname = $("#station_name").val();
        $('#dg').datagrid('reload', { page: page, rows: rows, stationname: stationname, mode: 1 });
    }

    function saveStation() {
        var stationname = $("#stationname").val();
        var row = $('#dg').datagrid('getSelected');
        var flag = $("#flag").val();
        if (flag == "edit") {
            var stationid = row.Station_Id;
            $.ajax({
                url: 'StationInfo.ashx',
                data: {
                    mode: 2,
                    flag: flag,
                    stationid: stationid,
                    stationname: stationname,
                },
                type: 'post',
                cache: false,
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data.toString().trim() != "false") {
                        alert("成功！");
                    } else {
                        alert("异常");
                    }
                },
                error: function () {
                    // view("异常！");    
                    alert("异常！");
                }
            });
        }
        else {
            $.ajax({
                url: 'StationInfo.ashx',
                data: {
                    mode: 2,
                    flag: flag,
                    stationname: stationname,
                },
                type: 'post',
                cache: false,
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data.toString().trim() != "false") {
                        alert("成功！");
                    } else {
                        alert("异常！");
                    }
                },
                error: function () {  
                    alert("异常！");
                }
            });
        }
        $("#dlg").dialog('close');
        $("#dg").datagrid('reload');
    }



    function checkstationname() {
        if ($("#flag").val() == "edit") {
            return;
        }
        var stationname = $("#stationname").val();
        $.ajax({
            url: 'StationInfo.ashx',
            data: {
                mode: 3,
                station: stationname
            },
            type: 'post',
            cache: false,
            success: function (data) {
                if (data == "true") {
                    alert("此车站已经存在！")
                } else {
                }
            },
            error: function () {
                // view("异常！");    
                alert("异常！");
            }
        });
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
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newStation()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editStation()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyStation()">删除</a>
         &nbsp&nbsp&nbsp
        请输入要查询的车站：<input id="station_name" class="easyui-textbox" style="width: 100px" />   
       <a href="#"  class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="Search()">搜索</a>  
    </div>
    
    <div id="dlg" class="easyui-dialog" style="width:400px;height:300px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        <div class="ftitle">车站信息</div>
        <form id="fm" method="post" novalidate>
            <div class="fitem">
                <label>站名:</label>
                <input id="stationname" class="easyui-textbox" required="true" onblur="checkstationname()">
            </div>
            <div class="fitem">
                <label>经过车次：</label>
                <asp:TextBox ID="bus" TextMode="MultiLine" style="width:300px;height:100px" disabled="true"
          runat="server"></asp:TextBox>
            </div>
            <label id = "flag"></label>
            <label id = "stationid"></label>
        </form>
    </div>
    <div id="dlg-buttons">
        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveStation()" style="width:90px">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')" style="width:90px">取消</a>
    </div>
    <script type="text/javascript">
        var url;
        function newStation() {
            $('#flag').val("add");
            $('#dlg').dialog('open').dialog('setTitle', '新增车站信息');
            $('#fm').form('clear');
            $('#stationname').val("");
            $('#bus').val("");
        }

        
        function destroyStation() {
            var row = $('#dg').datagrid('getSelected');
            if (row) {
                $.messager.confirm('提示', '你确定要删除这条记录吗?', function (r) {
                    if (r) {
                        $.post('StationInfo.ashx?mode=4', { stationid: row.Station_Id, stationname: row.Station_Name }, function (result) {
                            if (result.toString().trim() != "false") {
                                $('#dg').datagrid('reload');    // reload the user data
                            } else {
                                alert("异常！");
                            }
                        }, 'json');
                    }
                });
            }
        }
    </script>
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
