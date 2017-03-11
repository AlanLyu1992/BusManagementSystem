function my_affair(AFF_ID) {
    myleft = (screen.availWidth - 250) / 2;
    mytop = (screen.availHeight - 200) / 2;
    window.open("../affair/note.php?AFF_ID=" + AFF_ID, "note_win" + AFF_ID, "height=200,width=250,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top=" + mytop + ",left=" + myleft);
}

//已完善 使用中
function my_note(CAL_ID, MemberID) {
    $Y('title').innerHTML = '查看日程';
    ShowDialog('form_div', 10);
    var result = _Newget("note.aspx?schendarid=" + CAL_ID + "&radom=" + Math.random() + "&MemberID=" + MemberID);
    load_form(result);
}

//已完善 使用中(日程安排查询结果，查看日程)
function my_note_v(CAL_ID) {
    $Y('title').innerHTML = '查看日程';
    ShowDialog('form_div', 10);
    var result = _Newget("note.aspx?view=1&schendarid=" + CAL_ID + "&radom=" + Math.random());
    load_form(result);
}

//便签
//已完善 使用中
function sch_note(CAL_ID) {
    myleft = (screen.availWidth - 250) / 2;
    mytop = (screen.availHeight - 200) / 2;
    window.open("Cal_note.aspx?schendarid=" + CAL_ID, '', "height=200,width=250,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top=" + mytop + ",left=" + myleft);
}

function show_work_stat_detail(TYPE_ID, USER_ID, DATE_BEGIN, DATE_END) {
    myleft = (screen.availWidth - 550) / 2;
    mytop = (screen.availHeight - 500) / 2;

    if (TYPE_ID == "diary")
        window.open("../diary/info/user_search_stat.php?FROMTYPE=WORK_STAT&FROM_WORKSTAT=1&TO_ID1=" + USER_ID + "&BEGIN_DATE=" + DATE_BEGIN + "&END_DATE=" + DATE_END, "", "height=500,width=650,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top=" + mytop + ",left=" + myleft);
    else if (TYPE_ID.substr(0, 8) == "workflow") {
        myleft = (screen.availWidth - 750) / 2;
        mytop = (screen.availHeight - 600) / 2;

        var LIST_TYPE = ""; //工作流列表类型（MAIN_FINISH-主办（完成）；MAIN_ALL－主办（所有）；SIGN_FINISH－会签（完成）；SIGN_ALL－会签（所有））
        if (TYPE_ID.substr(9) == "op")//工作流主办（完成）
            LIST_TYPE = "MAIN_FINISH";
        else if (TYPE_ID.substr(9) == "op1")//工作流主办（所有）
            LIST_TYPE = "MAIN_ALL";
        else if (TYPE_ID.substr(9) == "sign")//工作流会签（完成）
            LIST_TYPE = "SIGN_FINISH";
        else if (TYPE_ID.substr(9) == "sign1")//工作流会签（所有）
            LIST_TYPE = "SIGN_ALL";

        var openUrl = "workflow_detail.php?LIST_TYPE=" + LIST_TYPE + "&USER_ID_STAT=" + USER_ID + "&BEGIN_DATE_STAT=" + DATE_BEGIN + "&END_DATE_STAT=" + DATE_END;
        window.open(openUrl, "", "height=500,width=750,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top=" + mytop + ",left=" + myleft);
    }
    else
        window.open(TYPE_ID + ".php?USER_ID=" + USER_ID + "&DATE_BEGIN=" + DATE_BEGIN + "&DATE_END=" + DATE_END, "", "height=500,width=550,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top=" + mytop + ",left=" + myleft);
}

function my_aff_note(AFF_ID) {
    myleft = (screen.availWidth - 250) / 2;
    mytop = (screen.availHeight - 200) / 2;
    window.open("aff_note.php?AFF_ID=" + AFF_ID, "note_win" + AFF_ID, "height=200,width=250,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top=" + mytop + ",left=" + myleft);
}

function my_task_note(TASK_ID) {
    myleft = (screen.availWidth - 250) / 2;
    mytop = (screen.availHeight - 200) / 2;
    window.open("../task/note.php?TASK_ID=" + TASK_ID, "note_win" + TASK_ID, "height=200,width=250,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top=" + mytop + ",left=" + myleft);
}

//已完善 使用中
function My_Submit() {
    __doPostBack('link_fresh', '');
}
//已完善 使用中
function set_year(op) {
    var Dt = new Date(document.getElementById("hid_spe_date").value.replace(/-/g, '/'));
    var St = new Date(Dt.getFullYear() + op, Dt.getMonth(), Dt.getDate());
    var st = St.getFullYear() + "-" + (St.getMonth() + 1) + "-" + St.getDate();
    document.getElementById("hid_spe_date").value = st;
    My_Submit();
}
//已完善 使用中
function set_mon(op) {
    var Dt = new Date(document.getElementById("hid_spe_date").value.replace(/-/g, '/'));
    var St = new Date(Dt.getFullYear(), Dt.getMonth() + op, Dt.getDate());
    var st = St.getFullYear() + "-" + (St.getMonth() + 1) + "-" + St.getDate();
    document.getElementById("hid_spe_date").value = st;
    My_Submit();
}
//已完善 使用中
function set_week(op) {

    var Dt = new Date(document.getElementById("hid_spe_date").value.replace(/-/g, '/'));
    var St = new Date(Dt.getFullYear(), Dt.getMonth(), Dt.getDate() + (op * 7));
    var st = St.getFullYear() + "-" + (St.getMonth() + 1) + "-" + St.getDate();
    document.getElementById("hid_spe_date").value = st;
    My_Submit();
}
//已完善 使用中
function set_day(op) {
    var Dt = new Date(document.getElementById("hid_spe_date").value.replace('-', '/'));
    var St = new Date(Dt.getYear(), Dt.getMonth(), Dt.getDate() + op);
    var st = St.getYear() + "-" + (St.getMonth() + 1) + "-" + St.getDate();
    document.getElementById("hid_spe_date").value = st;
    My_Submit();
}

//设置状态 赋值到页面 刷新 matrixkey
//已完善 使用中
function set_status_index(status) {
    if (document.getElementById("hid_flag")) {
        if (document.getElementById("hid_flag").value == "false") {
            document.getElementById("hid_state").value = status;
            document.getElementById("hid_flag").value = "true";
            __doPostBack('link_statechange', '');
        }
        else {
            document.getElementById("hid_flag").value = "false";
        }
    }
    else {
        __doPostBack('link_statechange', '');
    }
}


//不显示0-7 matrixkey
//已完善 使用中
function display_front() {
    var front = document.getElementById("front");
    if (!front)
        return;
    if (front.style.display == '')
        front.style.display = 'none';
    else
        front.style.display = '';
}

//暂时没用
//根据年份和周数 获取该周中与传入日期同一星期几的日子
function getWeekFDateByYearWeek(Y, Z, Odate) {
    var d = new Date(Y, 0, (7 * Z))

    var nd = new Date(d.getYear(), (d.getMonth()), (d.getDate() - d.getDay() + 1))
    Md = nd.getYear() + "-" + (nd.getMonth() + 1) + "-" + nd.getDate() //一周的第一天

    var nd = new Date(d.getYear(), (d.getMonth()), (d.getDate() - d.getDay() + 7))
    Sd = nd.getYear() + "-" + (nd.getMonth() + 1) + "-" + nd.getDate() //一周的最后一天

    var myDate = new Date(Odate.replace('-', '/'));
    var myDate_week = myDate.getDay();         //获取当前星期X(0-6,0代表星期天)

    var ld = new Date(nd.getYear(), nd.getMonth(), nd.getDate() + parseInt(myDate_week));
    Ld = ld.getYear() + "-" + (ld.getMonth() + 1) + "-" + ld.getDate()
    return Ld;
}

//新版的新建日程
//第一个参数：20120111_010000 年月日_时分秒
//第二个参数：day 表示一整天的事务；month表示从月视图中创建的事务
//完善中
function new_sch_new(CAL_TIME, TIME_DIFF) {
    $Y('title').innerHTML = '新建值班';
    ShowDialog('form_div', 10);
    if (typeof (TIME_DIFF) == "undefined" || TIME_DIFF == null) {
        TIME_DIFF = "";
    }
    var result = _Newget("NewIndex.aspx?date=" + CAL_TIME + "&type=" + TIME_DIFF + "&radom=" + Math.random());
    load_form(result);
}

//已完善 使用中
function edit_sch(SCH_ID) {
    $Y('title').innerHTML = '修改值班';
    ShowDialog('form_div', 10);
    var id = document.getElementById("form_body");
    id.style.height = "370px";
    var result = _Newget("modify.aspx?schendarid=" + SCH_ID + "&radom=" + Math.random());
    load_form(result);
}

function log_sch(SCH_ID) {
    $Y('title').innerHTML = '值班日志';
    ShowDialog('form_div', 10);
    var id = document.getElementById("form_body");
    id.style.height = "190px";
    var result = _Newget("Log.aspx?schendarid=" + SCH_ID + "&radom=" + Math.random());
    load_form(result);
}

//已完善 使用中
function load_form(req) {
    if (req != "")
        $Y('form_body').innerHTML = req;
    //else
    //    $Y('form_body').innerHTML = "错误：" + req;
}

//事务删除
//已完善 使用中
function del_sch(CAL_ID, from) {
    if (window.confirm("删除后将不可恢复,确定要删除吗?")) {
        _Newget("Delete.aspx?schendarid=" + CAL_ID);
        if ($Y('list_tr_' + CAL_ID)) {
            $Y('list_tr_' + CAL_ID).parentNode.removeChild($Y('list_tr_' + CAL_ID));
        }
        else if ($Y('div_' + CAL_ID)) {
            $Y('div_' + CAL_ID).parentNode.removeChild($Y('div_' + CAL_ID));
        }
        hideMenu();
        if (from == 1) {
            HideDialog('form_div');
        }
        location = location;
    }

}

//日常安排查询模块 新建日程事务 周期性事务 任务 matrixkey
//已完善 使用中
function new_arrange(DEPT_ID, PERSON_ID, YEAR, MONTH, DAY, TYPE) {
    var url = "index_new.aspx?matrixkey=1";
    if (typeof (DEPT_ID) != "undefined" && DEPT_ID != "") {
        url += "&deptid=" + DEPT_ID;
    }
    if (typeof (PERSON_ID) != "undefined" && PERSON_ID != "") {
        url += "&personid=" + PERSON_ID;
    }
    if (typeof (YEAR) != "undefined" && YEAR != "") {
        url += "&year=" + YEAR;
    }
    else {
        if (document.getElementById("sel_year")) {
            url += "&year=" + document.getElementById("sel_year").value;
        }
    }

    if (typeof (MONTH) != "undefined" && MONTH != "") {
        url += "&month=" + MONTH;
    }
    else {
        if (document.getElementById("sel_month")) {
            url += "&month=" + document.getElementById("sel_month").value;
        }
    }

    if (typeof (DAY) != "undefined" && DAY != "") {
        url += "&day=" + DAY;
    }
    else {
        if (document.getElementById("sel_day")) {
            url += "&day=" + document.getElementById("sel_day").value;
        }
    }
    if (typeof (TYPE) == "undefined") {
        TYPE = "";
    }
    url += "&type=" + TYPE;
    url += "&modulecode=" + document.getElementById("hid_modulecode").value;
    url += "&c=" + Math.random();
    window.open(url, 'oa_sub_window', 'height=420,width=520,status=0,toolbar=no,menubar=no,location=no,left=300,top=200,scrollbars=yes,resizable=yes');
}

function CheckCalForm() {
    if (document.new_sch_form.CONTENT.value == "") {
        alert("值班要求不能为空！");
        return (false);
    }
    return (true);
}

function sch_alert(msg) {
    alert(msg);
}

//数据保存 包含新增，更新
function sch_date_save(Schedul) {
    var schedul = Schedul;
    var sch_id = document.getElementById("CAL_ID").value;
    var sch_type = document.getElementById("ddl_sch_Type");  //排班类型
    for (i = 0; i < sch_type.length; i++) {
        if (sch_type[i].selected == true) {
            var value2 = sch_type[i].value;
        }
    }
    var sch_attend = document.getElementById("ddl_sch_attend"); //值班类型
    for (i = 0; i < sch_attend.length; i++) {
        if (sch_attend[i].selected == true) {
            var value1 = sch_attend[i].value
        }
    }
    sch_attend = value1;
    sch_type = value2;
    var beginday = document.getElementById("CAL_TIME").value.trim();
    var beginhour = document.getElementById("starthour");
    var selecthour1 = beginhour.options[beginhour.selectedIndex].value;
    var sch_begindate = ""; //起始时间
    sch_begindate = beginday + " " + selecthour1;
    sch_begindate = sch_begindate.replace(/-/g, "/");
    if (schedul == ""||typeof(schedul)=="undefined") { //单人排班有结束时间
        var endday = document.getElementById("END_TIME").value.trim();
        var endhour = document.getElementById("endhour");
        var selecthour2 = endhour.options[endhour.selectedIndex].value;
        var sch_enddate = ""; //结束时间      
        sch_enddate = endday + " " + selecthour2
        sch_enddate = sch_enddate.replace(/-/g, "/");
        var sdate = new Date(sch_begindate);
        var edate = new Date(sch_enddate);
        if (sdate >= edate) {
            alert("开始时间不能大于等于结束时间");
            return;
        }
    }
    else {
        var duration = document.getElementById("Duration").value.trim(); //每班时长
    }
    var personid = document.getElementById("hidPersonId").value;
    var personname = document.getElementById("txtPersonName").value;
    if (personid == "" || personname == "") {
        alert("指定人不能为空");
        return;
    }
    var sch_request = document.getElementById("CONTENT").value; //值班要求
    if (sch_request == "") {
        alert("值班要求不能为空");
        return;
    }
    if (sch_request.length > 100) {
        alert("值班要求的长度不能大于100");
        return;
    }
    var remark = document.getElementById("Remark").value;
    if (remark.length > 100) {
        alert("备注的长度不能大于100");
        return;
    }
    var sch_hour = document.getElementById("BEFORE_HOUR").value; //提醒-提前小时数
    var sch_remind = document.getElementById("SMS_REMIND").checked; //是否提醒 true or false
    var sch_number = document.getElementById("BEFORE_Number").value; //提醒次数
    _Newget("Update.aspx?sch_id=" + sch_id + "&sch_attend=" + escape(sch_attend) + "&sch_type=" + escape(sch_type) + "&sch_begindate=" + sch_begindate + "&sch_enddate=" + sch_enddate + "&sch_request=" + escape(sch_request) + "&sch_hour=" + sch_hour + "&sch_number=" + sch_number + "&sch_remind=" + sch_remind + "&personid=" + personid + "&personname=" + escape(personname) + "&remark=" + escape(remark) + "&duration=" + duration);
    HideDialog('form_div');
    location = location;
}

//是否选中全天日程
function TurnAll() {
    var all_day = document.getElementById("allday");
    var beginhour = document.getElementById("starthour");
    var endhour = document.getElementById("endhour");
    if (all_day.checked == true) {
        var shour = beginhour.attributes['a1'].nodeValue;
        var ehour = endhour.attributes['a1'].nodeValue;
        //beginhour.options.selectedText = shour;
        //endhour.options.selectedText = ehour;
        document.getElementById("hidshour").value = beginhour.options[beginhour.selectedIndex].value;
        document.getElementById("hidehour").value = endhour.options[endhour.selectedIndex].value;
        beginhour.value = shour;
        endhour.value = ehour;
        beginhour.disabled = "false";
        endhour.disabled = "false";

    }
    else {
        beginhour.disabled = "";
        endhour.disabled = "";
        beginhour.value = document.getElementById("hidshour").value;
        endhour.value = document.getElementById("hidehour").value;
    }

}

//下载模板
function download() {
    window.location.href = 'Download.aspx';
    HideDialog('form_div1');
}


function set_option(option, id, className) {
    hideMenu();
    option = typeof (option) == "undefined" ? "" : option;
    $Y(id.toUpperCase() + "_FIELD").value = option;
    if (option == 0) {
        $Y(id).innerHTML = '未指定';
    } else {
        // $Y(id).innerHTML=$Y(id+'_'+option).innerHTML + $Y(id).innerHTML.substr($Y(id).innerHTML.indexOf("<"));   
        $Y(id).innerHTML = $Y(id + '_' + option).innerHTML;
    }
    $Y(id).className = className + option;
}


function SaveLog() {
    var Id = document.getElementById("Scheduleid").value;
    var Log = document.all("txtLog").value;
    if (Log.length > 200) {
        alert("值班日志的长度不能大于200");
        return;
    }
    _Newget("SaveLog.aspx?schendarid=" + Id + "&log=" + escape(Log));
    HideDialog('form_div');
}

var $Y = function(id) {return document.getElementById(id);};
function ShowDialog(id,vTopOffset)
{
   if(typeof arguments[1] == "undefined")
     vTopOffset = 90;
     
   var bb=(document.compatMode && document.compatMode!="BackCompat") ? document.documentElement : document.body;
   $Y("overlay").style.width = Math.max(parseInt(bb.scrollWidth),parseInt(bb.offsetWidth))+"px";
   $Y("overlay").style.height = Math.max(parseInt(bb.scrollHeight),parseInt(bb.offsetHeight))+"px";

   $Y("overlay").style.display = 'block';
   $Y(id).style.display = 'block';

   $Y(id).style.left = ((bb.offsetWidth - $Y(id).offsetWidth)/2)+"px";
   $Y(id).style.top  = (vTopOffset + bb.scrollTop)+"px";
}
function HideDialog(id)
{
   $Y("overlay").style.display = 'none';
   $Y(id).style.display = 'none';
}
