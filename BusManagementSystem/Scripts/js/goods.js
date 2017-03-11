function SelectGoodsSingle(id, name,num, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    $.dialog.open('/Office/OfficeSupplies/SelectGoods.aspx', {
        title: '选择办公用品',
        width: "830px",
        height: "410px",
        lock: true,
        padding:0,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var goods_id = document.getElementById(id).value;
            var goods_name = document.getElementById(name).value;
            var goods_num = document.getElementById(num).value;
            iframe.document.getElementById("hidid").value = goods_id;
            iframe.document.getElementById("hidname").value = goods_name;
            iframe.document.getElementById("hidnum").value = goods_num;
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
            var strnum = iframe.document.getElementById('hidnum').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            strnum = strnum.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            document.getElementById(num).value = strnum;
            //成功选部门后是否需要回调
            if (iscallback == true)
                SelectDeptSingleCallBack();
        },
        cancel: true
    });
}
function SelectGoodsSingle2(id, name, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    $.dialog.open('/Office/OfficeSupplies/SelectGoods2.aspx', {
        title: '选择办公用品',
        width: "830px",
        height: "410px",
        lock: true,
        padding: 0,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var goods_id = document.getElementById(id).value;
            var goods_name = document.getElementById(name).value;
            iframe.document.getElementById("hidid").value = goods_id;
            iframe.document.getElementById("hidname").value = goods_name;
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
function SelectGoodsSingle3(id, name, num, iscallback) {
    $.dialog({
        id: 'forzindex',
        zIndex: 9999,
        show: false
    });
    $.dialog.open('/Office/OfficeSupplies/SelectGoods2.aspx', {
        title: '选择办公用品',
        width: "830px",
        height: "410px",
        lock: true,
        padding: 0,
        background: "#ECECEC",
        // 在open()方法中，init会等待iframe加载完毕后执行
        init: function () {
            var iframe = this.iframe.contentWindow;
            if (iframe.length == "") {
                return false;
            }
            var top = art.dialog.top; // 引用顶层页面window对象
            var goods_id = document.getElementById(id).value;
            var goods_name = document.getElementById(name).value;
            var goods_num = document.getElementById(num).value;
            iframe.document.getElementById("hidid").value = goods_id;
            iframe.document.getElementById("hidname").value = goods_name;
            iframe.document.getElementById("hidnum").value = goods_num;
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
            var strnum = iframe.document.getElementById('hidnum').value;
            strname = strname.replace(/,+$/, "");
            strid = strid.replace(/,+$/, "");
            strnum = strnum.replace(/,+$/, "");
            document.getElementById(name).value = strname;
            document.getElementById(id).value = strid;
            document.getElementById(num).value = strnum;
            //成功选部门后是否需要回调
            if (iscallback == true)
                SelectDeptSingleCallBack();
        },
        cancel: true
    });
}