var document_title = null; //用于记忆标题，有新消息时，标题会被改变

jQuery(function () {
    //jQuery('#loading').remove();

    //导航标签
    jQuery('#bpage').tabs({
        fit: true,
        border: false,
        tools: '#tab-tools',
        onSelect: function (title) {
            document.title = title;
            document_title = title;
        }
    });

    //垂直菜单设置
    var $items = $('#sysIcon_panel>ul>li');
    $items.mouseover(function () {
        $items.removeClass('selected');
        $(this).addClass('selected');

        var index = $items.index($(this));
        $('#sysIcon_panel>div').hide().eq(index).show();
    }).eq(0).mouseover();

    //初始日期时间
    updatetime();
    setInterval(updatetime, 15000);
    var currdatetime = new Date();
    var currdate = currdatetime.getFullYear() + "年" + (currdatetime.getMonth() + 1) + "月" + currdatetime.getDate() + "日";
    document.getElementById('s_date').innerHTML = currdate + " 星期" + "日一二三四五六".charAt(new Date().getDay());
    document.getElementById('s_date').title = currdate;

    //组织面板和在线人员
    //initOrg();

    //微讯箱
    //initSmsbox();

    //事务提醒
    initNocbox();

    //新消息提醒
    timer_sms_mon = window.setTimeout(sms_mon, 3000);

    //在线人员监控
    online_mon();
    window.setTimeout(online_mon, monInterval.online * 1000);

    //加载大菜单
    $('.megamenu').megaMenuCompleteSet({
        menu_speed_show: 300, // Time (in milliseconds) to show a drop down
        menu_speed_hide: 200, // Time (in milliseconds) to hide a drop down
        menu_speed_delay: 200, // Time (in milliseconds) before showing a drop down
        menu_effect: 'hover_slide', // Drop down effect, choose between 'hover_fade', 'hover_slide', etc.
        menu_click_outside: 1, // Clicks outside the drop down close it (1 = true, 0 = false)
        menu_show_onload: 0 // Drop down to show on page load (type the number of the drop down, 0 for none)
    });

});

//自动更新显示时间
function updatetime() {
    document.getElementById('s_time').innerHTML = new Date().toTimeString().substr(0, 5);
}
//用户信息栏方法
function user_tool(t) {
    if (t == 1) {//注销
        var msg = "您好，" + loginUser.pname + "！\n" + logoutText + "\n\n确认要注销吗？";
        if (window.confirm(msg)) {
            location.href = '/Logout.aspx';
        }
    }
    if (t == 2) {//换肤

    }
    if (t == 3) {//控制面板
        openPage("控制面板", "/SYS/ControlPanel/PersonInfo.aspx");
    }
    if (t == 4) {//修改密码
        openPage("修改密码", "/SYS/ControlPanel/ModifyPED.aspx");
    }
    if (t == 5) {//操作手册
        window.open("/webhelp/index.htm");
    }
}
//设置用户登录状态
function set_loginstate(userid, loginstate) {
    var url = "/Module/Ajax.ashx?Type=SetLoginState&userid=" + userid + "&loginstate=" + loginstate + "&r=" + Math.floor(Math.random() * 1000);
    jQuery.post(url, function (result) {
        document.getElementById('user_loginstate_a').innerHTML = result;
        ClosePanel('user_loginstate_a');
    });
}

//在线人员监控
function online_mon() {
    jQuery.ajax({
        type: 'GET',
        url: '/Module/Ajax.ashx?Type=GetOnlineCount&r=' + Math.floor(Math.random() * 1000),
        success: function (data) {
            var count = isNaN(parseInt(data)) ? "1" : parseInt(data);
            jQuery('#user_count').innerHTML = count;
        }
    });
    window.setTimeout(online_mon, monInterval.online * 1000);
}

//查看在线人员
function ViewOnlineUser() {
    return;
    //暂未实现
    var pannelActive = jQuery('#org').className.indexOf('active') >= 0;
    var onlineActive = jQuery('#user_online_tab').className.indexOf('active') >= 0;
    if (pannelActive) {
        if (onlineActive)
            jQuery('#org').click();
        else
            ActiveUserTab(jQuery('#user_online_tab'));
    }
    else {
        jQuery('#org').click();
        ActiveUserTab(jQuery('#user_online_tab'));
    }
}

function Show_EIP_Page() {
    jQuery('#bpage').tabs('select', 0);
}

function shortcut_over(sender, img) {
    sender.css({ "background-image": "url(/theme/default/images/index/" + img + ".png)" });
}

function shortcut_out(sender, img) {
    sender.css({ "background-image": "url(/theme/default/images/index/" + img + ".png)" });
}


//打开系统选择面板
function ShowSysIconPanel(id) {
//    if (jQuery('#' + id + '_panel:visible').length) {
//        CloseSysIconPanel(id);
//        return;
//    }
    var top = jQuery('.' + id).outerHeight() / 2 + jQuery('.' + id).offset().top - jQuery("#" + id + "_panel").outerHeight() - 1;
    var lw = jQuery('.' + id).offset().left - 1;
    jQuery("#" + id + "_panel").css({
        top: top,
        left: lw,
        display: "block"
    });
    //控制光标离开DIV时自动关闭。
    jQuery("#" + id + "_panel").bind("mouseleave", function () {
        CloseSysIconPanel(id);
    });
    return false;
}
//关闭系统选择面板
function CloseSysIconPanel(id) {
    jQuery("#" + id + "_panel").css("display", "none");
}

/**************************************************
//函数名称：Trim
//参数说明：去掉字符串首尾空格
//功能描述：去掉字符串首尾空格  guss 20120207
//调用：value.Trim()
**************************************************/
String.prototype.Trim = function () {
    var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}

//搜索功能
function doSearch(value, name) {
    value = value.Trim();
    if (value == '') {
        alert('请输入查询条件');  
        return;
    }
    var pname = '搜索: ' + value + '(' + name + ')';
    var url = '';
    if (name == '通讯录')
        url = '/MyWork/Book/PersonList.aspx?qt=' + escape(value);
    if (name == '邮件')
        url = '/MyWork/NewMail/Index.aspx?qt=' + escape(value);
    if (name == '通知公告')
        url = '/MyWork/Info/List.aspx?type=0100000009&qt=' + escape(value);
    if (name == '新闻')
        url = '/MyWork/Info/List.aspx?type=0100000010?qt=' + escape(value);
    if (name == '文档中心')
        url = '/Knowledge/FileManage/MyDefault.aspx?FolderID=2&qt=' + escape(value);
    openPage(pname, url);
}