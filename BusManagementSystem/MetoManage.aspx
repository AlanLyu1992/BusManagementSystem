<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MetoManage.aspx.cs" Inherits="城市公交管理系统_ASP.MetoManage" %>

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

    function editMeto() {
        var row = $('#dg').datagrid('getSelected');
        $("#flag").val("edit");
        if (row) {
            $('#metotext').val(row.MetoText);
            $('#metoname').val(row.MetoName);
            $('#settime').val(row.SetTime);
            $('#finishtime').val(row.FinishTime);
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

    function saveMeto() {
        var row = $('#dg').datagrid('getSelected');
        var metoname = $("#metoname").val();
        var metotext = $("#metotext").val();
        var settime = $("#settime").val();
        var finishtime = $("#finishtime").val();
        var flag = $("#flag").val();
        if (flag == "add") {
            $.ajax({
                url: 'MetoInfo.ashx',
                data: {
                    mode: 2,
                    flag: flag,
                    metoname: metoname,
                    metotext: metotext,
                    settime: settime,
                    finishtime: finishtime
                },
                type: 'post',
                cache: false,
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data != "false") {
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
                url: 'MetoInfo.ashx',
                data: {
                    mode: 2,
                    flag: flag,
                    metoname: metoname,
                    metotext: metotext,
                    settime: settime,
                    finishtime: finishtime
                },
                type: 'post',
                cache: false,
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data != "false") {
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
</script>
</head>
<body>
   <form id="form1" runat="server">
     <div>
        <img src = "/Pictures/Title.png" width = "100%" height = "10%" />
    </div>  
    <table id="dg" title="备忘录信息" class="easyui-datagrid" style="width:1350px;height:500px"
            url="MetoInfo.ashx?mode=1"
            toolbar="#toolbar" pagination="true"
            rownumbers="true" fitColumns="true" singleSelect="true">
        <thead>
            <tr>
                <th field="MetoName" width="10">备忘录名称</th>
                <th field="MetoText" width="50">具体内容</th>
                <th field="SetTime" width="10">创建时间</th>
                <th field="FinishTime" width="10">完成时间</th>
            </tr>
        </thead>
    </table>
    <div id="toolbar">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newMeto()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editMeto()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="deleteMeto()">删除</a>
      
    
    <div id="dlg" class="easyui-dialog" style="width:400px;height:250px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        <div class="ftitle">备忘录信息</div>
        <form id="fm" method="post" novalidate>
            <div class="fitem">
                <label>备忘项:</label>
                <input id="metoname" class="easyui-textbox" required="true">

            </div>
            <div class="fitem">
                <label>备忘内容：</label>
                <input runat="server" id="metotext" class="easyui-textbox" height="50px" required="true">
            </div>
            <div class="fitem">
                <label>设置时间:</label>
                <input id="settime" class="easyui-textbox">
            </div>
            <div class="fitem">
                <label>完成时间:</label>
                <input id="finishtime" class="easyui-textbox">
            </div>
            <label id = "flag"></label>
        </form>
    </div>
    <div id="dlg-buttons">
        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveMeto()" style="width:90px">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')" style="width:90px">取消</a>
    </div>
    <script type="text/javascript">
        var url;
        function newMeto() {
            $('#flag').val("add");
            $('#metoname').val("");
            $('#metotext').val("");
            $('#settime').val("");
            $('#finishtime').val("");
            $('#dlg').dialog('open').dialog('setTitle', '新增备忘录信息');
            $('#fm').form('clear');
        }

        function deleteMeto() {
            var row = $('#dg').datagrid('getSelected');
            if (row) {
                $.messager.confirm('提示', '你真的要删除这条记录吗?', function (r) {
                    if (r) {
                        $.post('MetoInfo.ashx?mode=3', { metoname: row.MetoName }, function (data) {
                            if (data.toString().trim() != "false") {
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
