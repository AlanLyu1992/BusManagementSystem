$(function () {
    var codedata = "Flag=5&PersonID=" + loginUser.pid + "&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "/MyWork/InstantMessage/AJAX.ashx",
        data: codedata,
        dataType: 'text',
        async: false,
        success: function (msg) {
            if (parseInt(msg) > 0) {
                $("#smsCount").html("(" + msg + ")");
            }
        }
    });
    var chat = $.connection.codingChatHub;
    $.connection.hub.start().done(function () {
        chat.server.userConnected(loginUser.pid, 'First');
    });
    chat.client.sendMessage = function (message) {
        var arry = message.split('★');
        art.dialog({
            title: '短消息',
            content: '<a href="javascript:Opendia(\'' + arry[1] + '\')" style="font-size:9pt">' + arry[2] + '给你发了一条短消息</a>',
            width: 200,
            height: 30,
            left: '100%',
            top: '100%',
            fixed: true,
            drag: false,
            resize: false,
            time: 5
        })
        var codedata = "Flag=3&ToPersonID=" + arry[4] + "&ToPersonName=" + encodeURI(arry[5]) + "&PersonID=" + arry[1] + "&PersonName=" + encodeURI(arry[2]) + "&Message=" + encodeURI(arry[0]) + "&Time=" + arry[3] + "&ReadFlag=isnotread&r=" + Math.floor(Math.random() * 1000);
        jQuery.ajax({
            type: "GET",
            url: "/MyWork/InstantMessage/AJAX.ashx",
            data: codedata,
            dataType: 'text',
            async: false,
            success: function (msg) {
            }
        });
    }

});

function Opendia(personid) {
    $("#smsCount").css("display", "none");
    art.dialog.open('/MyWork/InstantMessage/SendSms.aspx?PersonID=' + personid, {
        title: '即时通讯',
        padding: 0,
        resize: false,
        width: "850px",
        height: "530px"

    });
}