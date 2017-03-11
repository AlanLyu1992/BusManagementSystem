var userAgent = navigator.userAgent.toLowerCase();
var isSafari = userAgent.indexOf("Safari") >= 0;
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);

var $Y = function (id) { return document.getElementById(id); };

//行原先的样式
var RowAutoClassName = null;
var ActiveRow = null;
var ActiveRowAutoClassName = null;

//选中行换色
function RowClick(obj) {
    if (ActiveRow != null)
        ActiveRow.className = ActiveRowAutoClassName;
    obj.className = "TableRowActive";
    ActiveRow = obj;
    ActiveRowAutoClassName = RowAutoClassName
}
function RowOver(obj) {
    if (ActiveRow != obj) {
        RowAutoClassName = obj.className;
        obj.className = "TableRowHover";
    }
}
function RowOut(obj) {
    if (ActiveRow != obj)
        obj.className = RowAutoClassName;
}

//打开新选项卡，框架首页使用
function openPage(title, url) {
    if (jQuery('#bpage').tabs('exists', title)) {
        jQuery('#bpage').tabs('select', title);
    } else {
        jQuery('#bpage').tabs('add', {
            title: title,
            //使用content时，文本编辑器不支持动态iframe，会包脚本错误，改用异步href。
            //content: '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>',
            href: 'UrlHandler.ashx?url=' + escape(url),
            closable: true
        });
    }

    var tabs = jQuery('#bpage').tabs("tabs");
    var len = tabs.length;
    if (len > 7)
        $("#closeall").css("display", "");
}
//关闭选项卡，框架首页使用
function closePage() {
    var tab = jQuery('#bpage').tabs('getSelected');
    var index = jQuery('#bpage').tabs('getTabIndex', tab);
    jQuery('#bpage').tabs('close', index);
}

//关闭所有选项卡
function closeAllPage() {
    var tabs = jQuery('#bpage').tabs("tabs");
    for (var i = tabs.length - 1; i > 0; i--)
        jQuery('#bpage').tabs('close', i);
}

//修改选项卡名称，框架首页使用
function updatePage(newtitle) {
    var tab = $('#bpage').tabs('getSelected');
    $('#bpage').tabs('update', {
        tab: tab,
        options: {
            title: newtitle
        }
    });
}

//打开查询条件控件面板
function ShowSearchPanel(id) {
    if (jQuery('#' + id + '_panel:visible').length) {
        CloseSearchPanel(id);
        return;
    }
    var top = jQuery('.' + id + "_bar").outerHeight() + jQuery('.' + id + "_bar").offset().top + 1;
    var rw = jQuery(window).width() - jQuery('.' + id + "_bar").offset().left - jQuery('.' + id + "_bar").outerWidth();
    jQuery("#" + id + "_panel").css({
        top: top,
        right: rw,
        display: "block"
    });
    //控制光标离开查询条件DIV时自动关闭。
    //    jQuery("#" + id + "_panel").bind("mouseleave", function () {
    //        CloseSearchPanel(id);
    //    });
    return false;
}
//关闭查询条件控件面板
function CloseSearchPanel(id) {
    jQuery("#" + id + "_panel").css("display", "none");
    jQuery("#hdnAutoShow").val("0")
}
//清空查询条件
function ClearSearchPanel() {
    jQuery('.SearchInput').each(function () {
        jQuery(this).val("");
    });
}

//打开面板
function ShowPanel(id) {
    if (jQuery('#' + id + '_panel:visible').length) {
        CloseSearchPanel(id);
        return;
    }
    var top = jQuery('#' + id).outerHeight() + jQuery('#' + id).offset().top + 1;
    var rw = jQuery(window).width() - jQuery('#' + id).offset().left - jQuery('#' + id).outerWidth();
    jQuery("#" + id + "_panel").css({
        top: top,
        right: rw,
        display: "block"
    });
    //控制光标离开查询条件DIV时自动关闭。
    jQuery("#" + id + "_panel").bind("mouseleave", function () {
        ClosePanel(id);
    });
    return false;
}
//关闭面板
function ClosePanel(id) {
    jQuery("#" + id + "_panel").css("display", "none");
}

//打开easyui loading效果
function ajaxLoading() {
    $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");
    $("<div class=\"datagrid-mask-msg\"></div>").html("<span style='font-size:9pt;'>正在处理，请稍候...</span>").appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
}
//关闭easyui loading效果
function ajaxLoadEnd() {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
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

//弹出窗口
function LoadDialogWindow(URL, parent, loc_x, loc_y, width, height) {
    if (is_ie)//window.open(URL);
        window.showModalDialog(URL, parent, "edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:" + width + "px;dialogHeight:" + height + "px;dialogTop:" + loc_y + "px;dialogLeft:" + loc_x + "px", true);
    else
        window.open(URL, parent, "height=" + height + ",width=" + width + ",status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,top=" + loc_y + ",left=" + loc_x + ",resizable=yes,modal=yes,dependent=yes,dialog=yes,minimizable=no", true);
}

//清空人员
function ClearUser(TO_ID, TO_NAME) {
    if (TO_ID == "" || TO_ID == "undefined" || TO_ID == null) {
        TO_ID = "TO_ID";
        TO_NAME = "TO_NAME";
    }
    document.getElementById(TO_ID).value = "";
    document.getElementById(TO_NAME).value = "";
}

//选择通讯录
function SelectAddr(FIELD, TO_ID) {
    var URL = "/Public/AddressBook/Selector.aspx?flag=" + FIELD + "&toid=" + TO_ID;
    loc_y = loc_x = 200;
    if (is_ie) {
        loc_x = document.body.scrollLeft + event.clientX - event.offsetX - 100;
        loc_y = document.body.scrollTop + event.clientY - event.offsetY + 170;
    }
    LoadDialogWindow(URL, self, loc_x, loc_y, 400, 350);
}
function ClearAddr(TO_ID) {
    if (TO_ID == "" || TO_ID == "undefined" || TO_ID == null)
        return;
    document.getElementsByName(TO_ID)[0].value = "";
}
function clickMenu(id) {
    var el = document.getElementById("module_" + id);
    var link = document.getElementById("link_" + id);
    if (!el || !link) return;
    if (el.style.display == "none") {
        el.style.display = '';
        link.className = "active";
    }
    else {
        el.style.display = "none";
        link.className = "";
    }
}

//人员多选
function SelectUser(id, name, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var dept_id = document.getElementById(id).value;
    var dept_name = document.getElementById(name).value;
    if (dept_id != "") {
        dept_id = dept_id.replace(/,+$/, "") + ",";
        dept_name = dept_name.replace(/,+$/, "") + ",";
    }
    $.dialog.open('/Public/user_list/select_user.aspx?UserID=' + dept_id + '&UserName=' + dept_name, {
        title: '选择人员',
        width: "800px",
        height: "340px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象

            iframe.document.getElementById("hidids").value = dept_id;
            iframe.document.getElementById("hidnames").value = dept_name;
            setTimeout(function () {
                iframe.document.getElementById("hidids").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidnames').value;
            var strid = iframe.document.getElementById('hidids').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选人后是否需要回调
            if (iscallback == true)
                SelectUserCallBack();
        },
        cancel: true
    });

}


//人员多选-支持筛选部门
function SelectUserdeptids(id, name, deptcode, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var user_id = document.getElementById(id).value;
    var user_name = document.getElementById(name).value;
    var dept_code = document.getElementById(deptcode).value;
    if (user_id != "") {
        user_id = user_id.replace(/,+$/, "") + ",";
        user_name = user_name.replace(/,+$/, "") + ",";
    }
    $.dialog.open('/Public/user_list/select_user.aspx?UserID=' + user_id + '&UserName=' + user_name + '&DeptCode=' + dept_code, {
        title: '选择人员',
        width: "800px",
        height: "340px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象

            iframe.document.getElementById("hidids").value = user_id;
            iframe.document.getElementById("hidnames").value = user_name;
            setTimeout(function () {
                iframe.document.getElementById("hidids").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidnames').value;
            var strid = iframe.document.getElementById('hidids').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选人后是否需要回调
            if (iscallback == true)
                SelectUserdeptidsCallBack();
        },
        cancel: true
    });

}
//人员单选
function SelectUserSingle(id, name, iscallback) {

    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var dept_id = document.getElementById(id).value;
    var dept_name = document.getElementById(name).value;
    $.dialog.open('/Public/user_list/select_userSingle.aspx?UserID=' + dept_id + '&UserName=' + dept_name, {
        title: '选择人员',
        width: "700px",
        height: "340px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象

            iframe.document.getElementById("hidid").value = dept_id;
            iframe.document.getElementById("hidname").value = dept_name;
            setTimeout(function () {
                iframe.document.getElementById("hidid").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidname').value;
            var strid = iframe.document.getElementById('hidid').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选人后是否需要回调
            if (iscallback == true)
                SelectUserSingleCallBack(id);
        },
        cancel: true
    });
}
//人员单选-支持筛选部门
function SelectUserSingledeptids(id, name, deptcode, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var user_id = document.getElementById(id).value;
    var user_name = document.getElementById(name).value;
    var dept_code = document.getElementById(deptcode).value;
    $.dialog.open('/Public/user_list/select_userSingle.aspx?UserID=' + user_id + '&UserName=' + user_name + '&DeptCode=' + dept_code, {
        title: '选择人员',
        width: "700px",
        height: "340px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象

            iframe.document.getElementById("hidid").value = user_id;
            iframe.document.getElementById("hidname").value = user_name;
            setTimeout(function () {
                iframe.document.getElementById("hidid").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidname').value;
            var strid = iframe.document.getElementById('hidid').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选人后是否需要回调
            if (iscallback == true)
                SelectUserSingledeptidsCallBack();
        },
        cancel: true
    });
}
//部门多选
function SelectDept(id, name, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var dept_id = document.getElementById(id).value;
    var dept_name = document.getElementById(name).value;
    $.dialog.open('/Public/dept_list/select_dept.aspx?KID=' + id + '&KName=' + name + '&ID=' + dept_id + '&Name=' + dept_name, {
        title: '选择部门',
        width: "300px",
        height: "300px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var dept_id = document.getElementById(id).value;
            var dept_name = document.getElementById(name).value;
            if (dept_id != "") {
                dept_id = dept_id.replace(/,+$/, "") + ",";
                dept_name = dept_name.replace(/,+$/, "") + ",";
            }
            if (dept_id.indexOf("ALL_DEPT") < 0) {
                iframe.document.getElementById("hidids").value = dept_id;
                iframe.document.getElementById("hidnames").value = dept_name;
            }
            setTimeout(function () {
                iframe.document.getElementById("hidids").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidnames').value;
            var strid = iframe.document.getElementById('hidids').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");

            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选部门后是否需要回调
            if (iscallback == true)
                SelectDeptCallBack();

        },
        cancel: true
    });
}

//部门单选
function SelectDeptSingle(id, name, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    $.dialog.open('/Public/dept_list/select_deptSingle.aspx', {
        title: '选择部门',
        width: "300px",
        height: "300px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var dept_id = document.getElementById(id).value;
            var dept_name = document.getElementById(name).value;
            iframe.document.getElementById("hidid").value = dept_id;
            iframe.document.getElementById("hidname").value = dept_name;
            setTimeout(function () {
                iframe.document.getElementById("hidid").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidname').value;
            var strid = iframe.document.getElementById('hidid').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选部门后是否需要回调
            if (iscallback == true)
                SelectDeptSingleCallBack();
        },
        cancel: true
    });
}
//部门多选-支持筛选部门
function SelectDeptdeptids(id, name, deptcode, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var dept_id = document.getElementById(id).value;
    var dept_name = document.getElementById(name).value;
    var dept_code = document.getElementById(deptcode).value;
    $.dialog.open('/Public/dept_list/select_dept.aspx?KID=' + id + '&KName=' + name + '&ID=' + dept_id + '&Name=' + dept_name + '&DeptCode=' + dept_code, {
        title: '选择部门',
        width: "300px",
        height: "300px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var dept_id = document.getElementById(id).value;
            var dept_name = document.getElementById(name).value;
            if (dept_id != "") {
                dept_id = dept_id.replace(/,+$/, "") + ",";
                dept_name = dept_name.replace(/,+$/, "") + ",";
            }
            if (dept_id.indexOf("ALL_DEPT") < 0) {
                iframe.document.getElementById("hidids").value = dept_id;
                iframe.document.getElementById("hidnames").value = dept_name;
            }
            setTimeout(function () {
                iframe.document.getElementById("hidids").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidnames').value;
            var strid = iframe.document.getElementById('hidids').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");

            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选部门后是否需要回调
            if (iscallback == true)
                SelectDeptCallBack();

        },
        cancel: true
    });
}
//部门单选-支持筛选部门
function SelectDeptSingledeptids(id, name, deptcode, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var dept_code = document.getElementById(deptcode).value;
    $.dialog.open('/Public/dept_list/select_deptSingle.aspx?DeptCode=' + dept_code, {
        title: '选择部门',
        width: "300px",
        height: "300px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var dept_id = document.getElementById(id).value;
            var dept_name = document.getElementById(name).value;
            iframe.document.getElementById("hidid").value = dept_id;
            iframe.document.getElementById("hidname").value = dept_name;
            setTimeout(function () {
                iframe.document.getElementById("hidid").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidname').value;
            var strid = iframe.document.getElementById('hidid').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选部门后是否需要回调
            if (iscallback == true)
                SelectDeptSingleCallBack();
        },
        cancel: true
    });
}

//职位多选
function SelectPrivMore(id, name, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    $.dialog.open('/Public/role_list/role_list.aspx', {
        title: '选择职位',
        width: "300px",
        height: "300px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var dept_id = document.getElementById(id).value;
            var dept_name = document.getElementById(name).value;
            if (dept_id != "") {
                dept_id = dept_id.replace(/,+$/, "") + ",";
                dept_name = dept_name.replace(/,+$/, "") + ",";
            }
            iframe.document.getElementById("hidids").value = dept_id;
            iframe.document.getElementById("hidnames").value = dept_name;
            setTimeout(function () {
                iframe.document.getElementById("hidids").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidnames').value;
            var strid = iframe.document.getElementById('hidids').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选职位后是否需要回调
            if (iscallback == true)
                SelectPrivMoreCallBack();
        },
        cancel: true
    });
}

//职位单选
function SelectPriv(id, name, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    $.dialog.open('/Public/role_list/role_listSingle.aspx', {
        title: '选择职位',
        width: "300px",
        height: "300px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var dept_id = document.getElementById(id).value;
            var dept_name = document.getElementById(name).value;
            iframe.document.getElementById("hidid").value = dept_id;
            iframe.document.getElementById("hidname").value = dept_name;
            setTimeout(function () {
                iframe.document.getElementById("hidid").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidname').value;
            var strid = iframe.document.getElementById('hidid').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选职位后是否需要回调
            if (iscallback == true)
                SelectPrivCallBack();
        },
        cancel: true
    });
}

//人员多选——人力资源专用
function SelectEmployee(id, name, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var dept_id = document.getElementById(id).value;
    var dept_name = document.getElementById(name).value;
    if (dept_id != "") {
        dept_id = dept_id.replace(/,+$/, "") + ",";
        dept_name = dept_name.replace(/,+$/, "") + ",";
    }
    $.dialog.open('/Public/employee_list/employee_list.aspx?UserID=' + dept_id + '&UserName=' + dept_name, {
        title: '选择人员',
        width: "800px",
        height: "340px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象

            iframe.document.getElementById("hidids").value = dept_id;
            iframe.document.getElementById("hidnames").value = dept_name;
            setTimeout(function () {
                iframe.document.getElementById("hidids").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidnames').value;
            var strid = iframe.document.getElementById('hidids').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选人后是否需要回调
            if (iscallback == true)
                SelectEmployeeCallBack();

        },
        cancel: true
    });
}

//人员多选支持部门筛选——人力资源专用
function SelectEmployeedeptids(id, name, deptcode, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var dept_id = document.getElementById(id).value;
    var dept_name = document.getElementById(name).value;
    var dept_code = document.getElementById(deptcode).value;
    if (dept_id != "") {
        dept_id = dept_id.replace(/,+$/, "") + ",";
        dept_name = dept_name.replace(/,+$/, "") + ",";
    }
    $.dialog.open('/Public/employee_list/employee_list.aspx?UserID=' + dept_id + '&UserName=' + dept_name + '&DeptCode=' + dept_code, {
        title: '选择人员',
        width: "800px",
        height: "340px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象

            iframe.document.getElementById("hidids").value = dept_id;
            iframe.document.getElementById("hidnames").value = dept_name;
            setTimeout(function () {
                iframe.document.getElementById("hidids").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidnames').value;
            var strid = iframe.document.getElementById('hidids').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选人后是否需要回调
            if (iscallback == true)
                SelectEmployeeCallBack();

        },
        cancel: true
    });
}

//人员单选——人力资源专用
function SelectEmployeeSingle(id, name, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var dept_id = document.getElementById(id).value;
    var dept_name = document.getElementById(name).value;
    $.dialog.open('/Public/employee_list/employee_listSingle.aspx?UserID=' + dept_id + '&UserName=' + dept_name, {
        title: '选择人员',
        width: "700px",
        height: "340px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var dept_id = document.getElementById(id).value;
            var dept_name = document.getElementById(name).value;
            iframe.document.getElementById("hidid").value = dept_id;
            iframe.document.getElementById("hidname").value = dept_name;
            setTimeout(function () {
                iframe.document.getElementById("hidid").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidname').value;
            var strid = iframe.document.getElementById('hidid').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选人后是否需要回调
            if (iscallback == true)
                SelectEmployeeSingleCallBack();
        },
        cancel: true
    });
}

//人员单选部门筛选——人力资源专用
function SelectEmployeeSingledeptids(id, name, deptcode, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    var dept_id = document.getElementById(id).value;
    var dept_name = document.getElementById(name).value;
    var dept_code = document.getElementById(deptcode).value;

    $.dialog.open('/Public/employee_list/employee_listSingle.aspx?UserID=' + dept_id + '&UserName=' + dept_name + '&DeptCode=' + dept_code, {
        title: '选择人员',
        width: "700px",
        height: "340px",
        lock: true,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var dept_id = document.getElementById(id).value;
            var dept_name = document.getElementById(name).value;
            iframe.document.getElementById("hidid").value = dept_id;
            iframe.document.getElementById("hidname").value = dept_name;
            setTimeout(function () {
                iframe.document.getElementById("hidid").select();
            }, 80);
        },
        ok: function () {
            var iframe = this.iframe.contentWindow;
            if (!iframe.document.body) {
                alert('iframe还没加载完毕呢')
                return false;
            };

            var strname = iframe.document.getElementById('hidname').value;
            var strid = iframe.document.getElementById('hidid').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            //成功选人后是否需要回调
            if (iscallback == true)
                SelectEmployeeSingleCallBack();
        },
        cancel: true
    });
}

//人员详情
function ViewPersonInfo1(personid) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    $.dialog.open('/SYS/OrgQuery/PersonInfo/Info.aspx?PersonID=' + personid, {
        title: '人员详情',
        width: "950px",
        height: "705px",
        padding: 0,
        cancelVal: "关闭",
        cancel: true

    });
}
function ViewPersonInfo(personid) {
    var name = "";
    jQuery.ajax({
        type: "GET",
        dataType: "text",
        url: "/SYS/OrgQuery/PersonInfo/Ajax.ashx",
        data: { personid: personid, Flag: "getperson" },
        async: false,
        success: function (s) {
            if (s != "") {
                name = s;
            }
        }
    });
    var URL = "/SYS/OrgQuery/PersonInfo/Info.aspx?f=0&PersonID=" + personid;
    top.openPage("人员详情_" + name, URL);
}
//辅助资料维护 带回传
function handleEntryData(entryCode, ddlID) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    $.dialog.open('/SYS/Entry/selectList.aspx?EntryCode=' + entryCode, {
        title: '辅助资料',
        width: "750px",
        height: "300px",
        padding: 0,
        cancelVal: "关闭",
        cancel: true,
        ok: function () {
            var f = false;
            var s = "";
            for (var i = 0; i < $("#" + ddlID)[0].length; i++) {
                s += $("#" + ddlID)[0][i].value + ",";
            }
            var codedata = "Flag=4&EntryCode=" + entryCode + "&r=" + Math.floor(Math.random() * 1000);
            jQuery.ajax({
                type: "GET",
                url: "/SYS/Entry/HandleAjax.ashx",
                data: codedata,
                dataType: 'text',
                async: false,
                success: function (msg) {
                    var arry = msg.split('★');
                    for (var i = 0; i < arry.length; i++) {

                        var sarry = arry[i].split('|');
                        if (s.indexOf(sarry[0]) < 0) {
                            var html = "<option value=\"" + sarry[0] + "\">" + sarry[1] + "</option>";
                        }
                        $(html).appendTo("#" + ddlID);
                    }
                    f = true;
                }
            });
            return f;
        }

    });
}
//辅助资料维护
function handleEntryData(entryCode) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    $.dialog.open('/SYS/Entry/selectList.aspx?EntryCode=' + entryCode, {
        title: '辅助资料',
        width: "750px",
        height: "300px",
        padding: 0,
        cancelVal: "关闭",
        cancel: true,
        ok: false
    });
}


function handleEntryDataCallback(entryCode, ddlID, IsBindID) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    $.dialog.open('/SYS/Entry/selectList.aspx?EntryCode=' + entryCode, {
        title: '辅助资料',
        width: "750px",
        height: "300px",
        padding: 0,
        cancelVal: "关闭",
        cancel: true,
        ok: function () {
            var f = false;
            var selectId = $("#" + ddlID).val();
            var bindID = IsBindID ? "&IsBindID=1" : "&IsBindID=0";
            var codedata = "Flag=4&EntryCode=" + entryCode + "&r=" + Math.floor(Math.random() * 1000) + bindID;
            jQuery.ajax({
                type: "GET",
                url: "/SYS/Entry/HandleAjax.ashx",
                data: codedata,
                dataType: 'text',
                async: false,
                success: function (msg) {
                    var arry = msg.split('★');
                    $("#" + ddlID).empty();
                    for (var i = 0; i < arry.length; i++) {
                        var sarry = arry[i].split('|');
                        var html = "<option value=\"" + sarry[0] + "\">" + sarry[1] + "</option>";
                        $(html).appendTo("#" + ddlID);
                    }
                    $("#" + ddlID).val(selectId);
                    f = true;
                }
            });
            return f;
        }

    });
}