/************************************************** 
//函数名称：KeyPressFloat 兼容FF
//参数说明：       参数名
//功能描述：控制文本框只能输入数字
//示例： <input type="text" class="TextBox" runat="server" id="txt_money" onkeypress="KeyPressFloat(event)" onpaste="return !clipboardData.getData('text').match(/\D/)" ondragenter="return false" style="ime-mode: Disabled" />
**************************************************/
function KeyPressFloat(ev) {
    var event = ev || window.event;                             //IE、FF下获取事件对象
    var currentKey = event.charCode || event.keyCode;             //IE、FF下获取键盘码
    if ((currentKey >= 45 && currentKey <= 57 && currentKey != 47) || currentKey == 8)
        event.returnValue = true;
    else {
        if (window.event)                       //IE
            event.returnValue = false;                 //e.returnValue = false;效果相同.
        else                                    //Firefox
            event.preventDefault();
    }
}

/**************************************************
//函数名称：KeyPressInt 兼容FF
//参数说明：输入参数1. NoNegative 是否允许负数，参数类型：整数。0为允许，默认是1不允许
//功能描述：对键盘按下的字母进行交验，只允许输入整数，包括“-”负号和“.”小数点。
//调用：输入框的onkeypress事件，onkeypress="KeyPressInt(event);"
**************************************************/
function KeyPressInt(ev, NoNegative) {
    if ((typeof (NoNegative) == "undefined") || (NoNegative == null))
        NoNegative = 1
    if (typeof (NoNegative) == "string")
        NoNegative = parseInt(NoNegative)
    if (isNaN(NoNegative))
        NoNegative = 0
    var event = ev || window.event;                             //IE、FF下获取事件对象
    var currentKey = event.charCode || event.keyCode;             //IE、FF下获取键盘码


    if (NoNegative == 0) {
        if ((currentKey >= 48 && currentKey <= 57) || currentKey == 45 || currentKey == 8)//负数
            event.returnValue = true;
        else {
            if (window.event)                       //IE
                event.returnValue = false;                 //e.returnValue = false;效果相同.
            else                                    //Firefox
                event.preventDefault();
        }
    }
    else {
        if ((currentKey >= 48 && currentKey <= 57) || currentKey == 8)
            event.returnValue = true;
        else {
            if (window.event)                       //IE
                event.returnValue = false;                 //e.returnValue = false;效果相同.
            else                                    //Firefox
                event.preventDefault();
        }
    }
}
/**************************************************
//函数名称：LimitFloat2 guss 20120410
//参数说明：输入参数1. sender 控件
//功能描述：可以输入两位位小数的正数
//调用：onchange，onchange="LimitFloat2(this)""
**************************************************/
function LimitFloat2(sender) {
    var partn = /^\d+(\.\d+)?$/; //可以输入2位小数的正数
    if (!partn.exec(sender.value)) {
        sender.value = parseFloat(0.00);
    }
    else {
        if (parseInt(sender.value) < 0) {
            sender.value = parseFloat(0.00);
        }
        else {
            sender.value = parseFloat(sender.value).toFixed(2);
        }
    }
}
/**************************************************
//函数名称：LimitFloat4 guss 20120410
//参数说明：输入参数1. sender 控件
//功能描述：可以输入4位小数的正数
//调用：onchange，onchange="LimitFloat4(this)""
**************************************************/
function LimitFloat4(sender) {
    var partn = /^\d+(\.\d+)?$/; //可以输入4位小数的正数
    if (!partn.exec(sender.value)) {
        sender.value = parseFloat(0.0000);
    }
    else {
        if (parseInt(sender.value) < 0) {
            sender.value = parseFloat(0.0000);
        }
        else {
            sender.value = parseFloat(sender.value).toFixed(4);
        }
    }
}
/**************************************************
//函数名称：LimitFloat6 guss 20120410
//参数说明：输入参数1. sender 控件
//功能描述：可以输入6位小数的正数
//调用：onchange，onchange="LimitFloat6(this)""
**************************************************/
function LimitFloat6(sender) {
    var partn = /^\d+(\.\d+)?$/; //可以输入六位小数的正数
    if (!partn.exec(sender.value)) {
        sender.value = parseFloat(0.000000);
    }
    else {
        if (parseInt(sender.value) < 0) {
            sender.value = parseFloat(0.000000);
        }
        else {
            sender.value = parseFloat(sender.value).toFixed(6);
        }
    }
}


function Limitednumbers(sender) {
    var partn = /^\d+(\.\d+)?$/; //一个带最多二位小数的正数
    if (!partn.exec(sender.value)) {
        sender.value = parseFloat(0).toFixed(2);
    }
    else {
        if (parseInt(sender.value) < 0) {
            sender.value = parseFloat(0).toFixed(2);
        }
        else {
            sender.value = parseFloat(sender.value).toFixed(2);
        }
    }
}

function Limitednumbers1(sender) {
    var partn = /^\d+(\.\d+)?$/; //一个带最多一位小数的正数
    if (!partn.exec(sender.value)) {
        sender.value = "0";
    }
    else {
        if (parseInt(sender.value) < 0) {
            sender.value = "0";
        }
        else {
            if (sender.value.indexOf(".") != -1) {
                sender.value = parseFloat(sender.value).toFixed(1);
            } else {
                sender.value = parseInt(sender.value);
            }
        }
    }
}

/**************************************************
//函数名称：GetURLInfo
//参数说明：无
//功能描述：获取URL参数,返回一个二维数组。
**************************************************/
function GetURLInfo() {
    var strURLPrarams = window.location.search.substring(1, window.location.search.length);
    var tempArray = strURLPrarams.split('&');
    var ArrayURLPrarams = new Array();
    for (var i = 0; i < tempArray.length; i++) {
        ArrayURLPrarams[i] = tempArray[i].split('=');
    }
    return ArrayURLPrarams;
}

/**************************************************
//函数名称：GetURLPrarams
//参数说明：PraramsName       参数名
//功能描述：根据URL参数名获取参数值。
**************************************************/
function GetURLPrarams(PraramsName) {
    var Prarams = null;
    var ArrayURLPrarams = GetURLInfo();
    for (var i = 0; i < ArrayURLPrarams.length; i++) {
        if (ArrayURLPrarams[i][0] == PraramsName) {
            Prarams = ArrayURLPrarams[i][1];
            break;
        }
    }
    return Prarams;
}

//四舍五入
function FloatRound(number, pointLength) {
    try {
        if (isNaN(number))
            return 0;

        var baseNumber = Math.pow(10, pointLength);

        return Math.round(number * baseNumber) / baseNumber;
    }
    catch (e) {
        alert(number + " 四舍五入出错");
        return number;
    }
}

//公共选择器特例checkbox选中方法
var check_flag = null;
function allchecked_sel(all) {
    if (document.getElementById(all.id).checked == false) {
        var objs = document.getElementsByTagName("input");
        for (var i = 0; i < objs.length; i++) {
            if (objs[i].type == "checkbox") {
                objs[i].checked = false;

                var r = objs[i].id;
                var prefix = r.split('z')[0];
                var h_id = prefix + "Hidden1";
                if (prefix != "rep_personlist_ctl00_") {
                    document.getElementById("hidden2").value = Drop_sel(document.getElementById("hidden2").value, document.getElementById(h_id).value);
                }
            }
        }

    }
    else {
        var objs = document.getElementsByTagName("input");
        for (var i = 0; i < objs.length; i++) {
            if (objs[i].type == "checkbox") {
                objs[i].checked = true;

                var r = objs[i].id;
                var prefix = r.split('z')[0];
                var h_id = prefix + "Hidden1";
                if (prefix != "rep_personlist_ctl00_") {
                    document.getElementById("hidden2").value = Add_sel(document.getElementById("hidden2").value, document.getElementById(h_id).value);
                }
            }
        }

    }
    //直接把新的ID串，给父级页面
    window.parent.document.getElementById("hid_personid").value = document.getElementById("hidden2").value;
}

function AddID_sel(obj) {
    check_flag = null;
    var r = obj.id;
    var prefix = r.split('z')[0];
    var h_id = prefix + "Hidden1";
    if (document.getElementById(r).checked == true) {
        document.getElementById("hidden2").value = Add_sel(document.getElementById("hidden2").value, document.getElementById(h_id).value);
    }
    else {
        document.getElementById("hidden2").value = Drop_sel(document.getElementById("hidden2").value, document.getElementById(h_id).value);
    }
    check_flag = 'true';

    //直接把新的ID串，给父级页面
    window.parent.document.getElementById("hid_personid").value = document.getElementById("hidden2").value;
}

function Drop_sel(str, key) {
    var array = Array();
    array = str.split(',');
    var c = "";
    var k = 1;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == key) {

        }
        else {
            if (k == 1) {
                c = array[i];
            }
            else {
                c += "," + array[i];
            }
            k++;
        }
    }
    return c
}
function Add_sel(str, key) {
    var array = Array();
    array = str.split(',');
    var c = "";
    var k = 1;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == key) {
            k++;
        }
        else {
            if (i == 0) {
                c = array[i];
            }
            else {
                c += "," + array[i];
            }
        }
    }
    if (k == 1 && c == "") {
        c = key;
    }
    else if (k == 1 && c != "") {
        c += "," + key;
    }
    return c;
}

//公共选择器的公用方法
function GetPersonID(data) {
    var personid = new Array();
    personid = data.split('●')[0].split('★');
    return personid[0];
}

function GetPersonName(data) {
    var personname = new Array();
    personname = data.split('●')[0].split('★');
    return personname[1];
}

function GetDeptID(data) {
    var deptid = new Array();
    try {
        deptid = data.split('▲')[0].split('●')[1].split('★');
    }
    catch (e) {
        deptid = data.split('▲')[0].split('★');
    }
    return deptid[0];
}

function GetDeptName(data) {
    var deptname = new Array();
    try {
        deptname = data.split('▲')[0].split('●')[1].split('★');
    }
    catch (e) {
        deptname = data.split('▲')[0].split('★');
    }
    return deptname[1];
}

function GetRoleID(data) {
    var roleid = new Array();
    try {
        roleid = data.split('▲')[1].split('★');
    }
    catch (e) {
        roleid = data.split('★');
    }
    return roleid[0];
}

function GetRoleName(data) {
    var rolename = new Array();
    try {
        rolename = data.split('▲')[1].split('★');
    }
    catch (e) {
        rolename = data.split('★');
    }
    return rolename[1];
}

/**************************************************
//函数名称：Trim
//参数说明：去掉字符串首尾空格
//功能描述：去掉字符串首尾空格  guss 20120207
//调用：value.Trim()
**************************************************/
if (!String.prototype.trim) {
    String.prototype.trim = function () { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); }
}


//全选脚本
function checkAll() {
    //id 为chkAll的全选框
    if (jQuery("input[id='chkAll']:checkbox").attr("checked") == "checked") {
        //对于checkBox是.net服务器控件时可以这样做,jQuery(":checkbox").each(function(){});　　　　　　
        //name 为 chkOne 的复选框
        jQuery("input[name='chkSelf']:checkbox").each(function () {
            jQuery(this).attr("checked", true);
        });
    }
    else {
        //name 为 chkOne 的复选框
        jQuery("input[name='chkSelf']:checkbox").each(function () {
            jQuery(this).attr("checked", false);
        });
    }
}
//某个复选框不选中
function checkSelf(el) {
    if (!el.checked) {
        jQuery("input[id='chkAll']:checkbox").attr("checked", false);
    }
}
//获取选中的值的集合，用','分割
//name 为 chkSelf 的复选框
function getSelections() {
    var text = "";
    //对于checkBox是.net服务器控件时可以这样做,jQuery(":checkbox").each(function(){});　
    jQuery("input[name='chkSelf']:checkbox").each(function () {
        if (jQuery(this).attr("checked") == "checked") {
            text += jQuery(this).val() + ",";
        }
    });
    var tempText = text.substring(0, text.length - 1);
    return tempText;
}

/**************************************************
//函数名称：delete_record
//参数说明：输入参数1: hidId 是保存要删除的id的控件id;输入参数2:linbtnId为linkbutton的id
//功能描述：对列表里选择要删除的记录，再点击删除按钮操作。
//调用：delete_record('hidKeyId','linkDel')"
**************************************************/
function delete_record(hidId, linbtnId) {
    var text = getSelections();
    if (text == "") {
        jQuery.messager.alert('提示', "要删除信息，请至少选择其中一条。!", 'info');
        return;
    }
    msg = '确认此删除操作？';
    jQuery.messager.confirm("提示", msg, function (r) {
        if (r) {
            if (hidId == "" || typeof (hidId) == "undefined")
                hidId = "hidkeyIds"; //设置默认值
            if (linbtnId == "" || typeof (linbtnId) == "undefined")
                linbtnId = "linkDel"; //设置默认值
            $Y(hidId).value = text;
            $Y(linbtnId).click();
        }
    });
}

function LoadForeColorTable(ClickFunc) {
    var tColor = "";
    var tRowNum = 8;
    var tColorAry = new Array();
    tColorAry[0] = "#000000"; tColorAry[1] = "#993300"; tColorAry[2] = "#333300"; tColorAry[3] = "#003300";
    tColorAry[4] = "#003366"; tColorAry[5] = "#000080"; tColorAry[6] = "#333399"; tColorAry[7] = "#333333";

    tColorAry[8] = "#800000"; tColorAry[9] = "#FF6600"; tColorAry[10] = "#808000"; tColorAry[11] = "#008000";
    tColorAry[12] = "#008080"; tColorAry[13] = "#0000FF"; tColorAry[14] = "#666699"; tColorAry[15] = "#808080";

    tColorAry[16] = "#FF0000"; tColorAry[17] = "#FF9900"; tColorAry[18] = "#99CC00"; tColorAry[19] = "#339966";
    tColorAry[20] = "#33CCCC"; tColorAry[21] = "#3366FF"; tColorAry[22] = "#800080"; tColorAry[23] = "#999999";

    tColorAry[24] = "#FF00FF"; tColorAry[25] = "#FFCC00"; tColorAry[26] = "#FFFF00"; tColorAry[27] = "#00FF00";
    tColorAry[28] = "#00FFFF"; tColorAry[29] = "#00CCFF"; tColorAry[30] = "#993366"; tColorAry[31] = "#CCCCCC";

    tColorAry[32] = "#FF99CC"; tColorAry[33] = "#FFCC99"; tColorAry[34] = "#FFFF99"; tColorAry[35] = "#CCFFCC";
    tColorAry[36] = "#CCFFFF"; tColorAry[37] = "#99CCFF"; tColorAry[38] = "#CC99FF"; tColorAry[39] = "#FFFFFF";

    var tColorTableHTML = '<table cellpadding="0" cellspacing="0" class="ColorTable">';
    tColorTableHTML += '  <tr>';
    for (var ti = 0; ti < tColorAry.length; ti++) {
        tColorTableHTML += '    <td onmouseover="this.className=\'Selected\';" onmouseout="this.className=\'\';" onclick="' + ClickFunc + '(\'' + tColorAry[ti] + '\');"';
        if (tColor.toUpperCase() == tColorAry[ti])
            tColorTableHTML += ' class="Selected"';
        tColorTableHTML += '><div style="width:11px;height:11px;background-color:' + tColorAry[ti] + ';"></div></td>';
        if ((ti + 1) % tRowNum == 0 && ti + 1 != tColorAry.length) {
            tColorTableHTML += '  </tr>';
            tColorTableHTML += '  <tr>';
        };
    };
    tColorTableHTML += '  </tr>';
    tColorTableHTML += '</table>';

    return tColorTableHTML;
}