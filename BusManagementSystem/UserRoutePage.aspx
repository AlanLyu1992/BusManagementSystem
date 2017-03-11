
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
    function Search() {
       // $('#dlg').dialog('open').dialog('setTitle', '换乘信息');
        $('#fm').form('clear');
        var originstation = $('#originstation').val();
        var terminus = $('#terminus').val();
        $.ajax({
            url: 'RouteInfo.ashx',
            data: {
                originstation: originstation,
                terminus: terminus
            },
            type: 'post',
            cache: false,
            success: function (data) {
                if (data == "false") {
                    alert("异常！")
                } else {
                    var msg = data.split(',');
                    if (msg.length == 2) {
                        var busname1 = "乘坐" + msg[0] + "路";
                        var route1 = msg[1] + "站";
                        var terminus1 = "在" + terminus + "站下车";
                        $("#busname1").text(busname1);
                        $("#route1").text(route1);
                        $("#terminus1").text(terminus1);
                    }
                    else if (msg.length == 6) {
                        var busname1 = "乘坐" + msg[0] + "路";
                        var route1 = msg[1] + "站";
                        var middlestation = "在" + msg[2] + "站下车"
                        var busname2 = "乘坐" + msg[3] + "路";
                        var route2 = msg[4] + "站";
                        $("#busname1").text(busname1);
                        $("#route1").text(route1);
                        $("#middlestation").text(middlestation);
                        $("#busname2").text(busname2);
                        $("#route2").text(route2);
                        $("#terminus1").text("在" + terminus + "站下车");

                    }
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
    <div id="p" class="easyui-panel" title="换乘查询" style="width:1500px;height:300px;padding:10px;">
        <p style="font-size:14px">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 输入您所处的车站以及您的目的地车站：</p>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <input id="originstation" class="easyui-textbox" style="width:200px;height:20px">到
        
        <input id="terminus" class="easyui-textbox" style="width:200px;height:20px">
        <a href="#"  class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="Search()">搜索</a>
        <br />
        <br />
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <label id = "busname1"></label>&nbsp<label id = "route1"></label><br /><br />
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <label id = "middlestation"></label><br />
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <label id = "busname2"></label>&nbsp<label id = "route2"></label><br />
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <label id = "terminus1"></label><br />
    </div>
    <div id="dlg" class="easyui-dialog" style="width:400px;height:300px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        <div class="ftitle"></div>
        <form id="fm" method="post" novalidate>
           
            <label id = "busname"></label>
            <label id = "routes"></label>
        </form>
    </div>
    </form>
</body>
</html>
