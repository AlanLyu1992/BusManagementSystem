//加载列表页面数据
//参数：
//   tablename：表名,
//   dataurl：获取数据页面
//   Params：自定义参数
//   isFitColumns:是否自动适应列宽
//   isPagination:是否需要分页
//   Columns:要显示的列及其属性、方法等
//   Number: 当前第几页
//   Size:每页显示多少条
function loaddata(tablename, dataurl, Params, isFitColumns, isPagination,FrozenColumns, Columns, Number, Size) {
    Number = parseInt(Number);
    Size = parseInt(Size);
    $('#' + tablename).datagrid({
        striped: true, //即奇偶行使用不同背景色
        url: dataurl, //数据来源
        fit: true,
        striped: true, //即奇偶行使用不同背景色               
        remoteSort: true,
        fitColumns: isFitColumns,
        queryParams: Params, //自定义参数：SortName是排序的字段名,SortOrder是排序的顺序
        frozenColumns: FrozenColumns,
        columns: Columns,
        pageNumber: Number,
        rownumbers: true, //显示行号
        pagination: isPagination, //显示分页栏
        pageSize: Size,
        singleSelect: false,
        collapsible: true,
        showFooter: true,
        onSortColumn: function (sort, order) {//排序
            var params = $('#' + tablename).datagrid('options').queryParams;
            params.sortName = sort;
            params.sortOrder = order;
            $('#' + tablename).datagrid('reload');
        }
    });
    //自定义设置分页控件       
    var p = $('#' + tablename).datagrid('getPager');
    $(p).pagination({
        pageSize: 50, //每页显示的记录条数，默认为15           

        pageList: [50, 100, 200, 500, 1000], //可以设置每页记录条数的列表              

        beforePageText: '第', //页数文本框前显示的汉字           

        afterPageText: '页    共 {pages} 页',

        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'

    });
}
//设置列表页面自定义宽度和高度
function SetMainStyle(divid, tablename) {//divid是table上一级的divid
    var w = $("#" + divid).css("width");
    var h = $("#" + divid).css("height");
    w = w.substr(0, w.length - 2);
    h = h.substr(0, h.length - 2);
    $("#" + tablename).datagrid('resize', { height: h - 35, width: w });
}
//删除某一行
function delete_record(id, hidid, linkid) {//第一个id是某一行的ID，hidid是储存前面一个id的隐藏控件id,linkid是触发删除这一事件的linkbottonid
    $("#" + hidid).val(id);
    msg = '确认此删除操作？';
    jQuery.messager.confirm("提示", msg, function (r) {
        if (r) {
            __doPostBack(linkid, "");
        }
    });
}
//删除全部
function delete_allrecord(tableid, hidid, linkid, keyid) {
    var ids = "";
    var rows = $('#' + tableid).datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        ids += rows[i][keyid] + ',';
    }
    if (ids == "") {
        jQuery.messager.alert("提示", "请至少选择一条数据", "info");
        return;
    }
    else {
        msg = '确认此删除操作？';
        jQuery.messager.confirm("提示", msg, function (r) {
            if (r) {
                $("#" + hidid).val(ids);
                __doPostBack(linkid, "");
            }
        });
    }
}
/*
用途：批量操作数据
参数说明：
tableid：表名
hidid：存放选中值的隐藏控件
linkid：触发postback的控件
keyid:主键字段名称
msg:提示信息
*/
function batch_operate(tableid, hidid, linkid, keyid, msg) {
    //默认值处理
    if (tableid == "" || typeof (tableid) == "undefined")
        hidid = "tt";
    if (hidid == "" || typeof (hidid) == "undefined")
        hidid = "hidkeyIds";
    if (linkid == "" || typeof (linkid) == "undefined")
        linkid = "LinkDel";
    if (keyid == "" || typeof (keyid) == "undefined")
        keyid = "ID";
    if (msg == "" || typeof (msg) == "undefined")
        msg = "确认此删除操作？";

    var ids = "";
    var rows = $('#' + tableid).datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        ids += rows[i][keyid] + ',';
    }
    if (ids == "") {
        jQuery.messager.alert("提示", "请至少选择一条数据", "info");
        return;
    }
    else {
        jQuery.messager.confirm("提示", msg, function (r) {
            if (r) {
                $("#" + hidid).val(ids);
                __doPostBack(linkid, "");
            }
        });
    }
}

function comboboxselect(colname, value) {
    var data = $("#" + colname).combobox('getData');
    var index = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].value == value) {
            index = i;
            break;
        }
    }
    if (data.length > 0)
        $("#" + colname).combobox('select', data[index].value);
}

function formatDatebox(value) {
    if (value == null || value == '') {
        return '';
    }
    value = value.replace(/-/ig, "/");
    var dt;
    if (value instanceof Date) {
        dt = value;
    }
    else {
        dt = new Date(value);
        if (isNaN(dt)) {
            value = value.replace(/\/Date\((-?\d+)\)\//, '$1'); //标红的这段是关键代码，将那个长字符串的日期值转换成正常的JS日期格式
            dt = new Date();
            dt.setTime(value);
        }
    }

    return dt.format("yyyy-MM-dd");  //这里用到一个javascript的Date类型的拓展方法，这个是自己添加的拓展方法，在后面的步骤3定义
}

function formatDateTimebox(value) {
    if (value == null || value == '') {
        return '';
    }
    var dt;
    if (value instanceof Date) {
        dt = value;
    }
    else {
        dt = new Date(value);
        if (isNaN(dt)) {
            value = value.replace(/\/Date\((-?\d+)\)\//, '$1'); //标红的这段是关键代码，将那个长字符串的日期值转换成正常的JS日期格式
            dt = new Date();
            dt.setTime(value);
        }
    }

    return dt.format("yyyy-MM-dd HH:mm:ss");  //这里用到一个javascript的Date类型的拓展方法，这个是自己添加的拓展方法，在后面的步骤3定义
}

$.extend(
    $.fn.datagrid.defaults.editors, {
        datebox: {
            init: function (container, options) {
                var input = $('<input type="text">').appendTo(container);
                input.datebox(options);
                return input;
            },
            destroy: function (target) {
                $(target).datebox('destroy');
            },
            getValue: function (target) {
                return $(target).datebox('getValue');
            },
            setValue: function (target, value) {
                $(target).datebox('setValue', formatDatebox(value));
            },
            resize: function (target, width) {
                $(target).datebox('resize', width);
            }
        }
    });

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(),    //day 
        "h+": this.getHours(),   //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter 
        "S": this.getMilliseconds() //millisecond 
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
function fmoney(s, n) {
    if (s >= 0) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse();
        r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
    else if (s < 0) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.replace("-", "").split(".")[0].split("").reverse();
        r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return "-" + t.split("").reverse().join("") + "." + r;
    }
    else {
        return "0.00";
    }
}
