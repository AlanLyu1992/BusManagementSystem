
function batchBtnhandle(id) {
    var codedata = "Flag=GetOwnPower&FolderID=" + id + "&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: codedata,
        dataType: 'text',
        async: false,
        success: function (msg1) {
            var folderpower = msg1;
            if (folderpower.indexOf('Manage') < 0) {
                if (folderpower.indexOf('Add') < 0) {
                    $('#addCabinet').splitbutton('disable');
                    $('#uploadFile').linkbutton('disable');

                }
                else {
                    $('#addCabinet').splitbutton('enable');
                    $('#uploadFile').linkbutton('enable');
                }
                if (folderpower.indexOf('Move') < 0) {
                    $('#movebtn').linkbutton('disable');
                }
                else {
                    $('#movebtn').linkbutton('enable');
                }
                if (folderpower.indexOf('Del') < 0) {
                    $('#delbtn').linkbutton('disable');
                }
                else {
                    $('#delbtn').linkbutton('enable');
                }
                //batchdownbtn、btncopy
                if (folderpower.indexOf('Copy') < 0 && folderpower.indexOf('Down') < 0) {
                    $('#MoreHandle').splitbutton('disable');
                }
                else if (folderpower.indexOf('Copy') > 0 && folderpower.indexOf('Down') < 0) {
                    $('#MoreHandle').splitbutton('enable');
                    $('#batchdownbtn').css("display", "none");
                    $('#btncopy').css("display", "");
                }
                else if (folderpower.indexOf('Copy') < 0 && folderpower.indexOf('Down') > 0) {
                    $('#MoreHandle').splitbutton('enable');
                    $('#batchdownbtn').css("display", "");
                    $('#btncopy').css("display", "none");
                }
                else {
                    $('#MoreHandle').splitbutton('enable');
                    $('#batchdownbtn').css("display", "");
                    $('#btncopy').css("display", "");

                }
            }
            else {
                $('#addCabinet').splitbutton('enable');
                $('#uploadFile').linkbutton('enable');
                $('#movebtn').linkbutton('enable');
                $('#delbtn').linkbutton('enable');
                $('#MoreHandle').splitbutton('enable');
                $('#batchdownbtn').css("display", "");
                $('#btncopy').css("display", "");
            }
        }
    });
}

function ViewoPinion(id) {
    $('#dlg8').dialog('open').dialog('setTitle', '查看审批意见');
    var codedata = "Flag=GetOpinion&FileID=" + id + "&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: codedata,
        dataType: 'text',
        async: false,
        success: function (msg1) {
            $("#txtopinion").val(msg1);
        }
    });
}

function HandleFolder(id) {
    loadFoldertree();
    $("#handleFolderdt").css("display", "");
    if (id != "") {

        $('#dlg').dialog('open').dialog('setTitle', '编辑文件夹');

        $("#HidEditFolderID").val(id);

        var codedata = "Flag=GetFolderInfo&FolderID=" + id + "&r=" + Math.floor(Math.random() * 1000);
        jQuery.ajax({
            type: "GET",
            url: "AJAX.ashx",
            data: codedata,
            dataType: 'text',
            async: false,
            success: function (msg1) {
                var arry = msg1.split('☆');
                $('#txtfolderorder').numberbox('setValue', arry[1]);
                $("#txtfoldername").val(arry[0]);
                $("#txtRemark").val(arry[2]);

            }
        });
    }
    else {
        $('#dlg').dialog('open').dialog('setTitle', '新建文件夹');

        $('#txtfolderorder').numberbox('setValue', "");
        $("#txtfoldername").val("");
        $("#txtRemark").val("");
        $("#HidEditFolderID").val("");

    }

}

function deleteRecord(id, type, parentID) {
    msg = '确认此删除操作？';
    jQuery.messager.confirm("提示", msg, function (r) {
        if (r) {
            var codedata = "Flag=Delete&ID=" + id + "&Type=" + type + "&r=" + Math.floor(Math.random() * 1000);
            jQuery.ajax({
                type: "GET",
                url: "AJAX.ashx",
                data: codedata,
                dataType: 'text',
                async: false,
                success: function (msg1) {
                    if (msg1 == "True") {
                        $('#tt').datagrid('reload');
                        if (type == "1") {//代表的是文件夹
                            window.parent.deleteTreeNode(id, parentID);
                        }
                    }
                }
            });
        }
    });
}
function EditUploadFile(id) {
    $("#FileInfo").css("display", "");
    $('#dlg7').dialog('open').dialog('setTitle', '文件属性');
    var url_data = "Flag=GetFileInfo&EditFileID=" + id + "&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: url_data,
        dataType: 'text',
        async: false,
        success: function (msg) {
            $("#HidUploadFileID").val(id);
            var arry = msg.split('☆');
            $("#txtUploadFileName").val(arry[2]);
            $('#txtUploadFileOrder').numberbox('setValue', arry[5]);
            $("#HidUploadFileType").val(arry[3]);
            $("#HidUploadFileParaentID").val(arry[1]);
            $("#txtFileRemark1").val(arry[7]);
        }
    });
}

function HandleFile(id) {
    $("#table2").css("display", "");
    $("#txttd").css("display", "");
    $("#htmltd").css("display", "none");
    if (id == "") {
        $('#dlg2').dialog({ title: '新建文件', height: 400 });
        $("#ddlFolderType").val(".txt");
        $("#txtFileName").val("");
        $("#txtContent").val("");
        $('#txtFileOrder').numberbox('setValue', "");
        $("#contenttr").css("display", "");
        $("#txttd").css("display", "");
        $("#htmltd").css("display", "none");
        $("#selecttr").css("display", "none");
        $("#xtltr").css("display", "none");
        $("#HidEditFileID").val("");
    }
    else {
        $("#HidEditFileID").val(id);
        $('#dlg2').dialog('open').dialog('setTitle', '编辑文件');
        var url_data = "Flag=GetFileInfo&EditFileID=" + id + "&r=" + Math.floor(Math.random() * 1000);
        jQuery.ajax({
            type: "GET",
            url: "AJAX.ashx",
            data: url_data,
            dataType: 'text',
            async: false,
            success: function (msg) {
                var arry = msg.split('☆');
                $("#ddlFolderType").val(arry[3]);
                $("#HidFileStyle").val(arry[3]);
                $("#txtFileName").val(arry[2]);
                $('#txtFileOrder').numberbox('setValue', arry[5]);
                if (arry[3] == ".txt") {
                    $("#txttd").css("display", "");
                    $("#htmltd").css("display", "none");
                    $("#txtContent").val(arry[4]);
                }
                else {
                    $("#txttd").css("display", "none");
                    $("#htmltd").css("display", "");
                    editor.html(arry[4]);
                }
            }
        });
    }

    loadFiletree();

}

function changeFileStyle() {
    if ($("#HidFileStyle").val() == ".txt") {
        editor.html("");
    }
    else if ($("#HidFileStyle").val() == ".html") {
        $("#txtContent").val("");
    }
    if ($("#ddlFolderType").val() == ".txt") {
        $('#dlg2').dialog({ title: '新建文件', height: 400 });
        $("#contenttr").css("display", "");
        $("#txttd").css("display", "");
        $("#htmltd").css("display", "none");
        $("#selecttr").css("display", "none");
        $("#xtltr").css("display", "none");
    }
    else if ($("#ddlFolderType").val() == ".html") {
        $('#dlg2').dialog({ title: '新建文件', height: 400 });
        $("#contenttr").css("display", "");
        $("#selecttr").css("display", "none");
        $("#txttd").css("display", "none");
        $("#htmltd").css("display", "");
        $("#xtltr").css("display", "none");
    }
    else if ($("#ddlFolderType").val() == ".xtl") {
        $("#contenttr").css("display", "none");
        $("#xtltr").css("display", "");
        $('#dlg2').dialog({ title: '新建文件', height: 200 });
        $("#hid_workname").val("");
        $("#txtworkname").val("");
        $("#ddlxtlStyle").val("");
        $("#HidForm_Table").val("");
    }

}

//批量删除文件和文件夹
function BatchDel() {
    var fileids = "";
    var folderids = "";
    var rows = $('#tt').datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i]["Flag"] == "1") {
            folderids += rows[i]["ID"] + ",";
        }
        else if (rows[i]["Flag"] == "0") {
            fileids += rows[i]["ID"] + ",";
        }
    }
    if (fileids == "" && folderids == "") {
        jQuery.messager.alert("提示", "请至少选择一条数据", "info");
        return;
    }
    msg = '确认此删除操作？';
    jQuery.messager.confirm("提示", msg, function (r) {
        if (r) {
            var url_data = "FolderIDs=" + folderids + "&FileIDs=" + fileids + "&Flag=BacthDel&r=" + Math.floor(Math.random() * 1000);
            jQuery.ajax({
                type: "GET",
                url: "AJAX.ashx",
                data: url_data,
                dataType: 'text',
                async: false,
                success: function (msg) {
                    var arry = msg.split('☆');
                    if (arry[0] == "True") {
                        $('#tt').datagrid('reload');
                    }
                    for (var i = 1; i < arry.length; i++) {
                        if (arry[i] != "") {
                            window.parent.deleteTreeNode(arry[i], folderid);
                        }
                    }

                }
            });
        }
    });
}
//下载文件
function DownFile(id) {
    alert("99");
    $("#HidDownFileID").val(id);
    var url_data = "EditFileID=" + id + "&Flag=GetFileInfo&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: url_data,
        dataType: 'text',
        async: false,
        success: function (msg) {
            var arry = msg.split('☆');
            if (arry[6] == "0") {
                var url_data = "FileID=" + id + "&Flag=ExistDownFile&ff=ff&r=" + Math.floor(Math.random() * 1000);
                jQuery.ajax({
                    type: "GET",
                    url: "AJAX.ashx",
                    data: url_data,
                    dataType: 'text',
                    async: false,
                    success: function (msg) {
                        if (msg == "True") {
                            __doPostBack('LinkDown1', '');
                        }
                        else {
                            jQuery.messager.alert("提示", "您下载的文件不存在！", "info");
                            return;
                        }
                    }
                });

            }
            else if (arry[6] == "1") {
                __doPostBack('LinkDown2', '');
            }
        }
    });
}
//下载xtl文件
function DownXtlFile(id) {
    var url_data = "FileID=" + id + "&Flag=ExistXtlAttchMent&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: url_data,
        dataType: 'text',
        async: false,
        success: function (msg) {
            if (msg == "True") {
                __doPostBack('LinkDown1', '');
            }
            else {
                jQuery.messager.alert("提示", "该协同文件暂无附件!", "info");
                return;
            }
        }
    });
}
//HidDownFileID,HidDownFolder
function BatchDown() {
    var fileids = "";
    var folderids = "";
    var rows = $('#tt').datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i]["Flag"] == "1") {
            folderids += rows[i]["ID"] + ",";
        }
        else if (rows[i]["Flag"] == "0") {
            fileids += rows[i]["ID"] + ",";
        }
    }
    if (fileids == "" && folderids == "") {
        jQuery.messager.alert("提示", "请至少选择一条数据", "info");
        return;
    }
    $("#HidDownFileID").val(fileids);
    $("#HidDownFolder").val(folderids);
    __doPostBack("LinkBatchDown", "");
}
function BatchHandle(flag) {
    var fileids = "";
    var folderids = "";
    var rows = $('#tt').datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i]["Flag"] == "1") {
            folderids += rows[i]["ID"] + ",";
        }
        else if (rows[i]["Flag"] == "0") {
            fileids += rows[i]["ID"] + ",";
        }
    }
    if (fileids == "" && folderids == "") {
        jQuery.messager.alert("提示", "请至少选择一条数据", "info");
        return;
    }
    else {
        $("#HidMoveFileID").val(fileids);
        $("#HidMoveFolderID").val(folderids);
    }
    $('#dlg4').dialog('open').dialog('setTitle', '请选择目标位置');
    loadHandletree();
    $("#HidFlag").val(flag);
}

function Handle() {
    if ($("#HidFlag").val() == "copy") {
        if ($("#HidMoveTargetFolderID").val() == "") {
            jQuery.messager.alert("提示", "请选择目标目录", "info");
            return;
        }
        var codedata = "Flag=Copy&TargetID=" + $("#HidMoveTargetFolderID").val() + "&FileIDs=" + $("#HidMoveFileID").val() + "&FolderIDs=" + $("#HidMoveFolderID").val() + "&FolderType=" + FolderType + "&r=" + Math.floor(Math.random() * 1000);
        jQuery.ajax({
            type: "GET",
            url: "Ajax.ashx",
            data: codedata,
            dataType: 'text',
            async: false,
            success: function (msg) {
                if (msg == "True") {
                    if ($("#HidMoveTargetFolderID").val() == folderid) {
                        loadgrid(folderid, topfoldername, parentfolderid);
                    }
                    else {
                        jQuery.messager.alert("提示", "复制成功！", "info");
                    }
                    $("#dlg4").window('close');

                    window.parent.handlemove(folderid);
                }
            }
        });
    }
    else if ($("#HidFlag").val() == "move") {
        if ($("#HidMoveTargetFolderID").val() == "") {
            jQuery.messager.alert("提示", "请选择目标目录", "info");
            return;
        }
        else if ($("#HidMoveTargetFolderID").val() == folderid) {
            jQuery.messager.alert("提示", "所选文件已存在该目录下，移动失败！", "info");
            return;
        }
        var codedata = "Flag=Move&TargetID=" + $("#HidMoveTargetFolderID").val() + "&FileIDs=" + $("#HidMoveFileID").val() + "&FolderIDs=" + $("#HidMoveFolderID").val() + "&FolderType=" + FolderType + "&r=" + Math.floor(Math.random() * 1000);
        jQuery.ajax({
            type: "GET",
            url: "Ajax.ashx",
            data: codedata,
            dataType: 'text',
            async: false,
            success: function (msg) {
                if (msg == "True") {

                    $("#dlg4").window('close');
                    $('#tt').datagrid('reload');
                    window.parent.handlemove(folderid);
                }
                else {
                    jQuery.messager.alert("提示", "您选择的目录无效！", "info");
                    return;
                }
            }
        });

    }

}

function loadtxldata(wfid) {
    var s = "&WFID=" + wfid;
    var columns = [[//列表中展示的列   
                    {field: 'WorkName', title: '工作名称', width: 300, sortable: true },
                    { field: 'WFName', title: '工作流名称', width: 200, sortable: true, align: 'center' }
                ]];
    //查询数据
    var pms = { sortName: "", sortOrder: "" };
    $('#tt3').datagrid({
        striped: true, //即奇偶行使用不同背景色
        url: 'DataJosn.ashx?Flag=2' + s, //数据来源
        fit: true,
        remoteSort: true,
        fitColumns: true,
        queryParams: pms, //自定义参数：SortName是排序的字段名,SortOrder是排序的顺序
        columns: columns,
        rownumbers: true, //显示行号
        pagination: true, //显示分页栏
        pageNumber: '1',
        pageSize: '10',
        pageList: [10, 20, 30, 50, 100],
        singleSelect: true, //只允许选中一行                     
        onClickRow: function (rowIndex, rowData) {

            workid = rowData.WorkID;
            workname = rowData.WorkName;
            from_table = rowData.FormTable;
        },
        onDblClickRow: function (rowIndex, rowData) {
            workid = rowData.WorkID;
            workname = rowData.WorkName;
            from_table = rowData.FormTable
        }


    });
    SetMainStyle('dataMain9', 'tt3');
}
function selectxtlStyle() {
    if ($("#ddlxtlStyle").val() != "") {
        $('#dlg9').dialog('open').dialog('setTitle', '流程选择');
        $("#ddlWfName").val("");
        loadtxldata("");
    }
    else {
        jQuery.messager.alert("提示", "请先选择协同方式", "info");
        return;
    }

}

function SaveSelectwf() {
    $("#hid_workname").val(workid);
    $("#txtworkname").val(workname);
    $("#HidForm_Table").val(from_table);
    $('#dlg9').dialog('close');
}
//hid_workname、txtworkname、HidWorkID、HidForm_Table
function CleartxtlStyle() {

    $("#hid_workname").val("");
    $("#txtworkname").val("");
    $("#HidForm_Table").val("");
}
function changewfname() {
    var wfid = $("#ddlWfName").val();
    loadtxldata(wfid);
}

//下载文件
function DownFile(id) {
    $("#HidDownFileID").val(id);
    var url_data = "EditFileID=" + id + "&Flag=GetFileInfo&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: url_data,
        dataType: 'text',
        async: false,
        success: function (msg) {
            var arry = msg.split('☆');
            if (arry[6] == "0") {
                var url_data = "FileID=" + id + "&Flag=ExistDownFile&ff=ff&r=" + Math.floor(Math.random() * 1000);
                jQuery.ajax({
                    type: "GET",
                    url: "AJAX.ashx",
                    data: url_data,
                    dataType: 'text',
                    async: false,
                    success: function (msg) {
                        if (msg == "True") {
                            __doPostBack('LinkDown1', '');
                        }
                        else {
                            jQuery.messager.alert("提示", "您下载的文件不存在！", "info");
                            return;
                        }
                    }
                });

            }
            else if (arry[6] == "1") {
                __doPostBack('LinkDown2', '');
            }
        }
    });
}
//下载xtl文件
function DownXtlFile(id) {
    var url_data = "FileID=" + id + "&Flag=ExistXtlAttchMent&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: url_data,
        dataType: 'text',
        async: false,
        success: function (msg) {
            if (msg == "True") {
                __doPostBack('LinkDown1', '');
            }
            else {
                jQuery.messager.alert("提示", "该协同文件暂无附件!", "info");
                return;
            }
        }
    });
}
//HidDownFileID,HidDownFolder
function BatchDown() {
    var fileids = "";
    var folderids = "";
    var rows = $('#tt').datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i]["Flag"] == "1") {
            folderids += rows[i]["ID"] + ",";
        }
        else if (rows[i]["Flag"] == "0") {
            fileids += rows[i]["ID"] + ",";
        }
    }
    if (fileids == "" && folderids == "") {
        jQuery.messager.alert("提示", "请至少选择一条数据", "info");
        return;
    }
    $("#HidDownFileID").val(fileids);
    $("#HidDownFolder").val(folderids);
    __doPostBack("LinkBatchDown", "");
}
function BatchHandle(flag) {
    var fileids = "";
    var folderids = "";
    var rows = $('#tt').datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i]["Flag"] == "1") {
            folderids += rows[i]["ID"] + ",";
        }
        else if (rows[i]["Flag"] == "0") {
            fileids += rows[i]["ID"] + ",";
        }
    }
    if (fileids == "" && folderids == "") {
        jQuery.messager.alert("提示", "请至少选择一条数据", "info");
        return;
    }
    else {
        $("#HidMoveFileID").val(fileids);
        $("#HidMoveFolderID").val(folderids);
    }
    $('#dlg4').dialog('open').dialog('setTitle', '请选择目标位置');
    loadHandletree();
    $("#HidFlag").val(flag);
}

//添加权限
var f = ""; //代表的是那种权限
function AddPower(flag) {
    if (mark == "0") {
        $("#resetpower").css("display", "none");
    }
    else {
        $("#resetpower").css("display", "");
    }
    $(".orgAdd").css("display", "");
    $(".orgClear").css("display", "");
    $("#hid_txt_person").val("");
    $("#txt_person").val("");
    $("#hid_txt_dept").val("");
    $("#txt_dept").val("");
    $("#hid_txt_role").val("");
    $("#txt_role").val("");
    $("#addPowerdt").css("display", "");
    f = flag;
    if (flag == "Person") {
        $('#dlg6').dialog('open').dialog('setTitle', '人员权限分配');
        $("#persontr").css("display", "");
        $("#depttr").css("display", "none");
        $("#roletr").css("display", "none");
        $(".power").attr("Checked", false);
        $("#chxview").attr("Checked", true);
    }
    else if (flag == "Dept") {
        $('#dlg6').dialog('open').dialog('setTitle', '组织权限分配');
        $("#depttr").css("display", "");
        $("#persontr").css("display", "none");
        $("#roletr").css("display", "none");
        $(".power").attr("Checked", false);
        $("#chxview").attr("Checked", true);
    }
    else if (flag == "Role") {
        $('#dlg6').dialog('open').dialog('setTitle', '角色权限分配');
        $("#roletr").css("display", "");
        $("#persontr").css("display", "none");
        $("#depttr").css("display", "none");
        $(".power").attr("Checked", false);
        $("#chxview").attr("Checked", true);
    }
}
function loadHandletree() {
    $("#HidMoveTargetFolderID").val("");
    $('#tt1').tree({
        url: 'HandleTree.aspx?FolderID=' + TopFolderID + '&FolderType=' + FolderType,
        onClick: function (node) {
            if (node.attributes.isedit == "fasle") {

                jQuery.messager.alert("提示", "您对该文件夹没有此权限", "info");
                $("#HidMoveTargetFolderID").val("");
            }
            else {
                $("#HidMoveTargetFolderID").val(node.id);
            }
        }

    });

}
function setPower(id, flag) {
    $("#HidPowerFolderID").val("");
    $("#HidPowerFileID").val("");
    mark = flag;
    $('#dlg5').dialog('open').dialog('setTitle', '权限管理');
    $("#powerdt").css("display", "");
    if (flag == "1") {
        $("#HidPowerFolderID").val(id);
        $("#ampower").css("display", "");
    }
    else {
        $("#HidPowerFileID").val(id);
        $("#ampower").css("display", "none");
    }
    if (FolderType == '0') {
        $("#ampower").css("display", "none");
        $("#otherpower").css("display", "none");
    }
    var columns = [[
                { field: 'ck', checkbox: true, width: 50 },
                { field: 'RangeName', title: '成员名称', width: 80, sortable: true, formatter: function (value, rowData, rowIndex) { var d = '<a href="#" onclick="EditPower(\'' + rowData.Range + '\',\'' + rowData.RangeID + '\',\'' + rowData.RangeName + '\',\'' + rowData.Powers + '\')">' + rowData.RangeName + '</a>'; return d; } },
                { field: 'MemberType', title: '成员类型', width: 60, align: 'right' },
                { field: 'Powers', title: '权限', width: 120, align: 'left', sortable: true, nowrap: true }

            ]];
    var pms = { sortName: "", sortOrder: "" };
    if (flag == "1") {
        loaddata('tt2', 'DataJosn.ashx?Flag=3&FolderID=' + id, pms, true, true, columns, pageindex, pagesize);
    }
    else {
        loaddata('tt2', 'DataJosn.ashx?Flag=4&FileID=' + id, pms, true, true, columns, pageindex, pagesize);
    }
    SetMainStyle('rolemain', 'tt2');
}
var mark; //1代表文件夹，0代表文件
//编辑权限、查看权限
function EditPower(range, rangid, rangename, powers) {
    if (mark == "0") {
        $("#resetpower").css("display", "none");
    }
    else {
        $("#resetpower").css("display", "");
    }
    f = range;
    $("#addPowerdt").css("display", "");
    $(".orgAdd").css("display", "none");
    $(".orgClear").css("display", "none");
    if (powers.indexOf('管理') >= 0) {
        $(".power").each(function () {
            $(this).attr("Checked", "checked");
        });
    }
    else {
        $("#chxmanage").attr("Checked", false);
        if (powers.indexOf('访问') >= 0) {
            $("#chxview").attr("Checked", "checked");
        }
        else {
            $("#chxview").attr("Checked", false);
        }
        if (powers.indexOf('新增') >= 0) {
            $("#chxnew").attr("Checked", "checked");
        }
        else {
            $("#chxnew").attr("Checked", false);
        }
        if (powers.indexOf('修改') >= 0) {
            $("#chxedit").attr("Checked", "checked");
        }
        else {
            $("#chxedit").attr("Checked", false);
        }
        if (powers.indexOf('删除') >= 0) {
            $("#chxdel").attr("Checked", "checked");
        }
        else {
            $("#chxdel").attr("Checked", false);
        }
        if (powers.indexOf('复制') >= 0) {
            $("#checkcopy").attr("Checked", "checked");
        }
        else {
            $("#checkcopy").attr("Checked", false);
        }
        if (powers.indexOf('移动') >= 0) {
            $("#checkmove").attr("Checked", "checked");
        }
        else {
            $("#checkmove").attr("Checked", false);
        }
        if (powers.indexOf('下载') >= 0) {
            $("#chxdown").attr("Checked", "checked");
        }
        else {
            $("#chxdown").attr("Checked", false);
        }
        if (powers.indexOf('授权') >= 0) {
            $("#checkpower").attr("Checked", "checked");
        }
        else {
            $("#checkpower").attr("Checked", false);
        }
    }
    if (range == "Person") {
        $('#dlg6').dialog('open').dialog('setTitle', '人员权限分配');
        $("#txt_person").val(rangename);
        $("#hid_txt_person").val(rangid);
        $("#persontr").css("display", "");
        $("#depttr").css("display", "none");
        $("#roletr").css("display", "none");
    }
    else if (range == "Dept") {
        $('#dlg6').dialog('open').dialog('setTitle', '组织权限分配');
        $("#txt_dept").val(rangename);
        $("#hid_txt_dept").val(rangid);
        $("#depttr").css("display", "");
        $("#persontr").css("display", "none");
        $("#roletr").css("display", "none");
    }
    else if (range == "Role") {
        $('#dlg6').dialog('open').dialog('setTitle', '角色权限分配');
        $("#txt_role").val(rangename);
        $("#hid_txt_role").val(rangid);
        $("#roletr").css("display", "");
        $("#persontr").css("display", "none");
        $("#depttr").css("display", "none");
    }
}
//删除权限
function DelPower() {
    var RangeID = "";
    var Range = "";
    var rows = $('#tt2').datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        Range += rows[i]["Range"] + ",";
        RangeID += rows[i]["RangeID"] + ",";

    }
    if (Range == "" && RangeID == "") {
        jQuery.messager.alert("提示", "请至少选择一条数据", "info");
        return;
    }
    msg = '确认此删除操作？';
    jQuery.messager.confirm("提示", msg, function (r) {
        if (r) {
            var codedata = "Flag=DelPower&Range=" + Range + "&PowerFolderID=" + $("#HidPowerFolderID").val() + "&PowerFileID=" + $("#HidPowerFileID").val() + "&RangeID=" + RangeID + "&r=" + Math.floor(Math.random() * 1000);
            jQuery.ajax({
                type: "GET",
                url: "Ajax.ashx",
                data: codedata,
                dataType: 'text',
                async: false,
                success: function (msg) {
                    if (msg == "True") {
                        $('#tt2').datagrid('reload');
                    }
                }
            });
        }
    });
}
function setmanage() {
    if ($("#chxmange").attr("Checked") == "checked") {
        $(".power").attr("Checked", true);
    }
    else {

        $(".power").attr("Checked", false);
    }
}
function View(id, type, topfolderid) {
    if (type == "文件夹") {
        window.parent.selectnode(id, topfolderid);
        window.parent.changeruth(id);
        var codedata = "Flag=GetFolderInfo&FolderID=" + id + "&r=" + Math.floor(Math.random() * 1000);
        jQuery.ajax({
            type: "GET",
            url: "AJAX.ashx",
            data: codedata,
            dataType: 'text',
            async: false,
            success: function (msg1) {
                var arry = msg1.split('☆');
                loadgrid(id, arry[0], arry[3]);
            }
        });
    }

}
//返回首页
function GoFirstPage() {
    window.parent.selectnode(TopFolderID, TopFolderID);
    window.parent.changeruth(TopFolderID);
    loadgrid(TopFolderID, '', '');

}
//保存权限
function SavePower() {
    if (f == "Person") {
        if ($("#txt_person").val() == "") {
            jQuery.messager.alert("提示", "人员不能为空!", "info");
            return;
        }
    }
    else if (f == "Dept") {
        if ($("#txt_dept").val() == "") {
            jQuery.messager.alert("提示", "组织不能为空!", "info");
            return;
        }
    }
    else if (f == "Role") {
        if ($("#txt_role").val() == "") {
            jQuery.messager.alert("提示", "角色不能为空!", "info");
            return;
        }
    }
    var nextFolder = "";
    var s = "";
    var range = "";
    var rangename = "";
    if ($("#chxmange").attr("Checked") == "checked") {
        s = "Manage☆";
    }
    else {
        $(".power").not($("#chxmange")).each(function () {
            if ($(this).attr("Checked") == "checked") {
                s += $(this).val() + "☆";
            }
        });
    }
    if (!(s.indexOf('View') >= 0) && s != "Manage☆" && s != "") {
        s = "View☆" + s;
    }
    if (s == "") {
        jQuery.messager.alert("提示", "请勾选要分配的权限", "info");
        return;
    }
    s = s.substr(0, s.length - 1);
    if (f == "Person") {
        range = $("#hid_txt_person").val();
        rangename = $("#txt_person").val();
    }
    else if (f == "Dept") {
        range = $("#hid_txt_dept").val();
        rangename = $("#txt_dept").val();
    }
    else if (f == "Role") {
        range = $("#hid_txt_role").val();
        rangename = $("#txt_role").val();
    }
    if ($("#chxnext").attr("Checked") == "checked") {
        nextFolder = "True";
    }
    else {
        nextFolder = "False";
    }
    if (mark == "1") {
        var codedata = "Flag=AddPower&PowerType=" + f + "&nextFolder=" + nextFolder + "&PowerFolderID=" + $("#HidPowerFolderID").val() + "&WhatPower=" + encodeURI(s) + "&Range=" + range + "&RangeName=" + encodeURI(rangename) + "&FolderType=" + FolderType + "&r=" + Math.floor(Math.random() * 1000);
        jQuery.ajax({
            type: "GET",
            url: "Ajax.ashx",
            data: codedata,
            dataType: 'text',
            async: false,
            success: function (msg) {
                if (msg == "True") {
                    $('#dlg6').window('close');
                    $('#tt2').datagrid('reload');
                }
            }
        });
    }
    else {
        var codedata = "Flag=HandleFilePower&PowerType=" + f + "&PowerFileID=" + $("#HidPowerFileID").val() + "&WhatPower=" + encodeURI(s) + "&Range=" + range + "&RangeName=" + encodeURI(rangename) + "&FolderType=" + FolderType + "&r=" + Math.floor(Math.random() * 1000);
        jQuery.ajax({
            type: "GET",
            url: "Ajax.ashx",
            data: codedata,
            dataType: 'text',
            async: false,
            success: function (msg) {
                if (msg == "True") {
                    $('#dlg6').window('close');
                    $('#tt2').datagrid('reload');
                }
            }
        });
    }
}
function Handle() {
    if ($("#HidFlag").val() == "copy") {
        if ($("#HidMoveTargetFolderID").val() == "") {
            jQuery.messager.alert("提示", "请选择目标目录", "info");
            return;
        }
        var codedata = "Flag=Copy&TargetID=" + $("#HidMoveTargetFolderID").val() + "&FileIDs=" + $("#HidMoveFileID").val() + "&FolderIDs=" + $("#HidMoveFolderID").val() + "&FolderType=" + FolderType + "&r=" + Math.floor(Math.random() * 1000);
        jQuery.ajax({
            type: "GET",
            url: "Ajax.ashx",
            data: codedata,
            dataType: 'text',
            async: false,
            success: function (msg) {
                if (msg == "True") {
                    if ($("#HidMoveTargetFolderID").val() == folderid) {
                        loadgrid(folderid, topfoldername, parentfolderid);
                    }
                    else {
                        jQuery.messager.alert("提示", "复制成功！", "info");
                    }
                    $("#dlg4").window('close');

                    window.parent.handlemove(folderid);
                }
            }
        });
    }
    else if ($("#HidFlag").val() == "move") {
        if ($("#HidMoveTargetFolderID").val() == "") {
            jQuery.messager.alert("提示", "请选择目标目录", "info");
            return;
        }
        else if ($("#HidMoveTargetFolderID").val() == folderid) {
            jQuery.messager.alert("提示", "所选文件已存在该目录下，移动失败！", "info");
            return;
        }
        var codedata = "Flag=Move&TargetID=" + $("#HidMoveTargetFolderID").val() + "&FileIDs=" + $("#HidMoveFileID").val() + "&FolderIDs=" + $("#HidMoveFolderID").val() + "&FolderType=" + FolderType + "&r=" + Math.floor(Math.random() * 1000);
        jQuery.ajax({
            type: "GET",
            url: "Ajax.ashx",
            data: codedata,
            dataType: 'text',
            async: false,
            success: function (msg) {
                if (msg == "True") {
                    $("#dlg4").window('close');
                    $('#tt').datagrid('reload');
                    window.parent.handlemove(folderid);
                }
                else {
                    jQuery.messager.alert("提示", "您选择的目录无效！", "info");
                    return;
                }
            }
        });
    }
}
//新增和修改文件
function saveFile() {
    if ($("#ddlFolderType").val() == ".html") {
        editor.sync();
        if (editor.count('text') == 0) {
            jQuery.messager.alert("提示", "文件内容不能为空！", "info");
            return false;
        }
    }
    else if ($("#ddlFolderType").val() == ".txt") {
        if ($("#txtContent").val() == "") {
            jQuery.messager.alert("提示", "文件内容不能为空！", "info");
            return false;
        }
    }
    if (!jQuery('#dlg2').form("validate"))
        return false;
    var url_data = "";
    if ($("#ddlFolderType").val() == ".xtl") {
        url_data = "Flag=ExistxtlFile&BusinessType=" + $("#ddlxtlStyle").val() + "&FileName=" + encodeURI($("#txtFileName").val()) + "&ParaentFolderID=" + $("#HidEditFileParaentID").val() + "&BusinessType=" + $("#ddlxtlStyle").val() + "&EditFileID=" + $("#HidEditFileID").val() + "&r=" + Math.floor(Math.random() * 1000);
    }
    else {
        url_data = "Flag=ExistFile&FileType=" + $("#ddlFolderType").val() + "&FileName=" + encodeURI($("#txtFileName").val()) + "&ParaentFolderID=" + $("#HidEditFileParaentID").val() + "&EditFileID=" + $("#HidEditFileID").val() + "&r=" + Math.floor(Math.random() * 1000);
    }
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: url_data,
        dataType: 'text',
        async: false,
        success: function (msg) {
            if (msg == "True") {
                jQuery.messager.alert("提示", "该文件在该目录下已存在", "info");

            }
            else {
                var content = "";
                if ($("#ddlFolderType").val() == ".txt") {
                    content = $("#txtContent").val();
                }
                else {
                    content = $("#txthtmlContent").val();
                }
                var codedata = "";
                if ($("#ddlFolderType").val() == ".xtl") {
                    codedata = "Flag=HandleXtlFile&BusinessType=" + $("#ddlxtlStyle").val() + "&FileName=" + encodeURI($("#txtFileName").val()) + "&ParaentFolderID=" + $("#HidEditFileParaentID").val() + "&BusinessType=" + $("#ddlxtlStyle").val() + "&BusinessTable=" + $("#HidForm_Table").val() + "&BusinessKey=" + $("#hid_workname").val() + "&EditFileID=" + $("#HidEditFileID").val() + "&r=" + Math.floor(Math.random() * 1000);
                }
                else {
                    codedata = "Flag=HandleFile&FolderType=" + FolderType + "&EditFileID=" + $("#HidEditFileID").val() + "&FileType=" + $("#ddlFolderType").val() + "&ParaentFolderID=" + $("#HidEditFileParaentID").val() + "&FileName=" + encodeURI($("#txtFileName").val()) + "&Content=" + encodeURI(content) + "&Order=" + $('#txtFileOrder').numberbox('getValue') + "&r=" + Math.floor(Math.random() * 1000);
                }
                jQuery.ajax({
                    type: "GET",
                    url: "AJAX.ashx",
                    data: codedata,
                    dataType: 'text',
                    async: false,
                    success: function (msg1) {
                        if (msg1 == "True") {
                            $('#dlg2').dialog('close');
                            $('#tt').datagrid('reload');

                        }
                    }
                });
            }
        }
    });
}
function loadFiletree() {
    $('#txtParaentFolder').combotree({
        url: 'HandleTree.aspx?FolderID=' + TopFolderID + '&FolderType=' + FolderType,
        onClick: function (node) {
            $("#HidEditFileParaentID").val(node.id);
        }

    });
    $('#txtParaentFolder').combotree('setValue', folderid);
    $("#HidEditFileParaentID").val(folderid);
    if (FolderType == "1") {

        if (IsSuper == "False") {
            $('#txtParaentFolder').combotree("disable");
        }
    }
}
function SaveUploadFile() {
    if (!jQuery('#dlg7').form("validate"))
        return false;
    var url_data = "Flag=ExistFile&FileType=" + $("#HidUploadFileType").val() + "&FileName=" + encodeURI($("#txtUploadFileName").val()) + "&ParaentFolderID=" + $("#HidUploadFileParaentID").val() + "&EditFileID=" + $("#HidUploadFileID").val() + "&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: url_data,
        dataType: 'text',
        async: false,
        success: function (msg) {
            if (msg == "True") {
                jQuery.messager.alert("提示", "该文件在该目录下已存在", "info");

            }
            else {
                var url_data = "Flag=EditUploadFile&FolderType=" + FolderType + "&FileType=" + $("#HidUploadFileType").val() + "&FileName=" + encodeURI($("#txtUploadFileName").val()) + "&Order=" + $("#txtUploadFileOrder").val() + "&EditFileID=" + $("#HidUploadFileID").val() + "&ParentID=" + $("#HidUploadFileParaentID").val() + "&Remark=" + encodeURI($.trim($("#txtFileRemark1").val())) + "&r=" + Math.floor(Math.random() * 1000);
                jQuery.ajax({
                    type: "GET",
                    url: "AJAX.ashx",
                    data: url_data,
                    dataType: 'text',
                    async: false,
                    success: function (msg) {
                        if (msg == "True") {
                            $('#dlg7').dialog('close');
                            $('#tt').datagrid('reload');
                        }
                    }
                });
            }
        }
    });
}

function ChangeRuth() {
    $("#ruth", parent.document).text();
}
function loadFoldertree() {
    var s = "";
    if (FolderType == "1") {
        s = "&Flag=AddFolder";
    }
    $('#txtparaentfoldername').combotree({
        url: 'HandleTree.aspx?FolderID=' + TopFolderID + '&FolderType=' + FolderType + s,
        onClick: function (node) {
            $("#HidEditFolderParaentID").val(node.id);
        }
    });
    $('#txtparaentfoldername').combotree('setValue', folderid);
    $("#HidEditFolderParaentID").val(folderid);
    if (FolderType == "1") {

        if (IsSuper == "False") {
            $('#txtparaentfoldername').combotree("disable");
        }
    }
}



//保存修改文件夹操作
function SaveFolder() {
    if (!jQuery('#dlg').form("validate"))
        return false;
    if ($("#HidEditFolderParaentID").val() == $("#HidEditFolderID").val()) {
        jQuery.messager.alert("提示", "您选择的上级目录无效", "info");
        return false;
    }
    var codedata = "Flag=ExistFolder&FlagID=" + TopFolderID + "&ParaentID=" + $("#HidEditFolderParaentID").val() + "&FolderName=" + encodeURI($.trim($("#txtfoldername").val())) + "&EditFolderID=" + $("#HidEditFolderID").val() + "&FolderType=" + FolderType + "&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: codedata,
        dataType: 'text',
        async: false,
        success: function (msg1) {
            if (msg1 == "True") {
                jQuery.messager.alert("提示", "当前目录下已存在相同文件夹名称！", "info");
            }
            else {

                var codedata = "Flag=ChangeFolder&FolderType=" + FolderType + "&FlagID=" + TopFolderID + "&ParaentID=" + $("#HidEditFolderParaentID").val() + "&FolderName=" + encodeURI($.trim($("#txtfoldername").val().replaceAll("&", "%26"))) + "&ID=" + $("#HidEditFolderID").val() + "&Order=" + $("#txtfolderorder").val() + "&Remark=" + encodeURI($.trim($("#txtRemark").val()).replaceAll("&", "%26")) + "&r=" + Math.floor(Math.random() * 1000);
                jQuery.ajax({
                    type: "GET",
                    url: "Ajax.ashx",
                    data: codedata,
                    dataType: 'text',
                    async: false,
                    success: function (msg1) {
                        var arry = msg1.split('☆');
                        if (arry[0] == "True") {
                            $('#dlg').window('close');
                            if ($("#HidEditFolderID").val() == "") {

                                window.parent.addTreeNode(arry[1], arry[2], arry[3]);
                            }
                            else {

                                window.parent.updateTreeNode($.trim($("#txtfoldername").val()), $("#HidEditFolderID").val(), folderid);
                            }
                            $('#tt').datagrid('reload');
                        }
                        else {
                            jQuery.messager.alert("提示", arry[1], "info");
                        }

                    }
                });
            }
        }
    });
}
function Goback() {

    var pfid = parentfolderid;
    if (pfid.indexOf('T') >= 0) {
        pfid = pfid.substring(1);
    }
    var codedata = "Flag=GetFolderInfo&FolderID=" + pfid + "&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: codedata,
        dataType: 'text',
        async: false,
        success: function (msg1) {
            var arry = msg1.split('☆');

            window.parent.selectnode(pfid, TopFolderID);
            window.parent.changeruth(pfid);
            loadgrid(pfid, arry[0], arry[3]);
        }
    });

}

      
       
     




