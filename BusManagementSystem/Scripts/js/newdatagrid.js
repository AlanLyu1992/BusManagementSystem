$.extend({ replaceAll: function (str, s2, replacement) {
    return str.replace(new RegExp(s2, "gm"), replacement);
}
});
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
//issingleSelect:是否允许多选
//datadivname:datagrid上面的父级div名称
//isfilled:datagrid 是否充满这个页面
//linebackground:背景色 例子"rowData.ROLE_CODE =='R-01'$'background-color:#C2D69B'☆" $之前是条件,之后是返回的背景色,各种情况之间用☆分隔
$.extend({ loaddata: function (options) {
    var opts = { tablename: "tt", dataurl: "DataJosn.ashx", Params: { sortName: "", sortOrder: "" }, FrozenColumns: [[]], isFitColumns: true, isPagination: true, isshowFooter: false, Columns: [[]], Number: 1, Size: 50, issingleSelect: false, datadivname: "dataMain", isfilled: true, pageList: [50, 100, 200, 500, 1000], beforePageText: '第', afterPageText: '页    共 {pages} 页', displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录', linebackground: "" };
    $.extend(opts, options);
    $('#' + opts.tablename).datagrid({
        striped: true, //即奇偶行使用不同背景色
        url: opts.dataurl, //数据来源
        fit: true,
        striped: true, //即奇偶行使用不同背景色               
        remoteSort: true,
        fitColumns: opts.isFitColumns,
        queryParams: opts.Params, //自定义参数：SortName是排序的字段名,SortOrder是排序的顺序
        frozenColumns: opts.FrozenColumns,
        columns: opts.Columns,
        pageNumber: opts.Number,
        rownumbers: true, //显示行号
        pagination: opts.isPagination, //显示分页栏
        pageNumber: opts.pageNumber,
        pageSize: opts.pageSize,
        pageList: opts.pageList,
        singleSelect: opts.issingleSelect, //只允许选中一行  
        showFooter: opts.isshowFooter,
        onSortColumn: function (sort, order) {
            var params = $('#' + opts.tablename).datagrid('options').queryParams;
            params.sortName = sort;
            params.sortOrder = order;
            $('#' + opts.tablename).datagrid('reload');
        },
        rowStyler: function (value, rowData, rowIndex) {
            if (opts.linebackground != "") {
                var arry = opts.linebackground.split('☆');
                for (var i = 0; i < arry.length - 1; i++) {
                    var arry1 = arry[i].split('$');
                    if (i == 0) {
                        if (eval(arry1[0])) {
                            return eval(arry1[1]);
                        }
                    }
                    else if (arry1[0]) {
                        return arry1[1];
                    }
                }
            }
        }


    });

    //自定义设置分页控件       
    var p = $('#' + opts.tablename).datagrid('getPager');
    $(p).pagination({
        beforePageText: opts.beforePageText, //页数文本框前显示的汉字           

        afterPageText: opts.afterPageText,

        displayMsg: opts.displayMsg

    });
    if (opts.datadivname != "" && opts.isfilled == true) {
        if ($("#" + opts.datadivname).length > 0) {
            var w = $("#" + opts.datadivname).css("width");
            var h = $("#" + opts.datadivname).css("height");
            w = w.substr(0, w.length - 2);
            h = h.substr(0, h.length - 2);
            $("#" + opts.tablename).datagrid('resize', { height: h - 35, width: w });
        }
    }

}
});


$.extend({ loadtreegrid: function (options) {
    var opts = { tablename: "tt", dataurl: "DataJosn.ashx", idField: "id", treeField: "name", collapsible: true, singleSelect: true, fitColumns: true, showFooter: true, columns: [[]], FrozenColumns: [[]], pagination: true, pageNumber: "1", pageSize: "50", pageList: [50, 100, 200, 500, 1000], datadivname: "dataMain", isfilled: true, beforePageText: '第', afterPageText: '页    共 {pages} 页', displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录' };
    $.extend(opts, options);
    $('#' + opts.tablename).treegrid({
        url: opts.dataurl,
        idField: opts.idField,
        treeField: opts.treeField,
        collapsible: opts.collapsible,
        singleSelect: opts.singleSelect,
        fitColumns: opts.fitColumns,
        showFooter: opts.showFooter,
        columns: opts.columns,
        frozenColumns: opts.FrozenColumns,
        pagination: opts.pagination, //显示分页栏
        pageNumber: opts.pageNumber,
        pageSize: opts.pageSize,
        pageList: opts.pageList,
        onBeforeLoad: function (row, param) {
            if (!row) { // load top level rows  
                param.id = 0;   // set id=0, indicate to load new page rows  
            }
        },
        onSortColumn: function (sort, order) {

        }
    });
    //自定义设置分页控件       
    var p = $('#' + opts.tablename).datagrid('getPager');
    $(p).pagination({
        beforePageText: opts.beforePageText, //页数文本框前显示的汉字           

        afterPageText: opts.afterPageText,

        displayMsg: opts.displayMsg

    });
    if (opts.datadivname != "" && opts.isfilled == true) {
        var w = $("#" + opts.datadivname).css("width");
        var h = $("#" + opts.datadivname).css("height");
        w = w.substr(0, w.length - 2);
        h = h.substr(0, h.length - 2);
        $("#" + opts.tablename).treegrid('resize', { height: h, width: w });
    }

}
});

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

    return dt.format("yyyy-MM-dd hh:mm:ss");  //这里用到一个javascript的Date类型的拓展方法，这个是自己添加的拓展方法，在后面的步骤3定义
}
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
$.extend({ replaceAll: function (str, s2, replacement) {
    return str.replace(new RegExp(s2, "gm"), replacement);
}
});

function fmoney(s, n) {
    if (s == "") {
        return "0.00";
    }
    else {
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
    }

}
$.extend($.fn.datagrid.methods, {
    editCell: function (jq, param) {
        return jq.each(function () {
            var opts = $(this).datagrid('options');
            var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor1 = col.editor;
                if (fields[i] != param.field) {
                    col.editor = null;
                }
            }
            $(this).datagrid('beginEdit', param.index);
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor = col.editor1;
            }
        });
    }
});