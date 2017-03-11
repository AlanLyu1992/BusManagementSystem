var monInterval = { online: 300, sms: 30 };
var timer_sms_mon = null;
var timer_online_tree_ref = null;
var nocbox_close_timeout = 3;
var blinkTitleInterval = null;
var closeNocPanel = null;

var bSmsPriv = true;

//标题闪烁效果
function BlinkTitle() {
    document.title = document.title == "　　　　　　　　" ? "您有新的短消息！" : "　　　　　　　　";
}

function ResetTitle() {
    window.clearInterval(blinkTitleInterval);
    document.title = document_title;
}

//微讯
function initSmsbox() {
    //点击微讯箱弹出或收起对应面板
    jQuery('#smsbox').click(function () {
        if (jQuery(this).attr('class').indexOf('active') >= 0) {
            window.clearInterval(smsbox_close_countdown);
            window.clearTimeout(smsbox_close_timer);
            jQuery('#smsbox_panel').fadeOut((jQuery.browser.msie ? 1 : 300));
            jQuery(this).removeClass('active');
        }
        else {
            jQuery('#org_panel').hide();
            jQuery('#smsbox_panel').fadeIn((jQuery.browser.msie ? 1 : 600), function () { jQuery(this).css('top', jQuery('#south').offset().top - jQuery(this).height() + 3 + 'px'); });
            jQuery(this).addClass('active');
            window.setTimeout(checkActive, 300, this.id);

            if (bSmsPriv)
                LoadSms();
        }
    });

    //关闭按钮
    var closeBtn = jQuery('#smsbox_panel > .head > .head-center > .head-close');
    closeBtn.hover(
         function () { jQuery(this).addClass('head-close-active'); },
         function () { jQuery(this).removeClass('head-close-active'); }
      );
    closeBtn.click(function () {
        jQuery('#smsbox').triggerHandler('click');
    });

    if (!bSmsPriv)
        return;

    //无新微讯提示
    jQuery('#smsbox_tips').html(jQuery('#no_sms').html()).show();
    jQuery('#smsbox_tips').bind('_show', function () {
        window.clearInterval(smsbox_close_countdown);
        window.clearTimeout(smsbox_close_timer);

        smsbox_close_countdown = window.setInterval(function () {
            var seconds = parseInt(jQuery('#smsbox_close_countdown').text());
            if (seconds > 0) {
                jQuery('#smsbox_close_countdown').text(seconds - 1);
            }
            else {
                window.clearInterval(smsbox_close_countdown);
                jQuery('#smsbox_close_countdown').text(smsbox_close_timeout);
            }
        }, 1000);

        smsbox_close_timer = window.setTimeout(function () {
            if (jQuery('#smsbox_tips:visible').length > 0)
                jQuery('#smsbox').triggerHandler('click');
        }, smsbox_close_timeout * 1000);
    });

    //滚动按钮
    jQuery('#smsbox_scroll_up,#smsbox_scroll_down').hover(
         function () { jQuery(this).addClass('active'); },
         function () { jQuery(this).removeClass('active'); }
      );
    jQuery('#smsbox_scroll_up').click(function () {
        var listContainer = jQuery('#smsbox_list_container');
        var blockHeight = jQuery('div.list-block:first', listContainer).outerHeight();
        listContainer.animate({ scrollTop: listContainer.scrollTop() - blockHeight * 3 }, 300);
    });
    jQuery('#smsbox_scroll_down').click(function () {
        var listContainer = jQuery('#smsbox_list_container');
        var blockHeight = jQuery('div.list-block:first', listContainer).outerHeight();
        listContainer.animate({ scrollTop: listContainer.scrollTop() + blockHeight * 3 }, 300);
    });

    //列表鼠标滚轮事件
    jQuery("#smsbox_list_container").mousewheel(function () {
        //jQuery('#smsbox_list_container').scrollTop(jQuery('#smsbox_list_container').scrollTop() - this.D);
        jQuery('#smsbox_list_container').stop().animate({ 'scrollTop': (jQuery('#smsbox_list_container').scrollTop() - this.D) }, 300);
    });

    //列表内容变化
    jQuery('#smsbox_list_container').bind('_change', function () {
        jQuery('#smsbox_scroll_up,#smsbox_scroll_down').toggle(jQuery(this).outerHeight() < jQuery(this).prop('scrollHeight'));
        if (newSmsArray.length > 0) {
            jQuery('#smsbox_tips').hide();
            jQuery('#no_sms').hide()
            jQuery('#smsbox_list_container > div.list-block:first').trigger('click');
        }
        else {
            jQuery('#smsbox_tips').html(jQuery('#no_sms').html()).show(0, function () { jQuery(this).triggerHandler('_show'); });
        }
    });

    //列表hover效果
    var listBlocks = jQuery('#smsbox_list_container > div.list-block');
    listBlocks.live('mouseenter', function () { jQuery(this).addClass('list-block-hover'); });
    listBlocks.live('mouseleave', function () { jQuery(this).removeClass('list-block-hover'); });

    //列表click事件
    listBlocks.live('click', function () {
        if (jQuery(this).attr('class').indexOf('list-block-active') > 0) return;
        jQuery('#smsbox_list_container > div.list-block').removeClass('list-block-active');
        jQuery(this).addClass('list-block-active');
        jQuery('table', this).removeClass('unread');

        var id = jQuery(this).attr('group_id');
        var html = '';
        selectedRecvSmsIdStr = selectedSendSmsIdStr = '';
        for (var i = 0; i < newSmsArray.length; i++) {
            if (!((newSmsArray[i].from_id == id && newSmsArray[i].to_id == loginUser.uid) || (newSmsArray[i].from_id == loginUser.uid && newSmsArray[i].to_id == id)))
                continue;

            //接收的微讯
            if (newSmsArray[i].receive)
                selectedRecvSmsIdStr += newSmsArray[i].sms_id + ',';
            else
                selectedSendSmsIdStr += newSmsArray[i].sms_id + ',';

            newSmsArray[i].unread = 0;
            var name = newSmsArray[i].from_name;
            var time = newSmsArray[i].send_time.indexOf(' ') > 0 ? newSmsArray[i].send_time : newSmsArray[i].send_time;
            var from_type_name = newSmsArray[i].from_type_name;

            html += CreateMsgBlock({ "sms_id": newSmsArray[i].sms_id, "class": (newSmsArray[i].receive ? "from" : "to"), "user": newSmsArray[i].from_id, "type_id": newSmsArray[i].type_id, "from_type_name": from_type_name, "name": name, "time": time, "content": newSmsArray[i].content, "url": newSmsArray[i].url });
        }


        jQuery('#smsbox_msg_container').html(html);
        window.setTimeout(function () {
            jQuery('#smsbox_msg_container').animate({ scrollTop: jQuery('#smsbox_msg_container').prop('scrollHeight') }, 300);
        }, 1);   //延迟1毫秒后取出的scrollHeight就是正确的，奇怪的问题

    });

    //全部已阅
    jQuery('#smsbox_read_all').click(function () {
        var array = GetSmsIds();
        RemoveSms(array.recv, array.send, 0);
    });

    //全部删除
    jQuery('#smsbox_delete_all').click(function () {
        var array = GetSmsIds();
        RemoveSms(array.recv, array.send, 1);
    });

    //全部详情
    jQuery('#smsbox_detail_all').click(function () {
        var sms_id_str = '';
        var sms_id_str0 = '';
        var nav_mail_url = '';
        for (var i = 0; i < newSmsArray.length; i++) {
            if (newSmsArray[i].receive != '1')
                continue;

            nav_mail_url = newSmsArray[i].url;
            sms_id_str += newSmsArray[i].sms_id + ',';
            if (newSmsArray[i].type_id == '0')
                sms_id_str0 += newSmsArray[i].sms_id + ',';
        }
        newSmsArray = [];
        FormatSms();
        jQuery('#smsbox_msg_container').html('');
        //gp0
        openURL('', '', '/Module/nav/?SMS_ID_STR=' + sms_id_str + '&SMS_ID_STR0=' + sms_id_str0 + '&NAV_MAIN_URL=' + encodeURIComponent(nav_mail_url), '1');
        selectedRecvSmsIdStr = selectedSendSmsIdStr = '';
    });


    //已阅
    jQuery('#smsbox_toolbar_read').click(function () {
        var lis = jQuery('#smsbox_list_container > div.list-block');
        var acliindex = lis.index(jQuery('div.list-block-active'));
        RemoveSms(selectedRecvSmsIdStr, selectedSendSmsIdStr, 0, acliindex);
    });

    //删除
    jQuery('#smsbox_toolbar_delete').click(function () {
        var lis = jQuery('#smsbox_list_container > div.list-block');
        var acliindex = lis.index(jQuery('div.list-block-active'));
        RemoveSms(selectedRecvSmsIdStr, selectedSendSmsIdStr, 1, acliindex);
    });

    //内容块hover效果
    var msgBlocks = jQuery('#smsbox_msg_container > div.msg-block');
    msgBlocks.live('mouseenter', function () { jQuery(this).addClass('msg-hover'); });
    msgBlocks.live('mouseleave', function () { jQuery(this).removeClass('msg-hover'); });

    //内容块click事件
    msgBlocks.live('click', function () {
        jQuery('#smsbox_msg_container > div.msg-block').removeClass('msg-active');
        jQuery(this).addClass('msg-active');
    });

    //回复事件
    jQuery('.head > .operation > a.reply', msgBlocks).live('click', function () {
        jQuery('#smsbox_textarea').trigger('focus');
    });

    //查看详情事件
    jQuery('.head > .operation > a.detail', msgBlocks).live('click', function () {
        var sms_id = jQuery(this).attr('sms_id');
        var url = jQuery(this).attr('url');
        RemoveSms(sms_id, '', 0);
        openURL('', '', url, '1');
    });

    //快速回复
    jQuery('#smsbox_rapid_reply').change(function () {
        if (this.selectedIndex == 0)
            return;
        jQuery('#smsbox_textarea').val(this.options[this.selectedIndex].text)
    });

    //输入框Ctrl + Enter事件
    jQuery('#smsbox_textarea').keypress(function (event) {
        if (event.keyCode == 10 || event.ctrlKey && event.which == 13)
            jQuery('#smsbox_send_msg').triggerHandler('click');
    });

    //发送
    jQuery('#smsbox_textarea').bind('focus', function () {
        jQuery(this.parentNode).addClass('center-reply-focus');
    });
    jQuery('#smsbox_textarea').bind('blur', function () {
        jQuery(this.parentNode).removeClass('center-reply-focus');
    });

    jQuery('#smsbox_send_msg').click(function () {
        var msg = jQuery('#smsbox_textarea').val();
        if (!msg) return;
        var user_id = jQuery('#smsbox_msg_container > div.msg-active:first').attr('user') || jQuery('#smsbox_list_container > div.list-block-active:first').attr('user');
        var personname = jQuery('#smsbox_msg_container > div.msg-active:first').attr('user') || jQuery('#smsbox_list_container > div.list-block-active:first').attr('personname');
        //gaop
        if (!user_id) {
            alert('请选择发送用户');
            return;
        }

        var reg = /\n/g;
        var content = msg.replace(reg, "<br />");
        var date = new Date();
        var html = CreateMsgBlock({ "sms_id": "send_" + (maxSendSmsId++), "class": "to", "user": loginUser.uid, "name": loginUser.user_name, "time": date.toTimeString().substr(0, 5), "content": content });
        jQuery('#smsbox_msg_container').append(html);
        window.setTimeout(function () {
            jQuery('#smsbox_msg_container').animate({ scrollTop: jQuery('#smsbox_msg_container').prop('scrollHeight') }, 300);
        }, 1);

        newSmsArray[newSmsArray.length] = { sms_id: "", to_id: user_id, from_id: loginUser.uid, from_name: loginUser.user_name, type_id: "0", type_name: "个人微讯", send_time: date.toTimeString().substr(0, 5), unread: 0, content: content, url: "", receive: 0 };
        //newSmsArray = jQuery.merge(array, newSmsArray);

        jQuery.ajax({
            type: 'POST',
            url: '/Sys/Sms/SmsSendAjax.aspx?r=' + Math.floor(Math.random() * 1000),
            data: { 'TO_UID': user_id, 'CONTENT': msg, 'personname': personname, 'charset': 'utf-8' },
            dataType: 'text',
            success: function (data) {
                jQuery('#smsbox_textarea').val("");
            },
            error: function (request, textStatus, errorThrown) {
                alert('微讯发送失败：' + textStatus);
            }
        });

        jQuery('#smsbox_textarea').trigger('focus');
    });
}

//事务提醒初始化事件
function initNocbox() {
    //绑定打开事务提醒
    var openBtn = jQuery('#nocbox');
    openBtn.click(function () {
        var nocboxPanel = jQuery('#new_noc_panel').css("display");
        nocboxPanel == "none" ? noc_mon() : CloseNoc();
    });

    //按钮绑定关闭事件
    var closeBtn = jQuery('#new_noc_panel > #new_noc_title > span.noc_iterm_close');
    closeBtn.click(function () {
        CloseNoc();
    });

    //内容块hover效果
    var nocBlocks = jQuery('#new_noc_list > div.noc_iterm > ul.noc_iterm_data > li');
    nocBlocks.live('mouseenter', function () { jQuery(this).addClass('noc_iterm_hover'); });
    nocBlocks.live('mouseleave', function () { jQuery(this).removeClass('noc_iterm_hover'); });

    //点击查看提醒
    jQuery('#new_noc_list > div.noc_iterm > ul.noc_iterm_data > li').live('click', function () {
        var url = jQuery(this).attr('url');
        var sms_id = jQuery(this).attr('sms_id');
        var type_id = jQuery(this).attr('type_id');
        var sms_title = jQuery(this).attr('sms_title');
        RemoveNoc(jQuery(this), sms_id, 0);
        if (url != "") {
            openPage(unescape(sms_title), url);
        }
    });

    //点击全部已阅
    jQuery('#ViewAllNoc').live('click', function () {
        var idstr = get_noc_idstr();
        jQuery.ajax({
            type: 'POST',
            url: '/Module/Ajax.ashx?Type=ReadSms&r=' + Math.floor(Math.random() * 1000),
            data: { 'RecordID': idstr},
            cache: false,
            success: function () {
                jQuery('#new_noc_list').empty();
                jQuery("#new_noc_panel > .button").find("#ViewAllNoc,#ViewDetail").hide();
                autocloseNoc();
            },
            error: function (request, textStatus, errorThrown) {
                jQuery('#new_noc_list').hide();
                jQuery('#nocbox_tips').html('<div class="error">操作失败(' + request.status + ')：' + textStatus + '</div>').show();
            }
        });
        SetNoReadNocNum(0);
    });

    //点击全部详情
    jQuery('#ViewDetail').live('click', function () {
        var idstr = firsturl = separator = "";
        var idobj = jQuery('#new_noc_list > .noc_iterm > .noc_iterm_data > li');
        var readobj = jQuery('#new_noc_list > div.noc_iterm > .noc_iterm_title > .noc_iterm_read');
        var idstr_all = get_noc_idstr();
        idobj.each(function () {
            url = jQuery(this).attr("url");
            sms_id = jQuery(this).attr("sms_id");
            if (url != "" && firsturl == "") {
                firsturl = url;
            }
            if (url != "") {
                idstr += separator + jQuery(this).attr("sms_id");
                separator = ",";
            }
        });
        url = '/MyWork/SmsAffairs/SmsList.aspx?mid=675&r=' + Math.floor(Math.random() * 1000) + '&NAV_MAIN_URL=' + encodeURIComponent(firsturl);
        openPage('全部详情', url);
        closeNodesA(readobj, idstr_all);
        SetNoReadNocNum(0);
    });

    jQuery('#CloseBtn').live('click', function () {
        CloseNoc();
    });

    //点击类型，类型全部已阅
    jQuery('#new_noc_list > div.noc_iterm > .noc_iterm_title > .noc_iterm_read').live('click', function () {
        var idstr = idstr_all = firsturl = "";
        var separator = ",";
        var type_id = jQuery(this).attr('type_id');
        var sms_title = jQuery(this).attr('sms_title');
        var idstr_all = get_noc_idstr(type_id);
        var idobj = jQuery("#new_noc_panel > #new_noc_list > .noc_iterm_" + type_id + " > .noc_iterm_data > li");
        idobj.each(function () {
            url = jQuery(this).attr("url");
            sms_id = jQuery(this).attr("sms_id");
            if (url != "" && firsturl == "") {
                firsturl = url;
            }
            if (url != "") {
                idstr += separator + jQuery(this).attr("sms_id");
                separator = ",";
            }
        });
        closeNodesA(jQuery(this), idstr_all);
        url = '/Sys/Sms/SmsDetailAffairs.aspx?r=' + Math.floor(Math.random() * 1000) + '&SmsType=' + type_id + '&NAV_MAIN_URL=' + encodeURIComponent(firsturl);
        openPage(unescape(sms_title), url);
    });

    jQuery.ajax({
        type: 'GET',
        url: '/Module/Ajax.ashx?Type=GetSms_Time_Span&r=' + Math.floor(Math.random() * 1000),
        cache: false,
        success: function (data) {
             if (data != "")
                monInterval.sms = data;
        }
    });

}

function sms_mon() {
    if (!timer_sms_mon)
        window.clearTimeout(timer_sms_mon);
    if (monInterval.sms == 0)
        return;
    timer_sms_mon = window.setTimeout(sms_mon, monInterval.sms * 1000);

    jQuery.ajax({
        type: 'GET',
        url: '/Module/Ajax.ashx?Type=HasNewSms&r=' + Math.floor(Math.random() * 1000),
        success: function (data) {
            if (data != "") {
                jQuery('#new_sms_sound').innerHTML = newSmsSoundHtml;
                if (timer_sms_mon) {
                    window.clearTimeout(timer_sms_mon);
                    timer_sms_mon = null;
                }

                if (data.indexOf("A") >= 0) {//事务提醒
                    noc_mon();
                }
                if (data.indexOf("B") >= 0) {//在线聊天
                    //                    var wWidth = (window.document.documentElement.clientWidth || window.document.body.clientWidth || window.innerWidth);
                    //                    var wHeight = (window.document.documentElement.clientHeight || window.document.body.clientHeight || window.innerHeight);
                    //                    var left = Math.floor((wWidth - jQuery('#new_sms_panel').outerWidth()) / 2);
                    //                    var top = Math.floor((wHeight - jQuery('#new_sms_panel').outerHeight()) / 2) - 100;

                    //                    jQuery('#new_sms_panel').css({ left: left, top: top });
                    //                    jQuery('#new_sms_mask').show();
                    //                    jQuery('#new_sms_panel').show().focus();
                    var c = data.split('|')[1];
                    $.messager.show({
                        title: '未读留言',
                        msg: "<a href=\"javascript:openPage('在线聊天','/MyWork/InstantMessage/List.aspx')\">您有"+c+"条未读留言!</a>",
                        timeout: 5000,
                        showType: 'slide'
                    });
                }
                //blinkTitleInterval = window.setInterval(BlinkTitle, 1000);
            }
        }
    });
}

function noc_mon() {
    var wWidth = (window.document.documentElement.clientWidth || window.document.body.clientWidth || window.innerWidth);
    var wHeight = (window.document.documentElement.clientHeight || window.document.body.clientHeight || window.innerHeight);
    var left = Math.floor((wWidth - jQuery('#new_noc_panel').outerWidth()) / 2);
    var top = Math.floor((wHeight - jQuery('#new_noc_panel').outerHeight()) / 2) - 100;

    jQuery('#new_noc_panel').css({ left: left, top: top });

    //显示事务提醒面板
    jQuery('#new_noc_panel').show().focus();

    //触发读取提醒函数
    LoadNoc();
}
// lp 读取提醒数据信息
var newNocArray = [];
function LoadNoc(flag) {
    jQuery('#new_noc_list').hide();
    flag = typeof (flag) == "undefined" ? "1" : "0";
    jQuery.ajax({
        type: 'GET',
        url: '/Module/Ajax.ashx?Type=SmsForRemind&r=' + Math.floor(Math.random() * 1000),
        data: { 'FLAG': flag },
        dataType: "json",
        cache: false,
        success: function (data) {
            jQuery('#nocbox_tips').empty().hide();
            if (data) {
                FormatNoc(data);
            } else {
                jQuery("#new_noc_panel").css("padding-bottom", "0px");
                autocloseNoc();
            }
        },
        error: function (request, textStatus, errorThrown) {
            jQuery('#nocbox_tips').html('<div class="error">获取事务提醒数据失败(' + request.status + ')：' + textStatus + '</div>').show();
        }
    });
}

//格式化提醒数据
function FormatNoc(data) {
    var html = totalnum = '';
    jQuery('#new_noc_list').empty();
    jQuery.each(data, function (key, item) {
        if (item.type_id == "") return false;

        //取提醒内容的前2行内容显示
        var content = decodeURIComponent(item.content);
        var pos = content.indexOf('<br />');
        if (pos >= 0) {
            var pos2 = content.indexOf('<br />', pos + 6);
            if (pos2 >= 0)
                content = content.substr(0, pos2);
        }

        if (jQuery('#new_noc_list').find('.noc_iterm_' + item.type_id).size() != 0) {
            html = '<li id="noc_li_' + item.sms_id + '" sms_id="' + item.sms_id + '" url="' + item.url + '" type_id="' + item.type_id + '" sms_title="' + escape(item.sms_title) + '">';
            html += '<p class="noc_iterm_info"><span class="noc_iterm_time">' + decodeURIComponent(item.send_time) + '</span>' + decodeURIComponent(item.from_name) + '</p>';
            html += '<p class="noc_iterm_content">' + content + '</p>';
            html += '</li>';
            jQuery('.noc_iterm_' + item.type_id + ' > ul').append(html);
        } else {
            html = '<div class="noc_iterm noc_iterm_' + item.type_id + '">';
            html += '<div class="noc_iterm_title"><span class="noc_iterm_read" type_id="' + item.type_id + '" title="分类已阅"></span>' + decodeURIComponent(item.type_name) + '</div>';
            html += '<ul class="noc_iterm_data">';
            html += '<li id="noc_li_' + item.sms_id + '" sms_id="' + item.sms_id + '" url="' + item.url + '" type_id="' + item.type_id + '" sms_title="' + escape(item.sms_title) + '">';
            html += '<p class="noc_iterm_info"><span class="noc_iterm_time">' + decodeURIComponent(item.send_time) + '</span>' + decodeURIComponent(item.from_name) + '</p>';
            html += '<p class="noc_iterm_content">' + content + '</p>';
            html += '</li>';
            html += '</ul>';
            html += '</div>';
            jQuery('#new_noc_list').append(html);
        }
    });

    var num = get_noc_num();
    //只有一条时，直接打开。
//    if (num == 1) {
//        var _obj = jQuery('#new_noc_list > div.noc_iterm > ul.noc_iterm_data > li');
//        if (_obj.attr("url") != "") {
//            _obj.click();
//            autocloseNoc();
//        }
//    }
    SetNoReadNocNum(num);

    jQuery('#new_noc_list').show();

    jQuery("#new_noc_panel > #new_noc_title > .noc_iterm_num >span").html(num);

    if (num >= 1) {
        jQuery('#new_noc_panel').css("padding-bottom", "0px");
        jQuery('#new_noc_panel > .button > a').show();
    }
}

//计算目前有多少条提醒
function get_noc_num() {
    var totalnum = '';
    totalnum = jQuery("#new_noc_panel > #new_noc_list > .noc_iterm > .noc_iterm_data > li").length;
    return totalnum;
}

//即时计算尚未提醒的提醒
function get_noc_idstr(type_id) {
    var idstr = '';
    var separator = '';
    if (type_id != "" && typeof (type_id) !== "undefined") {
        var idsobj = jQuery("#new_noc_panel > #new_noc_list > .noc_iterm_" + type_id + " > .noc_iterm_data > li");
    } else {
        var idsobj = jQuery("#new_noc_panel > #new_noc_list > .noc_iterm > .noc_iterm_data > li");
    }
    jQuery.each(idsobj, function () {
        idstr += separator + jQuery(this).attr("sms_id");
        separator = ",";
    });
    return idstr;
}

//去除微信
function RemoveSms(recvIdStr, sendIdStr, del, acliindex) {
    if (!recvIdStr) return;
    jQuery.ajax({
        type: 'POST',
        url: '/Module/Ajax.ashx?Type=DelSms&r=' + Math.floor(Math.random() * 1000),
        data: { 'RecordID': recvIdStr },
        dataType: 'text',
        success: function (data) {
            var array = [];
            for (var i = 0; i < newSmsArray.length; i++) {
                var id = newSmsArray[i].sms_id;
                if (id == recvIdStr || recvIdStr.indexOf(id + ',') == 0 || recvIdStr.indexOf(',' + id + ',') > 0 ||
               id == sendIdStr || sendIdStr.indexOf(id + ',') == 0 || sendIdStr.indexOf(',' + id + ',') > 0)
                    continue;

                array[array.length] = newSmsArray[i];
            }
            newSmsArray = array;

            var _len = strlen(recvIdStr);
            recvIdStr = recvIdStr.substring(_len - 1, _len) == "," ? recvIdStr.substring(0, _len - 1) : recvIdStr;

            if (recvIdStr.indexOf(',') > 0) //多条
            {
                selectedRecvSmsIdStr = selectedSendSmsIdStr = '';
                FormatSms();
            }
            else //一条
            {
                jQuery('#smsbox_msg_container > div.msg-block[sms_id="' + recvIdStr + '"]').remove();

                if (selectedRecvSmsIdStr.indexOf(recvIdStr + ',') == 0)
                    selectedRecvSmsIdStr = selectedRecvSmsIdStr.substr(recvIdStr.length + 1);
                if (selectedRecvSmsIdStr.indexOf(',' + recvIdStr + ',') > 0)
                    selectedRecvSmsIdStr = selectedRecvSmsIdStr.replace(',' + recvIdStr + ',', '');

                if (jQuery('#smsbox_msg_container > div.msg-block').length == 0)
                    FormatSms(acliindex);

            }
        },
        error: function (request, textStatus, errorThrown) {
            alert('操作失败：' + textStatus);
        }
    });
}

//去除提醒
function RemoveNoc(obj, recvIdStr, del) {
    if (!recvIdStr) return;
    jQuery.ajax({
        type: 'POST',
        url: '/Module/Ajax.ashx?Type=ReadSms&r=' + Math.floor(Math.random() * 1000),
        data: { 'RecordID': recvIdStr },
        success: function (data) {
            var lis = obj.parents(".noc_iterm").find("ul").find("li").size();
            if (recvIdStr.indexOf(",") != '-1') {
                obj.parents(".noc_iterm").remove()
            } else {
                lis == 1 ? obj.parents(".noc_iterm").remove() : obj.remove();
            }
            var num = get_noc_num();
            SetNoReadNocNum(num);
            jQuery("#new_noc_panel > #new_noc_title > .noc_iterm_num >span").html(num);
            if (num == 0) {
                jQuery("#new_noc_panel > .button").find("#ViewAllNoc,#ViewDetail").hide();
            }
            autocloseNoc();
        },
        error: function (request, textStatus, errorThrown) {
            alert('操作失败：' + textStatus);
        }
    });
}

//如果没有提醒信息，则自动隐藏盒子
function autocloseNoc() {
    var datanum = get_noc_num();
    jQuery("#new_noc_panel > #new_noc_title > .noc_iterm_num >span").html(datanum);
    if (!(datanum > 0)) {
        //去掉3秒延迟关闭功能
        CloseNoc();
//        jQuery('#new_noc_list').hide();
//        jQuery('#nocbox_tips').html("<h2>暂无新提醒</h2><br />本窗口 <span class='redfont'>" + nocbox_close_timeout + "</span> 秒后自动关闭").show();
//        closeNocPanel = window.setInterval(timerclose, 1000);
   }
   
}
//倒计时
function timerclose() {
    var time = jQuery('#nocbox_tips > span').text();
    if (time > 1) {
        jQuery('#nocbox_tips > span').text(time - 1);
    } else {
        CloseNoc();
    }
}
//关闭微信
function CloseRemind() {
    jQuery('#new_sms_mask').hide();
    jQuery('#new_sms_panel').hide();
    if (!timer_sms_mon)
        timer_sms_mon = window.setTimeout(sms_mon, monInterval.sms * 1000);

    ResetTitle();
}
//关闭消息盒子
function CloseNoc() {
    jQuery('#new_noc_panel').hide();
    if (!timer_sms_mon)
        timer_sms_mon = window.setTimeout(sms_mon, monInterval.sms * 1000);
    if (closeNocPanel) {
        window.clearInterval(closeNocPanel);
        closeNocPanel = null;
    }
    ResetTitle();
}

function closeNodesA(obj, recvIdStr) {
    var lis = obj.parents(".noc_iterm").find("ul").find("li").size();
    if (recvIdStr.indexOf(",") != '-1') {
        obj.parents(".noc_iterm").remove()
    } else {
        lis == 1 ? obj.parents(".noc_iterm").remove() : obj.remove();
    }
    var num = get_noc_num();
    SetNoReadNocNum(num);
    jQuery("#new_noc_panel > #new_noc_title > .noc_iterm_num >span").html(num);
    if (num == 0) {
        jQuery("#new_noc_panel > .button").find("#ViewAllNoc,#ViewDetail").hide();
    }
    autocloseNoc();
}

function SetNoReadNocNum(num) {
    if (num > 0) {
        jQuery("#nocbox > .head_user_tools_a_text").html("(" + num + ")");
    }
    else
        jQuery("#nocbox > .head_user_tools_a_text").html("");
}