<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BusManage.aspx.cs" Inherits="城市公交管理系统_ASP.BusManage" %>

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

    function checkbusname() {
        if ($("#flag").val() == "edit") {
            return;
        }
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
                if (data == "true") {
                    alert("此车次已经存在！")
                } else {
                }
            },
            error: function () {
                // view("异常！");    
                alert("异常！");
            }
        });
    }
    function checkuproute() {
        var route = $("#up").val();
        $.ajax({
            url: 'BusInfo.ashx',
            data: {
                mode: 4,
                route: route
            },
            type: 'post',
            cache: false,
            success: function (data) {
                if (data == "true") {

                } else {
                    alert("不存在 "+ data + " 车站，请重新输入！")
                }
            },
            error: function () {
                // view("异常！");    
                alert("异常！");
            }
        });
    }

    function checkdownroute() {
        var route = $("#down").val();
        $.ajax({
            url: 'BusInfo.ashx',
            data: {
                mode: 4,
                route: route
            },
            type: 'post',
            cache: false,
            success: function (data) {
                if (data == "true") {
                } else {
                    alert("不存在 " + data + " 车站，请重新输入！")
                }
            },
            error: function () {
                // view("异常！");    
                alert("异常！");
            }
        });
    }

    function editBus() {
        var row = $('#dg').datagrid('getSelected');
        var busid = row.BusId;
        $("#flag").val("edit");
        $("#busid").val(busid);
        if (row) {
            $('#busname').val(row.BusName.trim());
            $('#originstation').val(row.OriginStation.trim());
            $('#o_firstbustime').val(row.O_FirstBusTime.trim());
            $('#o_lastbustime').val(row.O_LastBusTime.trim());
            $('#terminus').val(row.Terminus.trim());
            $('#t_firstbustime').val(row.T_FirstBusTime.trim());
            $('#t_lastbustime').val(row.T_LastBusTime.trim());
            $('#up').val(row.Up.trim());
            $('#down').val(row.Down.trim());
            $('#note').val(row.Note.trim());
            $('#dlg').dialog('open').dialog('setTitle', '编辑车次信息');
            $('#fm').form('load', row);
        }
    }

    function Search() {
        var page = $('#dg').datagrid('options').pageNumber;
        var rows = $('#dg').datagrid('options').pageSize;
        var busname = $("#bus_name").val();
        $('#dg').datagrid('reload', { page: page, rows: rows, busname: busname, mode: 1 });
    }

    function saveBus() {
        var row = $('#dg').datagrid('getSelected');
        var busname = $("#busname").val();
        var originstation = $("#originstation").val();
        var o_firstbustime = $("#o_firstbustime").val();
        var o_lastbustime = $("#o_lastbustime").val();
        var terminus = $("#terminus").val();
        var t_firstbustime = $("#t_firstbustime").val();
        var t_lastbustime = $("#t_lastbustime").val();
        var up = $("#up").val();
        var down = $("#down").val();
        var note = $("#note").val();
        var flag = $("#flag").val();
        if (flag == "edit") {
            var busid = row.BusId;
            $.ajax({
                url: 'BusInfo.ashx',
                data: {
                    mode: 2,
                    flag: flag,
                    busid: busid,
                    busname: busname,
                    originstation: originstation,
                    o_firstbustime: o_firstbustime,
                    o_lastbustime: o_lastbustime,
                    terminus: terminus,
                    t_firstbustime: t_firstbustime,
                    t_lastbustime: t_lastbustime,
                    up: up,
                    down: down,
                    note: note
                },
                type: 'post',
                cache: false,
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data.msg != "false") {
                        alert("成功！");
                    } else {
                        view(data.msg);
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
                url: 'BusInfo.ashx',
                data: {
                    mode: 2,
                    flag: flag,
                    busname: busname,
                    originstation: originstation,
                    o_firstbustime: o_firstbustime,
                    o_lastbustime: o_lastbustime,
                    terminus: terminus,
                    t_firstbustime: t_firstbustime,
                    t_lastbustime: t_lastbustime,
                    up: up,
                    down: down,
                    note: note
                },
                type: 'post',
                cache: false,
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data.msg != "false") {
                        alert("成功！");
                    } else {
                        view(data.msg);
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
    function rowformater(value, row, index) {
        var s = '<a href="#" onclick="saverow(' + index + ')">保存</a> ';
        return s;
    }
   
</script>
</head>
<body>
   <form id="form1" runat="server">
     <div>
        <img src = "/Pictures/Title.png" width = "100%" height = "10%" />
    </div>  
    <table id="dg" title="车次信息" class="easyui-datagrid" style="width:1350px;height:500px"
            url="BusInfo.ashx?mode=1"
            toolbar="#toolbar" pagination="true"
            rownumbers="true" fitColumns="true" singleSelect="true">
        <thead>
            <tr>
                <th field="BusName" width="10">车次</th>
                <th field="OriginStation" width="20">起点站</th>
                <th field="O_FirstBusTime" width="20">上行首班时间</th>
                <th field="O_LastBusTime" width="20">上行末班时间</th>
                <th field="Terminus" width="20">终点站</th>
                <th field="T_FirstBusTime" width="20">下行首班时间</th>
                <th field="T_LastBusTime" width="20">下行末班时间</th>
                <th field="Up" width="60">上行路线</th>
                <th field="Down" width="60">下行路线</th>
                <th field="Note" width="30">票价</th>
            </tr>
        </thead>
    </table>
    <div id="toolbar">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newBus()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editBus()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="deleteBus()">删除</a>
        &nbsp&nbsp&nbsp
        请输入要查询的车次：<input id="bus_name" class="easyui-textbox" style="width: 100px" />   
       <a href="#"  class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="Search()">搜索</a>  
    </div>
    
    <div id="dlg" class="easyui-dialog" style="width:400px;height:600px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        <div class="ftitle">车次信息</div>
        <form id="fm" method="post" novalidate>
            <div class="fitem">
                <label>车次:</label>
                <input id="busname" class="easyui-textbox" required="true" onblur="checkbusname()">

            </div>
            <div class="fitem">
                <label>起点站：</label>
                <input runat="server" id="originstation" class="easyui-textbox" required="true">
            </div>
            <div class="fitem">
                <label>上行首班时间:</label>
                <input id="o_firstbustime" class="easyui-textbox">
            </div>
            <div class="fitem">
                <label>上行末班时间:</label>
                <input id="o_lastbustime" class="easyui-textbox">
            </div>
            <div class="fitem">
                <label>终点站:</label>
                <input id="terminus" class="easyui-textbox">
            </div>
            <div class="fitem">
                <label>下行首班时间：</label>
                 <input id="t_firstbustime" class="easyui-textbox">
            </div>
            <div class="fitem">
                <label>下行末班时间：</label>
                 <input id="t_lastbustime" class="easyui-textbox">
            </div>
            <div class="fitem">
                <label>上行路线（站名以-分割）：</label>
                <asp:TextBox ID="up" TextMode="MultiLine" style="width:300px;height:100px" onblur = "checkuproute()"
          runat="server"></asp:TextBox>
            </div>
            <div class="fitem">
                <label>下行路线（站名以-分割）：</label>
                <asp:TextBox ID="down" TextMode="MultiLine" style="width:300px;height:100px" onblur = "checkdownroute()"
          runat="server"></asp:TextBox>
            </div>
            <div class="fitem">
                <label>票价：</label>
                 <input id="note" class="easyui-textbox">
            </div>
            <label id = "flag"></label>
            <label id = "busid"></label>
        </form>
    </div>
    <div id="dlg-buttons">
        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveBus()" style="width:90px">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')" style="width:90px">取消</a>
    </div>
    <script type="text/javascript">
        var url;
        function newBus() {
            $('#flag').val("add");
            $('#dlg').dialog('open').dialog('setTitle', '新增车次信息');
            $('#fm').form('clear');
            $('#busname').val("");
            $('#originstation').val("");
            $('#o_firstbustime').val("");
            $('#o_lastbustime').val("");
            $('#terminus').val("");
            $('#t_firstbustime').val("");
            $('#t_lastbustime').val("");
            $('#up').val("");
            $('#down').val("");
            $('#note').val("");
        }
        
        function deleteBus() {
            var row = $('#dg').datagrid('getSelected');
            if (row) {
                $.messager.confirm('提示', '你真的要删除这条记录吗?', function (r) {
                    if (r) {
                        $.post('BusInfo.ashx?mode=5', { busname: row.BusName, busid: row.BusId, upstr: row.Up, downstr: row.Down }, function (data) {
                            if (data.toString().trim() != "false") {
                                $('#dg').datagrid('reload');    // reload the user data
                                var page = $('#dg').datagrid('options').pageNumber;
                                var rows = $('#dg').datagrid('options').pageSize;
                                var busname = ""
                                $('#dg').datagrid('reload', { page: page, rows: rows, busname: busname, mode: 1 });
                            } else {
                                alert("异常！")
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
