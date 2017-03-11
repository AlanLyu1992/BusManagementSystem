
/**
* vinSwfUpload
* 
* @author wandalong
* @date 2011-05-11
* @version 1.0.0
*/
var yxuploadURL = '/swf/upload';
var i = 1;
var j = 1;
var tempfilename = "";
var tempfilename1 = "";
var guid = "";
window.VinSWFUploadGlobalCount = 1;
(function ($) {

    $.uiwidget = $.uiwidget || {};
    $.uiwidget.VinSWFUpload = function (target, cfg) {

        $.extend(this, cfg);
        this.vinSwfUpload = target;
        this.vinSwfUpload.css("overflow", "hidden");
        this.index = window.VinSWFUploadGlobalCount++;
        this.init();
        this.initSkin();
        this.initItems();
        this.render();
        this.swfUpload = this.initSWFUpload();
    };

    $.uiwidget.VinSWFUpload.prototype = {
        width: 500,
        heigth: 100,
        uploadURL: yxuploadURL,
        flashURL: "SWFUpload.swf",
        flash9URL: "SWFUpload_f9.swf",
        hideUploadBt: true,
        hideStopBt: true,
        hideDeleteSelectBt: true,
        hideDeleteAllBt: true,
        addImgURl: "images/add.gif",
        uploadImgURl: "images/upload.png",
        stopImgURl: "images/stop.png",
        deleteImgURl: "images/trash.gif",
        tipImgURl: "images/tip.gif",
        fileLimit: 0,
        maxSize: '-1', //1M
        sizeUnit: "Byte", //选择的文件最终显示的计量结果单位
        sizeFixed: 2,
        fileType: "*.*",
        autoRemove: false,
        autoRemoveStoped: false,
        skin: "gray",
        progressStyle: "progressBar", //progressBar,percent
        Constant: {
            UPLOAD_SUCCESS: 1, //成功
            UPLOAD_FAILED: 0, //失败
            UNKONW_EXCEPTION: -1, //未知异常
            HTTP_ERROR: -2,
            MISSING_UPLOAD_URL: -3,
            IO_ERROR: -4,
            UPLOAD_LIMIT_EXCEEDED: -5,
            SPECIFIED_FILE_ID_NOT_FOUND: -6,
            FILE_VALIDATION_FAILED: -7,
            FILE_OVERSETSIZE: -8, //超出上传最大尺寸限制
            FILE_CANCELLED: -9, //取消上传
            UPLOAD_STOPPED: -10, //停止上传
            RESIZE: -11,
            SECURITY_ERROR: -12
        },
        init: function () {
            var ctx = this;
            ctx.tip = '组件加载中，请稍后...';
            ctx.tools = [];
            ctx.toolIds = [];
            ctx.fileCount = 0;
            ctx.fileIds = [];
            ctx.scrollTop = 0;
            ctx.coefficient = 1;
            ctx.msgKey = 1;
            //1T=1024G,1G=1024M,1M=1024K,1K=1024Byte
            var uit = $.trim(ctx.sizeUnit);
            if (uit == 'K') {
                ctx.coefficient = 1;
            } else if (uit == 'M') {
                ctx.coefficient = 1024;
            } else if (uit == 'G') {
                ctx.coefficient = 1024 * 1024;
            } else if (uit == 'T') {
                ctx.coefficient = 1024 * 1024 * 1024;
            }

            if ($.trim(ctx.maxSize) == '-1') {
                ctx.maxSize = ctx.coefficient * 10;
            }

            String.prototype.realLength = function () {
                return this.replace(/[^\x00-\xff]/ig, "**").length;
            };
            Array.prototype.replace = function (i, value) {
                this[i] = value;
            };
        },
        initSkin: function () {
            var ctx = this;
            var skins = ["gray", "black", "blue", "green", "orange", "purple", "red"];
            var sk = (ctx.skin || "gray").toLowerCase();
            if (sk == skins[0]) {
                ctx.skin = " skin-gray";
            } else if (sk == skins[1]) {
                ctx.skin = " skin-black";
            } else if (sk == skins[2]) {
                ctx.skin = " skin-blue";
            } else if (sk == skins[3]) {
                ctx.skin = " skin-green";
            } else if (sk == skins[4]) {
                ctx.skin = " skin-orange";
            } else if (sk == skins[5]) {
                ctx.skin = " skin-purple";
            } else if (sk == skins[6]) {
                ctx.skin = " skin-red";
            }
        },
        swfUploadPreLoad: function () {
            var ctx = this.customSettings.scope_handler;
            ctx.openWin('all');
        },
        swfUploadLoaded: function () {
            var ctx = this.customSettings.scope_handler;
            ctx.closeWin();
        },
        swfUploadLoadFailed: function () {
            var ctx = this.customSettings.scope_handler;
            ctx.closeWin();
        },
        onDialogStart: function (file) {
            var ctx = this.customSettings.scope_handler;
        },
        //参数:file文件对象
        onFileQueued: function (file) {
//                       if(tempfilename.indexOf(file.name)>=0)
//        {alert("当前文件已选择");}
//        else{
//        tempfilename+=file.name+",";
            var ctx = this.customSettings.scope_handler;
            ctx.fileIds.push(file.id + "_" + ctx.index);

            ctx.addUI(file);
           // }
        },
        //参数:file文件对象、错误码、从flash中返回的错误信息
        onUploadError: function (file, errorCode, message) {
            //alert("onUploadError");
            //恢复上传按钮事件和效果
            var ctx = this.customSettings.scope_handler;
            //设置了移除为false的时候修改上传进度和状态
            if (!ctx.autoRemove) {
                if (ctx.autoRemoveStoped) {
                    var currentLine = ctx.getCurrentLine(file);
                    var file_id = currentLine.attr("fileId");
                    ctx.cancelFileUpload(file_id);
                    currentLine.remove();
                } else {
                    switch (Number(errorCode)) {
                        case -200: 
                            {
                                ctx.msgKey = ctx.Constant.HTTP_ERROR;
                            } break;
                        case -210: 
                            {
                                ctx.msgKey = ctx.Constant.MISSING_UPLOAD_URL;
                            } break;
                        case -220: 
                            {
                                ctx.msgKey = ctx.Constant.IO_ERROR;
                            } break;
                        case -230: 
                            {
                                ctx.msgKey = ctx.Constant.SECURITY_ERROR;
                            } break;
                        case -240: 
                            {
                                ctx.msgKey = ctx.Constant.UPLOAD_LIMIT_EXCEEDED;
                            } break;
                        case -250: 
                            {
                                ctx.msgKey = ctx.Constant.UPLOAD_FAILED;
                            } break;
                        case -260: 
                            {
                                ctx.msgKey = ctx.Constant.SPECIFIED_FILE_ID_NOT_FOUND;
                            } break;
                        case -270: 
                            {
                                ctx.msgKey = ctx.Constant.FILE_VALIDATION_FAILED;
                            } break;
                        case -280: 
                            {
                                ctx.msgKey = ctx.Constant.FILE_CANCELLED;
                            } break;
                        case -290: 
                            {
                                ctx.msgKey = ctx.Constant.UPLOAD_STOPPED;
                            } break;
                        case -300: 
                            {
                                ctx.msgKey = ctx.Constant.RESIZE;
                            } break;
                    }
                }
            }
        },
        //参数:file文件对象、服务器返回的数据、服务器是否有返回数据
        onUploadSuccess: function (file, serverData) {

            var ctx = this.customSettings.scope_handler;
            //上传成功但不代表文件已经写到服务器，所以根据自定义的还回key来做是否成功的表示
            if (ctx.Constant.UPLOAD_SUCCESS == Number(serverData)) {//成功
                ctx.msgKey = ctx.Constant.UPLOAD_SUCCESS;
            } else if (ctx.Constant.UPLOAD_FAILED == Number(serverData)) {//失败
                ctx.msgKey = ctx.Constant.UPLOAD_FAILED;
            } else if (ctx.Constant.FILE_OVERSETSIZE == Number(serverData)) {//超出上传最大尺寸限制 
                ctx.msgKey = ctx.Constant.FILE_OVERSETSIZE;
            } else if (ctx.Constant.IO_ERROR == Number(serverData)) {//未知的异常
                ctx.msgKey = ctx.Constant.IO_ERROR;
            } else if (ctx.Constant.UNKONW_EXCEPTION == Number(serverData)) {//未知的异常
                ctx.msgKey = ctx.Constant.UNKONW_EXCEPTION;
            }
        },
        //参数:file文件对象
        onUploadComplete: function (file) {
            //alert("onUploadComplete");
                 var type;
            var name;
            var names;
            var ctx = this.customSettings.scope_handler;
            if (!ctx.autoRemove) {


                document.getElementById("ADDAttachmentShow").innerHTML += "<div id=\"" + file.name+i+ "\">" + file.name + "&nbsp;&nbsp;<a href=\"#\" onclick=\"delAttach('" +  file.name+i + "','"+guid+"')\">删除</a></div>"
                document.getElementById("ADDAttachmenttr").style.display = "";
                i++;
                if (ctx.autoRemoveStoped) {
                    var currentLine = ctx.getCurrentLine(file);
                    var file_id = currentLine.attr("fileId");
                    ctx.cancelFileUpload(file_id);
                    currentLine.remove();
                } else {
                    ctx.resetFileStateMsg(file);
                }
            }
            if (file.filestatus == -4) {
                if (ctx.autoRemove) {
                    //将上传完成的一行移除掉
                    ctx.deleteFinished(file);
                } else {
                    ctx.scrollTop += 20;
                    ctx.modifyFinished(file);
                }
                if (ctx.getFilesQueuedSize() > 0 && ctx.isUploadStopped() == false) {
                    this.startUpload();
                } else {
                    ctx.swfUpload.uploadStopped = false;
                    ctx.disposeBindEvent('finished');
                    ctx.closeWin();
                    document.getElementById("ADDAttachment").innerHTML = "继续添加";
                   
                    $("#dlg3").window('close');
                    $('#tt').datagrid('reload');
                }
            }
            ctx.msgKey = 1;
        },
        //参数:file文件对象、错误码、从flash中返回的错误信息
        onFileError: function (file, n) {
            switch (n) {
                case -100: jQuery.messager.alert('提示', '待上传文件列表数量超限，不能选择！', 'info');
                    break;
                case -110: jQuery.messager.alert('提示', '文件太大，不能选择！', 'info');
                    break;
                case -120: jQuery.messager.alert('提示', '该文件大小为0，不能选择！', 'info');
                    break;
                case -130: jQuery.messager.alert('提示', '该文件类型不可以上传！', 'info');
                    break;
            }
        },
        //参数:选择文件的数量、加入了文件队列的文件数量、在当前文件队列总共的文件数量
        onDiaogComplete: function () {
        },
        queueComplete: function () {

        },
        //参数:file文件对象
        onUploadStart: function (file) {
        var guid1="";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      guid1 +=   n;
      if((i==8)||(i==12)||(i==16)||(i==20))
        guid1 += "-";
    }
    guid=guid1;
            var type;
            var name;
          uploadurl = yxuploadURL + "&FalgeGuid=" + guid;
            //alert("onUploadStart");
            
            var ctx = this.customSettings.scope_handler;
            ctx.swfUpload.setUploadURL(uploadurl); //
            var post_params = this.settings.post_params;
            this.setPostParams(post_params);
            //启动上传的时候改变列表中的信息
            if (!ctx.autoRemove) {
                //ctx.resetFileStateMsg(file);
            }
//        }
        },
        //参数:file文件对象、已经上传的字节数、总共要上传的字节数
        onUploadProgress: function (file, bytesComplete, totalBytes) {//处理进度条
            var ctx = this.customSettings.scope_handler;
            //计算上传的百分比
            var percent = Math.ceil((bytesComplete / totalBytes) * 100);
            percent = percent == 100 ? 100 : percent;
            ctx.resetFileRate(file, percent);
            ctx.resetFileStateMsg(file);
        },
        cancelFileUpload: function (file_id) {

            var ctx = this;
            ctx.swfUpload.cancelUpload(file_id, false);
        },
        getProBarStyle: function () {
            return this.progressStyle || "percent";
        },
        //上传进度信息归零
        zeroFileRate: function (file) {
            var ctx = this;
            var psty = ctx.getProBarStyle();
            if ("percent" == psty) {
                var file_rate = ctx.getCurrentOptRate(file);
                file_rate.empty();
                file_rate.append(0 + "%");
                file_rate.attr("title", 0 + "%");
            } else if ("progressBar" == psty) {
                var pb_text = ctx.getCurrentProBarText(file);
                var pb_value = ctx.getCurrentProBarVal(file);
                pb_text.empty();
                pb_text.append(0 + "%");
                pb_value.css("width", 0 + "%");
            }
        },
        //重置上传进度信息
        resetFileRate: function (file, percent) {
            var ctx = this;
            var psty = ctx.getProBarStyle();
            if ("percent" == psty) {
                var file_rate = ctx.getCurrentOptRate(file);
                file_rate.empty();
                file_rate.append(percent + "%");
                file_rate.attr("title", percent + "%");
            } else if ("progressBar" == psty) {
                var pb_text = ctx.getCurrentProBarText(file);
                var pb_value = ctx.getCurrentProBarVal(file);
                pb_text.empty();
                pb_text.append(percent + "%");
                pb_value.css("width", percent + "%");
            }
        },
        //重置上传状态信息(主要根据文件上传状态调整)
        resetFileStateMsg2: function (file, state_msg) {
            var ctx = this;
            var file_state = ctx.getCurrentOptState(file);
            file_state.empty();
            if (state_msg && state_msg != null) {
                file_state.append(state_msg);
                file_state.attr("title", state_msg);
            } else {
                var stStr = ctx.getChangedState(file);
                file_state.append(stStr);
                file_state.attr("title", stStr);
            }
        },
        //重置上传状态信息
        resetFileStateMsg: function (file) {
            var ctx = this;
            var psty = ctx.getProBarStyle();
            //重置上传状态信息(主要根据文件上传状态调整)
            ctx.resetFileStateMsg2(file, null);
            //对设置完状态后进行一些修正处理
            var currentLine = ctx.getCurrentLine(file);
            var file_state = ctx.getCurrentOptState(file);
            var state = file.filestatus;
            var value = 0;
            if ("percent" == psty) {
                var percentStr = String($.trim(ctx.getCurrentOptRate(file).text()));
                value = percentStr.substring(0, percentStr.length - 1);
            } else if ("progressBar" == psty) {
                var percentStr = String($.trim(ctx.getCurrentProBarText(file).text()));
                value = percentStr.substring(0, percentStr.length - 1);
            }
            //alert("value:"+value+"state:"+state);
            //alert((Number(value)>0&&Number(value)<100)&&(state==-1||state==-3||state==-5));
            //统一修改百分比和进度条两种情况的状态信息
            /*UPLOAD_SUCCESS 					:1,//成功
            UPLOAD_FAILED                   :0,//失败
            UNKONW_EXCEPTION				:-1,//未知异常
            HTTP_ERROR                      :-2,
            MISSING_UPLOAD_URL              :-3,
            IO_ERROR                        :-4,
            UPLOAD_LIMIT_EXCEEDED           :-5,
            SPECIFIED_FILE_ID_NOT_FOUND     :-6,
            FILE_VALIDATION_FAILED          :-7,
            FILE_OVERSETSIZE				:-8,//超出上传最大尺寸限制
            FILE_CANCELLED                  :-9,//取消上传
            UPLOAD_STOPPED                  :-10,//停止上传
            RESIZE                          :-11,
            SECURITY_ERROR					:-12
            */
            switch (Number(ctx.msgKey)) {
                case ctx.Constant.UPLOAD_SUCCESS: 
                    {

                    } break;
                case ctx.Constant.UPLOAD_FAILED: 
                    {
                        ctx.zeroFileRate(file);
                        ctx.resetFileStateMsg2(file, ctx.msg_error);
                    }; break;
                case ctx.Constant.FILE_OVERSETSIZE: 
                    {
                        ctx.zeroFileRate(file);
                        ctx.resetFileStateMsg2(file, ctx.msg_overSize);
                    }; break;
                case ctx.Constant.UPLOAD_STOPPED: 
                    {
                        ctx.zeroFileRate(file);
                        ctx.resetFileStateMsg2(file, ctx.msg_cancel);
                    }; break;
                case ctx.Constant.IO_ERROR: 
                    {
                        ctx.zeroFileRate(file);
                        ctx.resetFileStateMsg2(file, ctx.msg_error);
                    }; break;
                case ctx.Constant.UNKONW_EXCEPTION: 
                    {
                        ctx.zeroFileRate(file);
                        ctx.resetFileStateMsg2(file, ctx.unkonw_error);
                    }; break;
                default: 
                    {
                        if ((Number(value) > 0 && Number(value) < 100) && (state == -1 || state == -3 || state == -5)) {
                            //上传进度归零
                            ctx.zeroFileRate(file);
                            //重置上传状态信息
                            if (state == -3) {
                                ctx.resetFileStateMsg2(file, ctx.msg_error);
                            } else if ((state == -1) || (state == -5)) {
                                ctx.resetFileStateMsg2(file, ctx.msg_cancel);
                            }
                        }
                    }; break;
            }
        },
        //得到正在所有的文件的列表行对象
        getAllFiles: function () {
            var ctx = this;
            return ctx.swfupload_files_content.find("input[name='fileItem_" + ctx.index + "']");
        },
        //得到正在选择的文件的列表行对象
        getSelectFiles: function () {
            var ctx = this;
            return ctx.swfupload_files_content.find("input[name='fileItem_" + ctx.index + "'][checked]");
        },
        //得到正在上传的文件的列表行对象
        getCurrentLineById: function (div_id) {
            var ctx = this;
            return ctx.swfupload_files_content.find("div[id='" + div_id + "']");
        },
        //得到正在上传的文件的列表行对象
        getCurrentLine: function (file) {
            var ctx = this;
            return ctx.swfupload_files_content.find("div[id='" + file.id + "_" + ctx.index + "']"); ;
        },
        //得到正在上传的文件的进度信息对象
        getCurrentOptRate: function (file) {
            var ctx = this;
            return ctx.getCurrentLine(file).find("div[class='file_rate']");
        },
        //得到正在上传的文件的状态信息对象
        getCurrentOptState: function (file) {
            var ctx = this;
            return ctx.getCurrentLine(file).find("div[class='file_state']");
        },
        //得到正在上传的文件的进度条的文字部分对象
        getCurrentProBarText: function (file) {
            var ctx = this;
            return ctx.getCurrentOptRate(file).find("div[id='pb_text_" + file.id + "_" + ctx.index + "']");
        },
        //得到正在上传上的文件的进度条的进度部分对象
        getCurrentProBarVal: function (file) {
            var ctx = this;
            return ctx.getCurrentOptRate(file).find("div[id='pb_value_" + file.id + "_" + ctx.index + "']");
        },
        getChangedState: function (file) {
            var ctx = this;
            var state_msg = ctx.msg_start;
            var stateVal = file.filestatus;
            /*//文件状态
            QUEUED       : -1,添加到了队列
            IN_PROGRESS  : -2,处理中
            ERROR        : -3,错误
            COMPLETE     : -4,完成
            CANCELLED    : -5 取消*/
            if (stateVal != null && stateVal != 'undefined') {
                switch (stateVal) {
                    case -1: state_msg = ctx.msg_start; break;
                    case -2: state_msg = ctx.msg_process; break;
                    case -3: state_msg = ctx.msg_error; break;
                    case -4: state_msg = ctx.msg_complete; break;
                    case -5: state_msg = ctx.msg_cancel; break;
                }
            }
            return state_msg;
        },
        onMouseClick: function () {

        },
        getFilesQueuedSize: function () {
            return this.swfUpload.getStats().files_queued;
        },
        isUploadStopped: function () {
            return this.swfUpload.uploadStopped;
        },
        openWin: function (flag) {
            var ctx = this;
            var offset = null;
            ctx.vinSwfUpload_context_shade.css("width", ctx.width);
            ctx.vinSwfUpload_context_shade.css("height", ctx.heigth);
            if (flag == 'all') {
                offset = ctx.vinSwfUpload.offset();
                ctx.vinSwfUpload_context_shade.offset({ top: offset.top, left: offset.left });
            } else {
                offset = ctx.vinSwfUpload_context_editContent.offset();
                offset = ctx.vinSwfUpload.offset();
                ctx.vinSwfUpload_context_shade.css("height", (ctx.heigth - 30));
                if (ctx.isIE()) {
                    ctx.vinSwfUpload_context_shade.offset({ top: offset.top - 10, left: offset.left - 10 });
                } else {
                    ctx.vinSwfUpload_context_shade.offset({ top: 30, left: offset.left });
                }
            }
            ctx.vinSwfUpload_context_shade.show();
        },
        closeWin: function () {
            var ctx = this;
            ctx.vinSwfUpload_context_shade.hide();
        },
        initSWFUpload: function () {
            var ctx = this;
            ctx.settings = {
                upload_url: this.uploadURL, //处理上传请求的服务器端脚本URL
                flash_url: this.flashURL, //flash元素的url
                flash9_url: this.flash9URL,
                file_size_limit: this.maxSize || (1024 * 10), //上传文件体积上限，单位byte,默认10M

                file_post_name: this.filePostName, //上传到服务器中文件内容对应的key
                file_types: this.fileType || "*.*",  //允许上传的文件类型 
                file_types_description: "All Files",  //文件类型描述
                file_upload_limit: this.fileLimit,  //限定用户一次性最多上传多少个文件，在上传过程中，该数字会累加，如果设置为“0”，则表示没有限制 

                //file_queue_limit : "10",//上传队列数量限制，该项通常不需设置，会根据file_upload_limit自动赋值          
                post_params: this.postParams || { savePath: 'upload\\' },
                use_query_string: false,
                custom_settings: {//自定义的参数，可以在事件处理函数中获取得到
                    scope_handler: this
                },
                debug: false,

                // Button Settings
                button_placeholder_id: "spanButtonPlaceholder_" + ctx.index, //flash的上传按钮显示在html的位置，此名称的元素会被替换成object元素
                button_width: 30,
                button_height: 18,
                button_text: '<span class="theFont">新增</span>',
                button_cursor: SWFUpload.CURSOR.HAND,
                button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,

                // The event handler functions 
                swfupload_preload_handler: this.swfUploadPreLoad,
                swfupload_load_failed_handler: this.swfUploadLoadFailed,
                swfupload_loaded_handler: this.swfUploadLoaded, // 当Flash控件成功加载后触发的事件处理函数;参数:没有参数

                file_dialog_start_handler: this.onDialogStart, //当用户点击上传按钮，在打开文件浏览窗口之前;参数:没有参数
                file_queued_handler: this.onFileQueued, //用户成功地选择了文件，在file_dialog_complete_handler事件之前触发。如果选择了多个文件，则触发多次;
                file_queue_error_handler: this.onFileError, //文件上传数量、类型、大小不符合时;
                file_dialog_complete_handler: this.onDiaogComplete, //在用户成功了选择了文件后，在所有file_queued_handler之后触发;
                //				    queue_complete_handler :this.queueComplete,	// Queue plugin event

                upload_start_handler: this.onUploadStart, // 用户点击了提交按钮，开始把文件上传到服务器;
                upload_progress_handler: this.onUploadProgress, //刚打开与服务器的连接与文件上传过程中;
                upload_success_handler: this.onUploadSuccess, // 文件上传成功或者等待服务器数据返回超时;
                upload_complete_handler: this.onUploadComplete, //上传完成时，在upload_success_handler之后触发 ;
                upload_error_handler: this.onUploadError, //上传失败时;

                mouse_click_handler: this.onMouseClick

            };
            ctx.swfUpload = new SWFUpload(ctx.settings);
            ctx.swfUpload.uploadStopped = false;
            return ctx.swfUpload;
        },
        initItems: function () {
            var ctx = this;
            ctx.begin = '<div class="toolbar"><ul>',
			ctx.line = '<li class="toolbar-line"></li>',
			ctx.lineHide = '<li class="toolbar-line-hide"></li>',
			ctx.add = ['add_' + ctx.index + '', '<li id="add_li"><a id="add_' + ctx.index + '"><img src="' + ctx.addImgURl + '"/><span id="spanButtonPlaceholder_' + ctx.index + '"></span></a></li>'];
            ctx.upload = ['startUpload_' + ctx.index + '', '<li id="startUpload_li_' + ctx.index + '"><a id="startUpload_' + ctx.index + '"><img src="' + ctx.uploadImgURl + '"/> 上传</a></li>'];
            ctx.stopUpload = ['stopUpload_' + ctx.index + '', '<li id="stopUpload_li_' + ctx.index + '"><a  id="stopUpload_' + ctx.index + '"><img src="' + ctx.stopImgURl + '"/> 停止</a></li>'];
            ctx.deleteSelect = ['deleteSelect_' + ctx.index + '', '<li id="deleteSelect_li_' + ctx.index + '"><a  id="deleteSelect_' + ctx.index + '"><img src="' + ctx.deleteImgURl + '"/> 删除</a></li>'];
            ctx.deleteAll = ['deleteAll_' + ctx.index + '', '<li id="deleteAll_li_' + ctx.index + '"><a  id="deleteAll_' + ctx.index + '"><img src="' + ctx.deleteImgURl + '"/> 删除所有</a></li>'];
            ctx.and = '</ul></div>';
            ctx.files_item = '<div class="files_item';
            ctx.file_sequence = '<div class="file_sequence">';
            ctx.file_name = '<div class="file_name"';
            ctx.file_size = '<div class="file_size"';
            ctx.file_type = '<div class="file_type"';
            ctx.file_rate = '<div class="file_rate"';
            ctx.file_state = '<div class="file_state"';
            ctx.div_begin = '<div>';
            ctx.div_end = '</div>';

            ctx.msg_start = '等待上传';
            ctx.msg_process = '上传中...';
            ctx.msg_error = '<span class="upload_filed">错误</span>';
            ctx.msg_overSize = '<span class="upload_filed">超出限制</span>';
            ctx.msg_complete = '上传完成';
            ctx.msg_cancel = '取消上传';
            ctx.unkonw_error = '<span class="upload_filed">未知异常</span>';
            ctx.url_error = '文件上传路径不存在或者路径错误!';

            ctx.MISSING_UPLOAD_URL_MSG = '文件上传的路径不存在!';
        },
        render: function () {
            var ctx = this;
            var context = new Array();
            var num = 0;
            context[num] = '<div class="vinSwfUpload_context_hide_clear"></div>';
            context[++num] = '<div class="vinSwfUpload_context clearfix" id="vinSwfUpload_context_' + ctx.index + '" style="width:' + (ctx.width - 2) + 'px;height:' + (ctx.heigth - 2) + 'px;">';
            //context[++num] = '<form action="'+ctx.uploadURL+'" id="vinSwfUpload_context_Form_'+ctx.index+'"  method="POST" enctype="multipart/form-data"  style="display: none;"></form>';
            context[++num] = '<div class="vinSwfUpload_context_title"  id="vinSwfUpload_context_title_' + ctx.index + '" style="width:' + ctx.width + 'px;">';
            context[++num] = ctx.initToolsBar();
            context[++num] = '</div>';
            context[++num] = '<div class="vinSwfUpload_context_editContent" id="vinSwfUpload_context_editContent_' + ctx.index + '" style="width:' + ctx.width + 'px;">';
            context[++num] = ctx.initFilesGrid();
            context[++num] = '</div>';
            context[++num] = '<div class="vinSwfUpload_context_shade" id="vinSwfUpload_context_shade_' + ctx.index + '" style="width:' + (ctx.width) + 'px;height:' + (ctx.heigth) + 'px;">';
            context[++num] = '<div class="msgmask" id="msgmask_' + ctx.index + '" style="height:' + (ctx.heigth / 2) + "px;top:" + (ctx.heigth / 2 - 10) + 'px;"><img src="' + ctx.tipImgURl + '" width="32"height="32" align="middle" />&nbsp;';
            context[++num] = '<span class="vinSwfUpload_context_shade_tip" id="vinSwfUpload_context_shade_tip_' + ctx.index + '">' + ctx.tip + '</span>';
            context[++num] = '</div></div></div>';
            context[++num] = '<div class="vinSwfUpload_context_hide_clear"></div>';
            ctx.container = $(context.join(""));
            ctx.vinSwfUpload.append(ctx.container);
            ctx.vinSwfUpload_context = ctx.vinSwfUpload.find("div[id='vinSwfUpload_context_" + ctx.index + "']");
            ctx.vinSwfUpload_URLVlidate_Form = ctx.vinSwfUpload.find("form[id='vinSwfUpload_context_Form_" + ctx.index + "']");
            ctx.vinSwfUpload_context_title = ctx.container.find("div[id='vinSwfUpload_context_title_" + ctx.index + "']");
            ctx.vinSwfUpload_context_editContent = ctx.container.find("div[id='vinSwfUpload_context_editContent_" + ctx.index + "']");
            ctx.swfupload_files_content = ctx.container.find("div[id='vinSwfUpload_swfupload_files_content_" + ctx.index + "']");
            ctx.fileItemControl = ctx.container.find("input[id='fileItemControl_" + ctx.index + "']");
            ctx.vinSwfUpload_context_shade = ctx.container.find("div[id='vinSwfUpload_context_shade_" + ctx.index + "']");
            ctx.vinSwfUpload_tip = ctx.container.find("span[id='vinSwfUpload_context_shade_tip_" + ctx.index + "']");
            if (!ctx.hideUploadBt) {
                ctx.vinSwfUpload_context_title.find("li[id='startUpload_li_" + ctx.index + "']").hide();
            }
            if (!ctx.hideStopBt) {
                ctx.vinSwfUpload_context_title.find("li[id='stopUpload_li_" + ctx.index + "']").hide();
            }
            if (!ctx.hideDeleteSelectBt) {
                ctx.vinSwfUpload_context_title.find("li[id='deleteSelect_li_" + ctx.index + "']").hide();
            }
            if (!ctx.hideDeleteAllBt) {
                ctx.vinSwfUpload_context_title.find("li[id='deleteAll_li_" + ctx.index + "']").hide();
            }
            var offset = ctx.vinSwfUpload.offset();
            ctx.vinSwfUpload_context_shade.offset({ top: offset.top, left: offset.left });
            this.bindEvent();
        },
        initToolsBar: function () {
            var ctx = this;
            ctx.tools = new Array(ctx.begin, ctx.add[1], ctx.line, ctx.upload[1], ctx.line, ctx.stopUpload[1], ctx.line, ctx.deleteSelect[1], ctx.line, ctx.deleteAll[1], ctx.and);
            ctx.toolIds = new Array(ctx.add[0], ctx.upload[0], ctx.stopUpload[0], ctx.deleteSelect[0], ctx.deleteAll[0]);
            if (!ctx.hideUploadBt) {
                ctx.tools.replace(2, ctx.lineHide);
            }
            if (!ctx.hideStopBt) {
                ctx.tools.replace(4, ctx.lineHide);
            }
            if (!ctx.hideDeleteSelectBt) {
                ctx.tools.replace(6, ctx.lineHide);
            }
            if (!ctx.hideDeleteAllBt) {
                ctx.tools.replace(8, ctx.lineHide);
            }
            return ctx.tools.join("");
        },
        initFilesGrid: function () {
            var ctx = this;
            var filesContext = new Array();
            var num = 0;
            filesContext[num] = '<div class="files_content" id="files_content_' + ctx.index + '" style="width:' + ctx.width + 'px;"><div class="files_header">';
            filesContext[++num] = '<div class="file_sequence_header"><input type="checkbox" id="fileItemControl_' + ctx.index + '"></div><div class="file_name_header">文件名</div>';
            filesContext[++num] = '<div class="file_size_header">大小(' + $.trim(ctx.sizeUnit) + ') </div><div class="file_type_header">类型</div>';
            filesContext[++num] = '<div class="file_rate_header">进度</div><div class="file_state_header">状态</div>';
            filesContext[++num] = '<div>&nbsp;</div></div><div class="vinSwfUpload_swfupload_files_content" id="vinSwfUpload_swfupload_files_content_' + ctx.index + '" style="width:' + ctx.width + 'px;height: ' + (ctx.heigth - 50) + 'px;"></div></div>';
            return filesContext.join("");
        },
        bindEvent: function () {
            var ctx = this;
            for (var i = 0; i < ctx.toolIds.length; i++) {
                ctx.vinSwfUpload_context_title.find("a[id='" + ctx.toolIds[i] + "']").click(function () {
                    var evtName = $(this).attr('id');
                    if (evtName) {
                        if (evtName == 'startUpload_' + ctx.index) {
                            ctx.startUploadFunc();
                        }
                        if (evtName == 'stopUpload_' + ctx.index) {
                            ctx.stopUploadFunc();
                        }
                        if (evtName == 'deleteSelect_' + ctx.index) {
                            ctx.deleteSelectFunc();
                        }
                        if (evtName == 'deleteAll_' + ctx.index) {
                            ctx.deleteAllFunc();
                        }
                    }
                });
                ctx.vinSwfUpload_context_title.find("a[id='" + ctx.toolIds[i] + "']").mouseover(function () {
                    $(this).addClass('toolbar_a_hover');
                    $(this).removeClass('toolbar_a_out');
                });
                ctx.vinSwfUpload_context_title.find("a[id='" + ctx.toolIds[i] + "']").mouseout(function () {
                    $(this).removeClass('toolbar_a_hover');
                    $(this).addClass('toolbar_a_out');
                });
            }

            ctx.fileItemControl.change(function () {
                $("input[name='fileItem_" + ctx.index + "']").attr("checked", $(this).attr("checked"));
            });

        },
        disposeBindEvent: function (flag) {
            var ctx = this;
            if ('start' == flag) {
                var add = ctx.vinSwfUpload_context_title.find("a[id='add_" + ctx.index + "']");
                add.unbind("mouseover");
                var deleteAll = ctx.vinSwfUpload_context_title.find("a[id='deleteAll_" + ctx.index + "']");
                deleteAll.unbind("click");
                deleteAll.unbind("mouseover");
                var deleteSelect = ctx.vinSwfUpload_context_title.find("a[id='deleteSelect_" + ctx.index + "']");
                deleteSelect.unbind("click");
                deleteSelect.unbind("mouseover");
                //设置新增的按钮状态不可用
                ctx.swfUpload.setButtonDisabled(true);
                ctx.swfUpload.setButtonCursor(-1);
            } else if ('finished' == flag || 'stop' == flag) {
                //恢复按钮事件
                ctx.vinSwfUpload_context_title.find("a[id='add_" + ctx.index + "']").mouseover(function () {
                    $(this).addClass('toolbar_a_hover');
                    $(this).removeClass('toolbar_a_out');
                });
                var deleteAll = ctx.vinSwfUpload_context_title.find("a[id='deleteAll_" + ctx.index + "']");
                deleteAll.click(function () { ctx.deleteAllFunc(); });
                deleteAll.mouseover(function () {
                    $(this).addClass('toolbar_a_hover');
                    $(this).removeClass('toolbar_a_out');
                });
                var deleteSelect = ctx.vinSwfUpload_context_title.find("a[id='deleteSelect_" + ctx.index + "']");
                deleteSelect.click(function () { ctx.deleteSelectFunc(); });
                deleteSelect.mouseover(function () {
                    $(this).addClass('toolbar_a_hover');
                    $(this).removeClass('toolbar_a_out');
                });
                //恢复新增的按钮状态
                ctx.swfUpload.setButtonDisabled(false);
                ctx.swfUpload.setButtonCursor(-2);
            }
        },
        addUI: function (file) {
        //if(tempfilename.indexOf(file.name)>=0)
       // {alert("当前文件已选择");}
       // else{
       // tempfilename+=file.name+",";
            var ctx = this;
            var filesContext = new Array();
            var num = 0;
            filesContext[num] = ctx.files_item + '" fileId="' + file.id + '" id="' + file.id + "_" + ctx.index + '">';
            filesContext[++num] = ctx.file_sequence + '<input type="checkbox" fileId="' + file.id + '" name="fileItem_' + ctx.index + '" id="' + file.id + "_" + ctx.index + '">' + ctx.div_end;
            var fname = String(file.name);
            if (fname.realLength() > 10) {
                fname = fname.substring(0, 10) + "...";
            }
            filesContext[++num] = ctx.file_name + ' title="' + file.name + '">' + fname + ctx.div_end;
            var size = Number((file.size / (ctx.coefficient * 1024))).toFixed(ctx.sizeFixed);
            filesContext[++num] = ctx.file_size + ' title="' + size + ctx.sizeUnit + '">' + size + ctx.div_end;
            filesContext[++num] = ctx.file_type + ' title="' + file.type + '">' + file.type + ctx.div_end;
            var psty = ctx.progressStyle || "percent";
            if ("percent" == psty) {
                filesContext[++num] = ctx.file_rate + ' title="0%">0%' + ctx.div_end;
            } else if ("progressBar" == psty) {
                var pbContext = new Array();
                pbContext[0] = '<div class="process-bar ' + ctx.skin + '" id="process_bar_' + file.id + "_" + ctx.index + '"><div class="pb-wrapper"><div class="pb-highlight"></div><div class="pb-container">';
                pbContext[1] = '<div class="pb-text" id="pb_text_' + file.id + "_" + ctx.index + '">0%</div><div class="pb-value" style="width:0%" id="pb_value_' + file.id + "_" + ctx.index + '"></div>';
                pbContext[2] = '</div></div></div>';
                //alert(pbContext.join(""));
                filesContext[++num] = ctx.file_rate + ' title="0%">' + pbContext.join("") + ctx.div_end;
            }
            var state = ctx.getChangedState(file);
            filesContext[++num] = ctx.file_state + ' title="' + state + '">' + state + ctx.div_end;
            filesContext[++num] = ctx.div_begin + '&nbsp;' + ctx.div_end + ctx.div_end;
            ctx.swfupload_files_content.append(filesContext.join(""));
            ctx.fileCount++;

            //当前新增的一个文件显示行的对象
            var currentLine = ctx.getCurrentLine(file);
            //移除已经有的行的选中样式
            for (var i = 0; i < ctx.fileIds.length; i++) {
                ctx.swfupload_files_content.find("div[id='" + ctx.fileIds[i] + "']").removeClass('files_item_select');
            }
            //给当前新增的一行添加选中样式
            currentLine.addClass('files_item_select');
            //给当前新增的一行绑定鼠标放上去的事件
            currentLine.mouseover(function () {
                $(this).addClass('files_item_over');
            });
            //给当前新增的一行绑定鼠标移出的事件
            currentLine.mouseout(function () {
                $(this).removeClass('files_item_over');
            });
            //给当前新增的一行绑定鼠标点击事件
            currentLine.click(function () {
                //移除已经有的行的选中样式
                for (var i = 0; i < ctx.fileIds.length; i++) {
                    ctx.swfupload_files_content.find("div[id='" + ctx.fileIds[i] + "']").removeClass('files_item_select');
                }
                //给当前选择的行的设置选中样式
                $(this).addClass('files_item_select');
                //并且选中对应的checkbox
                var ck = $(this).find("input[id='" + file.id + "_" + ctx.index + "']");
                var ckVal = ck.attr("checked");
                if (ckVal == false || ckVal == 'false') {
                    ck.attr("checked", true);
                }
            });
            return file.id;
        //}
        },
        startUploadFunc: function () {
            var ctx = this;
            if (ctx.uploadURL != null && $.trim(ctx.uploadURL) != '') {
                if (ctx.swfUpload) {
                    ctx.swfUpload.uploadStopped = false;
                    if (ctx.getFilesQueuedSize() > 0 && ctx.isUploadStopped() == false) {
                        ctx.swfUpload.uploadStopped = false;
                        ctx.swfUpload.startUpload();
                        ctx.disposeBindEvent('start');
                        //a.openWin('content');
                    }
                }
            } else {
                alert(ctx.url_error);
            }
        },
        stopUploadFunc: function () {
            var ctx = this;
            if (ctx.swfUpload && ctx.isUploadStopped() == false) {
                ctx.swfUpload.uploadStopped = true;
                ctx.swfUpload.stopUpload();
                ctx.disposeBindEvent('stop');
                //a.closeWin();
            }
        },
        //修改完成上传的列表记录,在设置了自动删除false的情况下被调用
        modifyFinished: function (file) {
            var ctx = this;
            ctx.swfupload_files_content.scrollTop(ctx.scrollTop);
        },
        //删除完成上传的列表记录,在设置了自动删除的情况下被调用
        deleteFinished: function (file) {
            var ctx = this;
            ctx.getCurrentLine(file).remove();
            ctx.fileCount--;
        },
        //删除列表中选中的数据，如果对应的记录在上传队列中则取消此文件的上传
        deleteSelectFunc: function () {
            var ctx = this;
            //这里是取消选择的SwfUpload上传的队列和删除UI对应的数据展示效果
            var checked = ctx.fileItemControl.attr("checked");
            if (checked == true) {
                ctx.deleteAllFunc();
            } else {
                var fileItems = ctx.getSelectFiles();
                fileItems.each(function () {
                    var div_id = $(this).attr("id");
                    var file_id = $(this).attr("fileId");
                    ctx.cancelFileUpload(file_id);
                    ctx.getCurrentLineById(div_id).remove();
                    ctx.fileCount--;
                });
            }
            if (ctx.fileCount <= 0) {
                ctx.fileCount = 0;
                ctx.fileItemControl.attr("checked", false);
            }
        },
        //删除列表中所有的数据，如果对应的记录在上传队列中则取消此文件的上传
        deleteAllFunc: function () {
            var ctx = this;
            //这里是取消SwfUpload上传的队列和删除UI对应的数据展示效果
            var fileItems = ctx.getAllFiles();
            fileItems.each(function () {
                var div_id = $(this).attr("id");
                var file_id = $(this).attr("fileId");
                ctx.cancelFileUpload(file_id);
                ctx.getCurrentLineById(div_id).remove();
                ctx.fileCount--;
            });
            if (ctx.fileCount <= 0) {
                ctx.fileCount = 0;
                ctx.fileItemControl.attr("checked", false);
                ctx.swfupload_files_content.empty();
            }
        },
        isIE: function () {
            return !!window.ActiveXObject;
        }
    };

    $.fn.vinSWFUpload = function (cfg) {
        return new $.uiwidget.VinSWFUpload(this, cfg);
    };

})(jQuery);
