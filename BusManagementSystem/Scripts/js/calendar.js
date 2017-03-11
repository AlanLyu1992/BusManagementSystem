function my_affair(AFF_ID) {
    myleft = (screen.availWidth - 250) / 2;
    mytop = (screen.availHeight - 200) / 2;
    window.open("../affair/note.php?AFF_ID=" + AFF_ID, "note_win" + AFF_ID, "height=200,width=250,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top=" + mytop + ",left=" + myleft);
}

//已完善 使用中
function my_note(CAL_ID, MemberID) {
    $Y('title').innerHTML = '查看日程';
    ShowDialog('form_div', 10);
    var result = _Newget("note.aspx?calendarid=" + CAL_ID + "&radom=" + Math.random() + "&MemberID=" + MemberID + "&r=" + Math.random());
    load_form(result);
}

//已完善 使用中(日程安排查询结果，查看日程)
function my_note_v(CAL_ID) {
    $Y('title').innerHTML = '查看日程';
    ShowDialog('form_div', 10);
    var result = _Newget("note.aspx?view=1&calendarid=" + CAL_ID + "&radom=" + Math.random());
    load_form(result);
}

//便签
//已完善 使用中
function cal_note(CAL_ID) {
    myleft = (screen.availWidth - 250) / 2;
    mytop = (screen.availHeight - 200) / 2;
    window.open("Cal_note.aspx?calendarid=" + CAL_ID, '', "height=200,width=250,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top=" + mytop + ",left=" + myleft);
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
    var Dt = new Date(document.getElementById("hid_spe_date").value.replace(/-/g, "/"));
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
    var Dt = new Date(document.getElementById("hid_spe_date").value.replace(/-/g, '/'));
    var St = new Date(Dt.getFullYear(), Dt.getMonth(), Dt.getDate() + op);
    var st = St.getFullYear() + "-" + (St.getMonth() + 1) + "-" + St.getDate();
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

//设置重要级别  
//已完善 使用中
function set_option(option, id, className) {
    hideMenu();
    option = typeof (option) == "undefined" ? "" : option;
    $Y(id.toUpperCase() + "_FIELD").value = option;
    if (option == 0) {
        $Y(id).innerHTML = '未指定';
    } else {
        // $(id).innerHTML=$(id+'_'+option).innerHTML + $(id).innerHTML.substr($(id).innerHTML.indexOf("<"));   
        $Y(id).innerHTML = $Y(id + '_' + option).innerHTML;
    }
    $Y(id).className = className + option;
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

//查看模式 周 月 日 列表 
//已完善 使用中
function set_view(view, MemberID) {
    var theDate = "";
    theDate = document.getElementById("hid_spe_date").value;

    var url = "";
    if (view == "day") {
        url = "CalendarOfDay.aspx";
    }
    else if (view == "week") {
        url = "CalendarWeek.aspx";
    }
    else if (view == "month") {
        url = "CalendarMonth.aspx";
    }
    else if (view == "list") {
        url = "NewView.aspx";
    }
    url += "?state=" + document.getElementById("hid_state").value;
    url += "&theDate=" + theDate + "&MemberID=" + MemberID;
    if (document.getElementById("sel_dept")) {
        url += "&deptid=" + document.getElementById("sel_dept").value;
    }
    if (document.getElementById("sel_person")) {
        url += "&personid=" + document.getElementById("sel_person").value;
    }
    location = url;
}

//新版的新建日程
//第一个参数：20120111_010000 年月日_时分秒
//第二个参数：day 表示一整天的事务；month表示从月视图中创建的事务
//完善中
function new_cal_new(CAL_TIME, TIME_DIFF) {
    $Y('title').innerHTML = '新建日程';
    ShowDialog('form_div', 10);
    if (typeof (TIME_DIFF) == "undefined" || TIME_DIFF == null) {
        TIME_DIFF = "";
    }
    var result = _Newget("NewIndex.aspx?date=" + CAL_TIME + "&type=" + TIME_DIFF + "&radom=" + Math.random());
    load_form(result);
}

//新建日程 
//已完善 使用中
function new_cal(year, month, day, hour, week) {
    var myDate = new Date();
    var url = "CalendarArrangeAdd.aspx?matrixkey=1";
    if (typeof (year) != "undefined" && year != "") {
        url += "&year=" + year;
    }
    else {
        if (document.getElementById("sel_year")) {
            url += "&year=" + document.getElementById("sel_year").value;
        }
        else {
            url += "&year=" + myDate.getFullYear();
        }
    }

    if (typeof (month) != "undefined" && month != "") {
        url += "&month=" + month;
    }
    else {
        if (document.getElementById("sel_month")) {
            url += "&month=" + document.getElementById("sel_month").value;
        }
        else {
            if (!document.getElementById("sel_week")) {
                url += "&month=" + (myDate.getMonth() + 1);
            }
        }
    }

    if (typeof (day) != "undefined" && day != "") {
        url += "&day=" + day;
    }
    else {
        if (document.getElementById("sel_day")) {
            url += "&day=" + document.getElementById("sel_day").value;
        }
        else {
            if (!document.getElementById("sel_week")) {
                url += "&day=" + myDate.getDate();
            }
        }
    }
    if (typeof (hour) != "undefined" && hour != "") {
        url += "&hour=" + hour;
    }

    //新增周事务
    if (typeof (week) == "undefined" || week != "") {
        if (document.getElementById("sel_week")) {
            url += "&week=" + document.getElementById("sel_week").value;
        }
    }

    url += "&c=" + Math.random();
    var obj = new Object();
    obj.key = "false";
    window.showModalDialog(url, obj, "dialogWidth:600px;dialogHeight:400px;scroll:no;");
    if (obj.key == "true") {
        location = location;
    }
}

//已完善 使用中
function edit_cal(CAL_ID, MemberID) {
    $Y('title').innerHTML = '修改日程';
    ShowDialog('form_div', 10);
    var result = _Newget("modify.aspx?calendarid=" + CAL_ID + "&radom=" + Math.random() + "&MemberID=" + MemberID + "&r=" + Math.random());
    load_form(result);
}

//已完善 使用中
function load_form(req) {
    if (req != "")
        $Y('form_body').innerHTML = req;
    else
        $Y('form_body').innerHTML = "错误：" + req;
}
//新建工作日志 
//已完善 使用中
function new_diary(CAL_DATE) {
    parent.parent.openPage('新增工作日志', '/MyWork/WorkLogList/info.aspx?cal_date=' + CAL_DATE + "&Flag=Calendar&r=" + Math.random());
}

//事务删除
//已完善 使用中
function del_cal(CAL_ID, from) {
    if (window.confirm("删除后将不可恢复,确定要删除吗?")) {
        _Newget("Delete.aspx?calendarid=" + CAL_ID);
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

function del_aff(AFF_ID) {/*
   var url='delete.php?AFF_ID='+AFF_ID+'&OVER_STATUS='+document.form1.OVER_STATUS.value+'&YEAR='+document.form1.YEAR.value+'&MONTH='+document.form1.MONTH.value+'&DAY='+document.form1.DAY.value;
   if(document.form1.DEPT_ID) url+='&DEPT_ID='+document.form1.DEPT_ID.value;
   if(document.form1.USER_ID) url+='&USER_ID='+document.form1.USER_ID.value;
   if(window.confirm("删除后将不可恢复，确定删除吗？"))
      location=url;*/
}

function del_task(TASK_ID) {
    /*
    var url='../task/delete.php?TASK_ID='+TASK_ID+'&FLAG=info&OVER_STATUS='+document.form1.OVER_STATUS.value+'&YEAR='+document.form1.YEAR.value+'&MONTH='+document.form1.MONTH.value+'&DAY='+document.form1.DAY.value;
    if(document.form1.DEPT_ID) url+='&DEPT_ID='+document.form1.DEPT_ID.value;
    if(document.form1.USER_ID) url+='&USER_ID='+document.form1.USER_ID.value;
    if(window.confirm("删除后将不可恢复，确定删除吗？"))
    location=url;
    */
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

//已完善 使用中
function set_status_note(obj, id) {

    var a1 = $Y('EventStatus').getAttribute('a');
    if (a1 == "1") {
        a1 = '0';
        obj.innerText = "完成";
    }
    else {
        a1 = '1';
        obj.innerText = "未完成";
    }

    $Y('EventStatus').setAttribute('a', a1);
    _Newget("UpdateState.aspx?calendarid=" + id + "&r=" + Math.random());
    var result = _Newget("note.aspx?calendarid=" + id + "&r=" + Math.random());
    load_form(result);

}

//日程事务列表中的 完成 未完成 操作
//已完善 使用中
function set_status(obj, id) {
    var status = $Y('cal_' + id).getAttribute('status');
    var a1 = $Y('cal_' + id).getAttribute('a1');
    if (status == "1") {
        if (a1 == "0") {
            status = '0';
            $Y('cal_' + id).style.color = "#0066cc";
            obj.innerText = "完成";
            $Y('cal_' + id).title = '状态:未开始';

        }
        else if (a1 == "1") {
            status = '0';
            $Y('cal_' + id).style.color = "#0066cc";
            obj.innerText = "完成";
            $Y('cal_' + id).title = '状态:进行中';

        }
        else if (a1 == "2") {
            status = '0';
            $Y('cal_' + id).style.color = "#cc3333";
            obj.innerText = "完成";
            $Y('cal_' + id).title = '状态:已超时';

        }
    }
    else if (status == "0") {
        status = '1';
        $Y('cal_' + id).style.color = "#33cc00";
        obj.innerText = "未完成";
        $Y('cal_' + id).title = '状态:已完成';

    }
    $Y('cal_' + id).setAttribute('status', status);
    _Newget("UpdateState.aspx?calendarid=" + id + "&r=" + Math.random());
}

function CheckCalForm() {
    if (document.new_cal_form.CONTENT.value == "") {
        alert("事务内容不能为空！");
        return (false);
    }
    return (true);
}

function cal_alert(msg) {
    alert(msg);
}

//数据保存 包含新增，更新
function cal_date_save() {
    var cal_id = document.getElementById("CAL_ID").value;
    var memberID = document.getElementById("MemberID").value;
    var cal_level = document.getElementById("CAL_LEVEL_FIELD").value; //优先级
    var beginday = document.getElementById("CAL_TIME").value;
    var beginhour = document.getElementById("starthour");
    var selecthour1 = beginhour.options[beginhour.selectedIndex].value;
    var cal_begindate = ""; //起始时间
    cal_begindate = beginday + " " + selecthour1;
    var endday = document.getElementById("END_TIME").value;
    var endhour = document.getElementById("endhour");
    var selecthour2 = endhour.options[endhour.selectedIndex].value;
    var cal_enddate = ""; //结束时间      
    cal_enddate = endday + " " + selecthour2
    cal_begindate = cal_begindate.replace(/-/g, "/");
    cal_enddate = cal_enddate.replace(/-/g, "/");
    var sdate = new Date(cal_begindate);
    var edate = new Date(cal_enddate);
    if (sdate >= edate) {
        alert("开始时间不能大于等于结束时间");
        return;
    }

    //var cal_type = document.getElementById("CAL_TYPE").value; //事务类型
    var cal_content = document.getElementById("CONTENT").value; //事务内容
    if (cal_content == "") {
        alert("事务内容不能为空");
        return;
    }
    var cal_day = document.getElementById("BEFORE_DAY").value; //提醒-提前天数
    var cal_hour = document.getElementById("BEFORE_HOUR").value; //提醒-提前小时数
    var cal_minute = document.getElementById("BEFORE_MIN").value; //提醒-提前分钟数
    var cal_remind = document.getElementById("SMS_REMIND").checked; //是否提醒 true or false
    var cal_Emailremind = document.getElementById("SMS_EmailREMIND").checked;
    var cal_Phoneremind = document.getElementById("SMS_PhoneREMIND").checked;
    _Newget("Update.aspx?cal_id=" + cal_id + "&cal_level=" + cal_level + "&cal_begindate=" + cal_begindate + "&cal_enddate=" + cal_enddate + "&cal_content=" + escape(cal_content) + "&cal_day=" + cal_day + "&cal_hour=" + cal_hour + "&cal_minute=" + cal_minute + "&cal_remind=" + cal_remind + "&cal_emailremind=" + cal_Emailremind + "&cal_phoneremind=" + cal_Phoneremind + "&MemberID=" + memberID + "&r=" + Math.random());
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

function keyPress(ob) {
    if (!ob.value.match(/^[\+\-]?\d*?\.?\d*?$/)) ob.value = ob.t_value; else ob.t_value = ob.value; if (ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) ob.o_value = ob.value;
}
function keyUp(ob) {
    if (!ob.value.match(/^[\+\-]?\d*?\.?\d*?$/)) ob.value = ob.t_value; else ob.t_value = ob.value; if (ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) ob.o_value = ob.value;
}
function onBlur(ob) {
    if (!ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/)) ob.value = ob.o_value; else { if (ob.value.match(/^\.\d+$/)) ob.value = 0 + ob.value; if (ob.value.match(/^\.$/)) ob.value = 0; ob.o_value = ob.value };
}