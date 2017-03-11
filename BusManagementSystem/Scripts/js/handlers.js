﻿/* Demo Note:  This demo uses a FileProgress class that handles the UI for displaying the file name and percent complete.
The FileProgress class is not part of SWFUpload.
*/


/* **********************
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
   ********************** */
function fileQueued(file) {
	try {
	   //检查文件是否已添加
	   for(var i=0;i<file.index;i++)
	   {
	      var file_i = this.getFile(i);//alert(file_i.modificationdate==file.modificationdate)
	      if(file_i.filestatus !=SWFUpload.FILE_STATUS.CANCELLED && file_i.name==file.name && file_i.size==file.size && file_i.creationdate.getTime()==file.creationdate.getTime() && file_i.modificationdate.getTime()==file.modificationdate.getTime())
	      {
	         alert("文件 "+file.name+" 已添加");
	         this.cancelUpload(file.id);
	         return;
	      }
	      
	   }
	   
	   //如果OA设置不允许上传某些类型文件的时候，进行检查
	   var fileType = file.type.toLowerCase().substr(1);
	   if(oa_upload_limit == 1 && (oa_limit_type.indexOf(fileType+",")==0 || oa_limit_type.indexOf(","+fileType+",")>0))
	   {
	      alert("禁止上传 "+fileType+" 类型文件");
	      this.cancelUpload(file.id);
	      return;
	  }
	  if (document.getElementById("fsUploadArea").style.visibility == "hidden") {
	      document.getElementById("fsUploadArea").style.visibility = "visible";//gaop
	  }
		var progress = new FileProgress(file, this.customSettings.progressTarget);
//		progress.setStatus("等待上传...");//pending...
		progress.toggleCancel(true, this);
	} catch (ex) {
		this.debug(ex);
	}

}

function fileQueueError(file, errorCode, message) {
	try {
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
		    alert("上传文件数量超过限制\n" + (message === 0 ? "" : "您选择了" + message + "个文件"));
		    document.getElementById("fsUploadArea").style.visibility = "hidden";//gaop
            return;
		}

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			progress.setStatus("文件大小("+Math.ceil(file.size/1024/1024)+" MB)超过限制("+this.settings['file_size_limit']+")");
			this.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			progress.setStatus("不能上传0字节文件");
			this.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			progress.setStatus("无效的文件类型");
			this.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		default:
			if (file !== null) {
				progress.setStatus("未知错误：" + message);
			}
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (numFilesSelected > 0) {
			document.getElementById(this.customSettings.uploadArea).style.display='block';
		   if (this.getStats().files_queued > 0) {
			   document.getElementById(this.customSettings.startButtonId).disabled = false;
			   document.getElementById(this.customSettings.cancelButtonId).disabled = false;
			}
		}
		window.scrollTo(0,document.getElementById(this.customSettings.uploadArea).offsetHeight)
		
		/* I want auto start the upload and I can do that here */
		//this.startUpload();
	} catch (ex)  {
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
		document.getElementById(this.customSettings.startButtonId).disabled = true;
		var progress = new FileProgress(file, this.customSettings.progressTarget);
//		progress.setStatus("正在上传...");
		progress.toggleCancel(true, this);
	}
	catch (ex) {
	   this.debug(ex);
	}
	
	return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {
	try {
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setProgress(percent);
//		progress.setStatus("正在上传... "+percent+"%");
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	try {
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.toggleCancel(false);
		if(serverData.substr(0,5)=="-ERR ")
		{
		   progress.setError();
		   progress.setStatus("上传失败：" + serverData.substr(5));
		   
		   var stats=this.getStats();
		   stats.successful_uploads--;
		   stats.upload_errors++;
		   this.setStats(stats);
		}
	else {
	    if (document.getElementById("hdnUploadAttachmentID"))
	        document.getElementById("hdnUploadAttachmentID").value += serverData;
		   progress.setComplete();
		   progress.setStatus("上传完成。");
		}

	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
	try {
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			progress.setStatus("HTTP错误：" + message);
			this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			progress.setStatus("上传失败：" + message);
			this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			progress.setStatus("服务器(IO)错误：" + message);
			this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			progress.setStatus("安全错误：" + message);
			this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			progress.setStatus("达到上传限制：" + message);
			this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			progress.setStatus("无法验证，跳过上传：" + message);
			this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			// If there aren't any files left (they were all cancelled) disable the cancel button
			if (this.getStats().files_queued === 0) {
				document.getElementById(this.customSettings.startButtonId).disabled = true;
				document.getElementById(this.customSettings.cancelButtonId).disabled = true;
			}
			progress.setStatus("已取消");
			progress.setCancelled();
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			progress.setStatus("已停止");
			break;
		default:
			progress.setStatus("未知错误：" + errorCode);
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

function uploadComplete(file) {
	if (this.getStats().files_queued === 0) {
		document.getElementById(this.customSettings.startButtonId).disabled = true;
		document.getElementById(this.customSettings.cancelButtonId).disabled = true;
	}
}

// This event comes from the Queue Plugin
function queueComplete(numFilesUploaded) {
	var status = document.getElementById("totalStatics");
	var stats = this.getStats();
	status.innerHTML = stats.successful_uploads + " 个文件上传成功，" + stats.upload_errors + " 个文件上传失败，" + stats.upload_cancelled + " 个文件取消。";
}
