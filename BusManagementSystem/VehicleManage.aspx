<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="VehicleManage.aspx.cs" Inherits="城市公交管理系统_ASP.VehicleManage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<script type="text/javascript" src="/Scripts/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="/Scripts/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="/Scripts/js/easyui-lang-zh_CN.js"></script>
<link rel="stylesheet" type="text/css" href="/theme/default/easyui.css"/>  
<link rel="stylesheet" type="text/css" href="/theme/icon.css"/>  
<script type="text/javascript">
    $("#dg").datagrid('reload'); 
</script>
</head>
<body>
    <form id="form1" runat="server">
     <div>
        <img src = "/Pictures/Title.png" width = "100%" height = "10%" />
    </div>  
    <table id="dg" title="车辆信息" class="easyui-datagrid" style="width:1350px;height:500px"
            url="Vehicleashx.ashx?mode=1"
            toolbar="#toolbar" pagination="true"
            rownumbers="true" fitColumns="true" singleSelect="true">
        <thead>
            <tr>
                <th field="VehicleNo" width="50">车牌号</th>
                <th field="Producer" width="50">生产商</th>
                <th field="Bus" width="50">所属车辆</th>
                <th field="DeliveryTime" width="50">出厂日期</th>
            </tr>
        </thead>
    </table>
    <div id="toolbar">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newVehicle()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editVehicle()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyVehicle()">删除</a>
         &nbsp&nbsp&nbsp
        请输入要查询汽车车牌号：<input id="vehicle_no" class="easyui-textbox" style="width: 100px" />   
       <a href="#"  class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="Search()">搜索</a>  
    </div>
    
    <div id="dlg" class="easyui-dialog" style="width:400px;height:280px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        <div class="ftitle">车辆信息</div>
        <form id="fm" method="post" novalidate>
            <div class="fitem">
                <label>车牌号:</label>
                <input id ="vehicleno" class="easyui-textbox" required="true">
            </div>
            <div class="fitem">
                <label>所属车次:</label>
                <input id = "busname" class="easyui-textbox" required="true" onblur ="checkbusname()">
            </div>
            <div class="fitem">
                <label>生产商:</label>
                <input id ="producer" class="easyui-textbox">
            </div>
            <div class="fitem">
                <label>出厂时间:</label>
                <input id="deliverytime" class="easyui-textbox" validType="email">
            </div>
            <label id = "flag"></label>
            <label id = "vehicleid"></label>
        </form>
    </div>
    <div id="dlg-buttons">
        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveVehicle()" style="width:90px">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')" style="width:90px">取消</a>
    </div>
    <script type="text/javascript">
        var url;
        function newVehicle() {
            $('#flag').val("add");
            $('#dlg').dialog('open').dialog('setTitle', '新增车辆');
            $('#fm').form('clear');
            $('#busname').val("");
            $('#vehicleno').val("");
            $('#producer').val("");
            $('#deliverytime').val("");
        }

        function Search() {
            var page = $('#dg').datagrid('options').pageNumber;
            var rows = $('#dg').datagrid('options').pageSize;
            var vehicleno = $("#vehicle_no").val();
            $('#dg').datagrid('reload', { page: page, rows: rows, vehicleno: vehicleno, mode: 1 });
        }

        function editVehicle() {
            var row = $('#dg').datagrid('getSelected');
            var vehicleid = row.VehicleId;
            $("#flag").val("edit");
            $("#vehicleid").val(vehicleid);
            if (row) {
                $('#busname').val(row.Bus.trim());
                $('#vehicleno').val(row.VehicleNo.trim());
                $('#producer').val(row.Producer.trim());
                $('#deliverytime').val(row.DeliveryTime.trim());
                $('#dlg').dialog('open').dialog('setTitle', '编辑车次信息');
                $('#fm').form('load', row);
            }
        }
        function saveVehicle() {
            var row = $('#dg').datagrid('getSelected');
            var vehicleno = $("#vehicleno").val();
            var busname = $("#busname").val();
            var producer = $("#producer").val();
            var deliverytime = $("#deliverytime").val();
            var flag = $("#flag").val();
            if (flag == "edit") {
                var vehicleid = row.VehicleId;
                $.ajax({
                    url: 'Vehicleashx.ashx',
                    data: {
                        mode: 2,
                        flag: flag,
                        vehicleno: vehicleno,
                        vehicleid: vehicleid,
                        busname: busname,
                        producer: producer,
                        deliverytime: deliverytime
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
                    url: 'Vehicleashx.ashx',
                    data: {
                        mode: 2,
                        flag: flag,
                        busname: busname,
                        vehicleno: vehicleno,
                        producer: producer,
                        deliverytime: deliverytime
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
                        // view("异常！");    
                        alert("异常！");
                    }
                });

            }
            $("#dlg").dialog('close');
            $("#dg").datagrid('reload');
        }
        function destroyVehicle() {
            var row = $('#dg').datagrid('getSelected');
            if (row) {
                $.messager.confirm('提示', '你确定要删除这条记录吗?', function (r) {
                    if (r) {
                        $.post('Vehicleashx.ashx?mode=3', { vehicleid: row.VehicleId }, function (data) {
                            if (data.toString().trim() == "true") {
                                $('#dg').datagrid('reload');    // reload the user data
                                alert("成功！");
                                var page = $('#dg').datagrid('options').pageNumber;
                                var rows = $('#dg').datagrid('options').pageSize;
                                $('#dg').datagrid('reload', { page: page, rows: rows,mode: 1 });
                            } else {
                                alert("异常");
                            }
                        }, 'json');
                    }
                });
            }
        }

        function checkbusname() {
        var busname = $("#busname").val();
        $.ajax({
            url: 'BusInfo.ashx',
            data: {
                mode: 3,
                busname: busname
            },
            type: 'post',
            cache: false,
            success: function (data) {
                if (data == "false") {
                    alert("不存在该车次，请重新输入！")
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
