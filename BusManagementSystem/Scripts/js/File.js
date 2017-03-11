var workid;
var workname;
var from_table;
String.prototype.replaceAll = function (s1, s2) { return this.replace(new RegExp(s1, "gm"), s2); }

function getspace(id) {
    var codedata = "Flag=GetSpace&FolderID=" + id + "&r=" + Math.floor(Math.random() * 1000);
    jQuery.ajax({
        type: "GET",
        url: "AJAX.ashx",
        data: codedata,
        dataType: 'text',
        async: false,
        success: function (msg1) {
            var arry = msg1.split('&');
            UsedFolderSpace = parseInt(arry[0]);
            FolderTotalSpace = parseInt(arry[1]);
        }
    });
}



function TurnSize(space, type) {
    if (type != "文件夹") {
        if (space == "") {
            return '0';
        }
        else {
            var s = parseInt(space);
            if (s < 1024) {
                return s.toString() + 'bytes';
            }
            else if (s < 1024 * 1024) {
                return parseFloat(s / 1024).toFixed(2) + "KB";
            }
            else if (s < 1024 * 1024 * 1024) {
                return parseFloat(s / (1024 * 1024)).toFixed(2) + "M";
            }

        }
    }
}



function doSearch() {
    if ($("#txtAutoSearch").searchbox('getName') == "common") {
        $("#HidSearchType").val($("#txtAutoSearch").searchbox('getName'))
        loadgrid(folderid, topfoldername, parentfolderid);
    }
    else {
        window.parent.selectnode(TopFolderID, TopFolderID);
        window.parent.changeruth(TopFolderID);
        window.parent.SetFalg();
        location.href = "AllSearchList.aspx?txtAutoSearch=" + $("#txtAutoSearch").searchbox('getValue') + "&TopFolderID=" + TopFolderID + "&FolderID=" + folderid + "&FolderType=" + FolderType;
    }
}
function ClearSearch() {
    $('#txtAutoSearch').searchbox('setValue', '');
}


     




