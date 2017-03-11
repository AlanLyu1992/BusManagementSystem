<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserBusPage.aspx.cs" Inherits="城市公交管理系统_ASP.UserBusPage" %>

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
    function editBus() {
        var row = $('#dg').datagrid('getSelected');
        var busid = row.BusId;
        $("#flag").val("edit");
        $("#busid").val(busid);
        if (row) {
            $('#bus_name').val(row.BusName);
            $('#originstation').val(row.OriginStation);
            $('#o_firstbustime').val(row.O_FirstBusTime);
            $('#o_lastbustime').val(row.O_LastBusTime);
            $('#terminus').val(row.Terminus);
            $('#t_firstbustime').val(row.T_FirstBusTime);
            $('#t_lastbustime').val(row.T_LastBusTime);
            $('#up').val(row.Up);
            $('#down').val(row.Down);
            $('#note').val(row.Note);
            $('#dlg').dialog('open').dialog('setTitle', '查看车次信息');
            $('#fm').form('load', row);
        }
    }
    function getQueryParams(queryParams) {
        var busname = $('#busname').val();
        var page = $('#dg').datagrid('options').pageNumber;
        var rows = $('#dg').datagrid('options').pageSize;
        var mode = 1;
        queryParams.busname = busname;
        queryParams.page = page;
        queryParams.rows = rows;
        queryParams.mode = mode;
        return queryParams;
    }

    function reloadgrid() {
        var queryParams = $('#dg').datagrid('options').queryParams;
        getQueryParams(queryParams);
        $('#dg').datagrid('options').queryParams = queryParams;
        alert(queryParams.mode)
        $("#dg").datagrid('reload');

    }

    function Search() {
        var page = $('#dg').datagrid('options').pageNumber;
        var rows = $('#dg').datagrid('options').pageSize;
        var busname = $("#busname").val();
//        $.ajax({
//            url: 'BusInfo.ashx',
//            data: {
//                mode: 2,
//                busname: busname,
//                page: page,
//                rows: rows
//            },
//            type: 'post',
//            cache: false,
//            dataType: 'json',
//            success: function (data) {
//                if (data.msg != "false") {
//                    alert("成功！");
//                } else {
//                    view(data.msg);
//                }
//            },
//            error: function () {
//                // view("异常！");    
//                alert("异常！");
//            }
//        });
        $('#dg').datagrid('reload', { page: page, rows: rows,busname:busname,mode:1 });
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
                <th field="BusName" width="50">车次</th>
                <th field="OriginStation" width="50">起点站</th>
                <th field="O_FirstBusTime" width="50">上行首班时间</th>
                <th field="O_LastBusTime" width="50">上行末班时间</th>
                <th field="Terminus" width="50">终点站</th>
                <th field="T_FirstBusTime" width="50">下行首班时间</th>
                <th field="T_LastBusTime" width="50">下行末班时间</th>
                <th field="Up" width="50">上行路线</th>
                <th field="Down" width="50">下行路线</th>
                <th field="Note" width="50">票价</th>
            </tr>
        </thead>
    </table>
    <div id="toolbar">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editBus()">查看</a>&nbsp&nbsp
       请输入要查询的车次：<input id="busname" class="easyui-textbox" style="width: 100px" />   
       <a href="#"  class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="Search()">搜索</a>  
    </div>
    <div id="dlg" class="easyui-dialog" style="width:400px;height:650px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        <div class="ftitle">车次信息</div>
        <form id="fm" method="post" novalidate>
            <div class="fitem">
                <label>车次:</label>
                <input id="bus_name" class="easyui-textbox" required="true" disabled = "true" onblur="checkbusname()">

            </div>
            <div class="fitem">
                <label>起点站：</label>
                <input runat="server" id="originstation" class="easyui-textbox" disabled = "true" required="true">
            </div>
            <div class="fitem">
                <label>上行首班时间:</label>
                <input id="o_firstbustime" class="easyui-textbox" disabled = "true">
            </div>
            <div class="fitem">
                <label>上行末班时间:</label>
                <input id="o_lastbustime" class="easyui-textbox" disabled = "true">
            </div>
            <div class="fitem">
                <label>终点站:</label>
                <input id="terminus" class="easyui-textbox" disabled = "true">
            </div>
            <div class="fitem">
                <label>下行首班时间：</label>
                 <input id="t_firstbustime" class="easyui-textbox" disabled = "true">
            </div>
            <div class="fitem">
                <label>下行末班时间：</label>
                 <input id="t_lastbustime" class="easyui-textbox" disabled = "true">
            </div>
            <div class="fitem">
                <label>上行路线：</label>
                <asp:TextBox ID="up" TextMode="MultiLine" style="width:300px;height:100px" disabled="true"
          runat="server"></asp:TextBox>
            </div>
            <div class="fitem">
                <label>下行路线：</label>
                <asp:TextBox ID="down" TextMode="MultiLine" style="width:300px;height:100px" disabled="true"
          runat="server"></asp:TextBox>
            </div>
            
            <div class="fitem">
                <label>票价：</label>
                 <input id="note" class="easyui-textbox" disabled = "true">
            </div>
            <label id = "flag"></label>
            <label id = "busid"></label>
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
