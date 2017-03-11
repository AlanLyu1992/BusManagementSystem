<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DriverManage.aspx.cs" Inherits="城市公交管理系统_ASP.DriverManage" %>

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
    $("#dg").datagrid('reload'); 
</script>
</head>
<body>
    <form id="form1" runat="server">
     <div>
        <img src = "/Pictures/Title.png" width = "100%" height = "10%" />
    </div>  
    <table id="dg" title="司机信息" class="easyui-datagrid" style="width:1350px;height:500px"
            url="DriverInfo.ashx?mode=1"
            toolbar="#toolbar" pagination="true"
            rownumbers="true" fitColumns="true" singleSelect="true">
        <thead>
            <tr>
                <th field="Name" width="50">姓名</th>
                <th field="BirthDate" width="50">出生日期</th>
                <th field="BirthPlace" width="50">出生地</th>
                <th field="Age" width="50">年龄</th>
                <th field="Vehicle" width="50">所属车辆</th>
                <th field="Wage" width="50">工资</th>
                <th field="DriverNo" width="50">工号</th>
            </tr>
        </thead>
    </table>
    <div id="toolbar">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newDriver()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editDriver()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyDriver()">删除</a>
        &nbsp&nbsp&nbsp
        请输入要查询司机工号：<input id="driver_no" class="easyui-textbox" style="width: 100px" />   
       <a href="#"  class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="Search()">搜索</a>  
    </div>
    
    <div id="dlg" class="easyui-dialog" style="width:400px;height:320px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        <div class="ftitle">新增司机信息</div>
        <form id="fm" method="post" novalidate>
            <div class="fitem">
                <label>姓名:</label>
                <input id="Name" class="easyui-textbox" required="true">
            </div>
            <div class="fitem">
                <label>工号:</label>
                <input runat="server" id="DriverNo" class="easyui-textbox" required="true">
            </div>
            <div class="fitem">
                <label>出生日期:</label>
                <input id="BirthDate" class="easyui-textbox" required="true">
            </div>
            <div class="fitem">
                <label>出生地:</label>
                <input id="BirthPlace" class="easyui-textbox" required="true">
            </div>
            <div class="fitem">
                <label>年龄:</label>
                <input id="Age" class="easyui-textbox" required="true">
            </div>
            <div class="fitem">
                <label>所属车辆:</label>
                <input id="BusNo" class="easyui-textbox" required="true" onblur="checkVehicle()">
            </div>
            <div class="fitem">
                <label>工资：</label>
                 <input id="Wage" class="easyui-numberbox" precision="2" required="true"></input>
            </div>
            <label id = "flag"></label>
        </form>
    </div>
    <div id="dlg-buttons">
        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveDriver()" style="width:90px">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')" style="width:90px">取消</a>
    </div>
    <asp:Button ID="savebutton" runat="server" Text="Button"  Height = "0px" Width ="0px"
        onclick="savebutton_Click" />
    <script type="text/javascript">
        var url;
        function newDriver() {
            $('#flag').val("add");
            $('#dlg').dialog('open').dialog('setTitle', '新增司机信息');
            $('#fm').form('clear');
            $('#DriverNo').val("");
            $('#Name').val("");
            $('#Age').val("");
            $('#DriverNo').val("");
            $('#BirthDate').val("");
            $('#BirthPlace').val("");
            $('#Wage').val("");
            $('#BusNo').val("");
        }
        function Search() {
            var page = $('#dg').datagrid('options').pageNumber;
            var rows = $('#dg').datagrid('options').pageSize;
            var driverno = $("#driver_no").val();
            $('#dg').datagrid('reload', { page: page, rows: rows, driverno: driverno, mode: 1 });
        }
        function checkVehicle() {
            var vehicleno = $('#BusNo').val();
            $.ajax({
                url: 'DriverInfo.ashx',
                data: {
                    mode: 4,
                    vehicleno: vehicleno
                },
                type: 'post',
                cache: false,
                dataType: 'json',
                success: function (data) {
                    if (data.toString().trim() != "true") {
                        alert("不存在该车辆，请重新检查输入！");
                    } else {
                    }
                },
                error: function () {
                    alert("异常！");
                }
            });
        }
        function editDriver() {
            var row = $('#dg').datagrid('getSelected');
            var driverid = row.DriverId;
            $("#flag").val("edit");
            if (row) {
                $('#Name').val(row.Name.trim());
                $('#DriverNo').val(row.DriverNo.trim());
                $('#BirthDate').val(row.BirthDate.trim());
                $('#BirthPlace').val(row.BirthPlace.trim());
                $('#Wage').val(row.Wage.trim());
                $('#Age').val(row.Age.trim());
                $('#BusNo').val(row.Vehicle.trim());
                $('#dlg').dialog('open').dialog('setTitle', '编辑司机信息');
                $('#fm').form('load', row);
            }
        }
        function saveDriver() {
            var row = $('#dg').datagrid('getSelected');
            var name = $('#Name').val();
            var driverno = $('#DriverNo').val();
            var birthdate = $("#BirthDate").val();
            var birthplace = $('#BirthPlace').val();
            var wage = $('#Wage').val();
            var age = $('#Age').val();
            var busno = $('#BusNo').val();
            var flag = $('#flag').val();
            if (flag == "edit") {
                var driverid = row.DriverId;
                $.ajax({
                    url: 'DriverInfo.ashx',
                    data: {
                        mode: 2,
                        flag: flag,
                        name: name,
                        age: age,
                        driverid: driverid,
                        driverno: driverno,
                        birthdate: birthdate,
                        birthplace: birthplace,
                        wage: wage,
                        busno: busno
                    },
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        if (data.toString().trim() != "false") {
                            // view("修改成功！");    
                            alert("修改成功！");
                            window.location.reload();
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
            else {
                $.ajax({
                    url: 'DriverInfo.ashx',
                    data: {
                        mode: 2,
                        flag: flag,
                        name: name,
                        driverno: driverno,
                        birthdate: birthdate,
                        birthplace: birthplace,
                        age: age,
                        wage: wage,
                        busno: busno
                    },
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        if (data.toString().trim() == "true") {
                            // view("修改成功！");    
                            alert("修改成功！");
                            window.location.reload();
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
        function destroyDriver() {
            var row = $('#dg').datagrid('getSelected');
            if (row) {
                $.messager.confirm('提醒', '你真的要删除这条记录吗?', function (r) {
                    if (r) {
                        $.post('DriverInfo.ashx?mode=3', { driverid: row.DriverId }, function (result) {
                            if (result.toString().trim() != "false") {
                                $('#dg').datagrid('reload');    // reload the user data
                                alert("成功！");
                                var page = $('#dg').datagrid('options').pageNumber;
                                var rows = $('#dg').datagrid('options').pageSize;
                                $('#dg').datagrid('reload', { page: page, rows: rows, mode: 1 });
                            } else {
                                alert("异常");
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
