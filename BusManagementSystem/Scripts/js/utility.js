﻿var $Y = function (id) { return document.getElementById(id); };
var userAgent = navigator.userAgent.toLowerCase();
var isSafari = userAgent.indexOf("Safari") >= 0;
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);

var allElements = document.getElementsByTagName("*");

String.prototype.trim = function ()
{
    return this.replace(/(^[\s\t　]+)|([　\s\t]+$)/g, "");
};

function strlen(str)
{
    return str.replace(/[^\x00-\xff]/g, 'xx').length;
}
function getOpenner()
{
    if (is_moz)
        return parent.opener.document;
    else
        return parent.dialogArguments.document;
}

function isUndefined(variable)
{
    return typeof variable == 'undefined' ? true : false;
}

function URLSpecialChars(str)
{
    var re = /%/g;
    str = str.replace(re, "%25");
    re = /\+/g;
    str = str.replace(re, "%20");
    re = /\//g;
    str = str.replace(re, "%2F");
    re = /\?/g;
    str = str.replace(re, "%3F");
    re = /#/g;
    str = str.replace(re, "%23");
    re = /&/g;
    str = str.replace(re, "%26");
    return str;
}
function fetchOffset(obj)
{
    var left_offset = obj.offsetLeft;
    var top_offset = obj.offsetTop;
    while ((obj = obj.offsetParent) != null) {
        left_offset += obj.offsetLeft;
        top_offset += obj.offsetTop;
    }
    return { 'left': left_offset, 'top': top_offset };
}

function new_dom()
{
    var DomType = new Array("microsoft.xmldom", "msxml.domdocument", "msxml2.domdocument", "msxml2.domdocument.3.0", "msxml2.domdocument.4.0", "msxml2.domdocument.5.0");
    for (var i = 0; i < DomType.length; i++) {
        try {
            var a = new ActiveXObject(DomType[i]);
            if (!a) continue;
            return a;
        }
        catch (ex) { }
    }
    return null;
}

function new_req()
{
    if (window.XMLHttpRequest) return new XMLHttpRequest;
    else if (window.ActiveXObject) {
        var req;
        try { req = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { req = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e) { return null; } 
        }
        return req;
    } else return null;
}

function _get(url, args, fn, sync)
{
    sync = isUndefined(sync) ? true : sync;
    var req = new_req();
    if (args != "") args = "?" + args;
    try {
        req.open("GET", url + args, sync);
    }
    catch (ex) {
        alert(ex.description);
        return;
    }
    if (false == isUndefined(fn))
        req.onreadystatechange = function () { if (req.readyState == 4) fn(req); };
    req.send('');
}

function _Newget(url) {
    var result = "";
    var req = new_req();
    try {
        req.open("GET", url, false);
    }
    catch (ex) {
        alert(ex.description);
        return;
    }
    req.send('');
    if (req.readyState == 4) {
        result = req.responseText;
    }

    return result;
}

function _post(url, args, fn, sync)
{
    sync = isUndefined(sync) ? true : sync;
    var req = new_req();
    try {
        req.open('POST', url, sync);
    }
    catch (ex) {
        alert(ex.description);
        return;
    }
    req.setRequestHeader("Method", "POST " + url + " HTTP/1.1");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            var s;
            try { s = req.status; } catch (ex) {
                alert(ex.description);
            }
            if (s == 200) {
                fn(req);
            }
        }
    }
    req.send(args);
}

function _Newpost(url) {
    var result = "";
    var req = new_req();
    try {
        req.open('POST', url, false);
    }
    catch (ex) {
        alert(ex.description);
        return;
    }
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(null);
    if (req.readyState == 4) {
        result = req.responseText;
    }
    
    return result;
}

function getCookie(name)
{
    var arr = document.cookie.split("; ");
    for (i = 0; i < arr.length; i++)
        if (arr[i].split("=")[0] == name)
            return unescape(arr[i].split("=")[1]);
    return null;
}
function setCookie(name, value)
{
    var today = new Date();
    var expires = new Date();
    expires.setTime(today.getTime() + 1000 * 60 * 60 * 24 * 2000);
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString();
}

function is_offline(uid)
{
    var bOffline = true;
    var req = new_req();
    req.open("GET", "/Module/Ajax.ashx?Type=IsOffline&r=" + Math.floor(Math.random() * 1000) + "&uid=" + uid, false);
    req.onreadystatechange = function ()
    {
        if (req.readyState == 4 && req.status == 200 && req.responseText == uid)
            bOffline = false;
    };
    req.send(null);
    return bOffline;
//    var state = YX.SSO.MyWork.Mail.newmail.GetLoginState().value;
//    if (state == "1")
//        bOffline = false;
//    return bOffline;
}
//php print_r函数的javascript实现，列出数组中的值，调试程序时调用
function print_r(theObj)
{
    if (theObj.constructor == Array || theObj.constructor == Object) {
        document.write("<ul>")
        for (var p in theObj) {
            if (theObj[p].constructor == Array || theObj[p].constructor == Object) {
                document.write("<li>[" + p + "] => " + typeof (theObj) + "</li>");
                document.write("<ul>")
                print_r(theObj[p]);
                document.write("</ul>")
            }
            else {
                document.write("<li>[" + p + "] => " + theObj[p] + "</li>");
            }
        }
        document.write("</ul>")
    }
}

function close_window()
{
    if (typeof (window.external.OA_SMS) == 'undefined' || !window.external.OA_SMS("", "", "GET_VERSION") || window.external.OA_SMS("", "", "GET_VERSION") < '20110223') {
        window.open('', '_self', '');
        window.close();
    }
    else {
        window.external.OA_SMS("", "", "CLOSE_WINDOW")
    }
}

function isTouchDevice()
{
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

function CancelBuble(event) //停止事件冒泡函数,跨浏览器解决方案
{
    if (window.ActiveXObject) //IE
    { event.cancelBubble = true; }
    else //FireFox
    { event.stopPropagation(); }
}
