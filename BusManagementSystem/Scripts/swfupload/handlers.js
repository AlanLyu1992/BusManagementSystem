// 删除一个已经上传的文件
function delUpload(file, id) {
    var e = id;
    var attachid = hash.getValue(id);
    jQuery.messager.confirm("提示", "确认要删除该文件吗?", function (r) {
        if (r) {
            jQuery.ajax({
                type: "GET",
                url: "/Attachment/Ajax.ashx?Flag=1&AttachmentID=" + attachid + "&r=" + Math.floor(Math.random() * 1000),
                dataType: 'text',
                success: function (msg) {
                    if (msg == "True") {
                        var div = document.getElementById(e)
                        var pe = div.parentNode;
                        hash.remove(e);
                        pe.removeChild(div);
                    }
                    else {
                        jQuery.messager.alert("提示", "删除失败!", "info");
                    }
                }
            });
        }
    });

}


// 向父窗口传值
function setParentValue(fileName) {
    try {
        var _parentWin = window.parent;
        var newsPic = _parentWin.document.getElementById("txtNewsPic");
        newsPic.value = fileName;
    } catch (e) {
    }
}

// 向父窗口传值
function setParentSizeValue(filesize) {
    try {
        var _parentWin = window.parent;
        var fileSize = _parentWin.document.getElementById("hidSwfFileSize");
        fileSize.value = filesize;
        fg_fileSizes = filesize;

    } catch (e) {
    }
}

// 向父窗口传值
function setParentUploadValue(upload) {
    try {
        var _parentWin = window.parent;
        var uploads = _parentWin.document.getElementById("hidSwfUploads");
        uploads.value = upload;
        fg_uploads = upload;

    } catch (e) {
    }
}


function fileQueued(file) {
    try {
        //alert(swfu.flash_url);
        var p = new FileProgress(file, swfu.settings.custom_settings.progressTarget);
        fg_fileSizes += file.size;
        fg_object.setFileCountSize(fg_fileSizes);

        p.setShow(true);
    }
    catch (e) {
        this.debug(e);
    }
}

function fileDialogComplete() {
    swfu.startUpload();
}

function fileQueueError(file, errorCode, message) {
    try {
        if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
            //alert("You have attempted to queue too many files.\n" + (message === 0 ? "You have reached the upload limit." : "You may select " + (message > 1 ? "up to " + message + " files." : "one file.")));
            alert("您要上传的文件数量过多.\n" + (message === 0 ? "You have reached the upload limit." : "你可以选择 " + (message > 1 ? "up to " + message + " files." : "一个文件.")));
            return;
        }

        var progress = new FileProgress(file, swfu.settings.custom_settings.progressTarget);
        //progress.setError();
        progress.setShow(false);
        //        fg_object.setFileCountSize(0);
        //        fg_object.setUploadProgress(0, 0);
        //        //fg_fileSizes -= file.size;
        //        //fg_object.setFileCountSize(fg_fileSizes);

        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                //progress.setStatus("File is too big.");
                jQuery.messager.alert("提示", file.name + "  文件大小超过限制!", "info");
                this.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                jQuery.messager.alert("提示", "不能上传0节字文件!", "info");
                this.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                jQuery.messager.alert("提示", "不允许上传文件类型的文件!", "info");
                this.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            default:
                if (file !== null) {
                    progress.setStatus("Unhandled Error");
                }
                jQuery.messager.alert("提示", "未知错误!", "info");
                this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadStart(file) {
    try {
        /* I don't want to do any file validation or anything,  I'll just update the UI and
        return true to indicate that the upload should start.
        It's important to update the UI here because in Linux no uploadProgress events are called. The best
        we can do is say we are uploading.
        */
        var progress = new FileProgress(file, swfu.settings.custom_settings.progressTarget);
        progress.setUploadState(3, this.settings);
        //progress.toggleCancel(true, swfu);
    }
    catch (ex) { }

    return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {
    try {

        var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
        var progress = new FileProgress(file, swfu.settings.custom_settings.progressTarget);
        progress.setProgress(percent);
        //fg_uploads += bytesLoaded;
        fg_object.setUploadProgress(fg_uploads + bytesLoaded, fg_fileSizes);

    } catch (ex) {
        this.debug(ex);
    }
}

function uploadSuccess(file, serverData) {
    try {
        //保存文件名
        hash.add(file.id, serverData);
        var progress = new FileProgress(file, swfu.settings.custom_settings.progressTarget);
        progress.setComplete(this.settings);

    } catch (ex) {
        this.debug(ex);
    }
}

function uploadComplete(file) {
    try {
        //swf.stratUpload();
    }
    catch (ex) {
        this.debug(ex);
    }
}

function uploadError(file, errorCode, message) {
    try {
        var progress = new FileProgress(file, swfu.settings.custom_settings.progressTarget);
        progress.setShow(false);
        fg_fileSizes -= file.size;
        fg_object.setFileCountSize(fg_fileSizes);
        document.getElementById("hidSwfFileSize").value = fg_fileSizes;
        switch (errorCode) {
            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                //progress.setStatus("Upload Error: " + message);
                jQuery.messager.alert("提示", "Upload Error:" + message, "info");
                this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                jQuery.messager.alert("提示", "上传失败!", "info");
                this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                jQuery.messager.alert("提示", "服务器IO错误!", "info");
                this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                jQuery.messager.alert("提示", "服务器安装错误!", "info");
                this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                jQuery.messager.alert("提示", "上传被限制执行!", "info");
                this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                jQuery.messager.alert("提示", "文件无效,跳过该文件!", "info");
                this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                //progress.setStatus("Cancelled");
                //alert("上传被终止!");
                //progress.setCancelled();
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                //progress.setStatus("Stopped");
                //alert("上传被停止!");
                break;
            default:
                //progress.setStatus("Unhandled Error: " + errorCode);
                alert("未知异常,ErrorCode:" + errorCode);
                this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
        }
    } catch (ex) {
        this.debug(ex);
    }
}

// This event comes from the Queue Plugin
function queueComplete(numFilesUploaded) {

}