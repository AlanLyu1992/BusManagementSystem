/*
UI处理
参数:
file:           SWFUpload文件对象
targetid:    父容器标识
*/
function FileProgress(file, targetid) {
    //定义文件处理标识
    this.ProgressId = file.id;

    //获取当前容器对象
    this.fileProgressElement = document.getElementById(file.id);

    if (!this.fileProgressElement) {
        //container
        this.fileProgressElement = document.createElement("div");
        this.fileProgressElement.id = file.id;
        this.fileProgressElement.className = swfu.settings.custom_settings.container_css;

        //state button
        this.stateButton = document.createElement("input");
        this.stateButton.type = "button";
        this.stateButton.className = swfu.settings.custom_settings.icoWaiting_css;
        this.fileProgressElement.appendChild(this.stateButton);

        //filename
        this.filenameSpan = document.createElement("span");
        this.filenameSpan.className = swfu.settings.custom_settings.fname_css;
        var ne = file.name;
        if (ne.length > 40) {
            ne = ne.substr(0, 40) + "..." + file.type;
        }
        this.filenameSpan.appendChild(document.createTextNode(ne+ "(" + formatUnits(file.size) + ")"));

        this.fileProgressElement.appendChild(this.filenameSpan);

        //statebar div
        this.stateDiv = document.createElement("div");
        this.stateDiv.className = swfu.settings.custom_settings.state_div_css;
        this.stateBar = document.createElement("div");
        this.stateBar.className = swfu.settings.custom_settings.state_bar_css;
        this.stateBar.innerHTML = "&nbsp;";
        this.stateBar.style.width = "0%";
        this.stateDiv.appendChild(this.stateBar);
        this.fileProgressElement.appendChild(this.stateDiv);

        //span percent
        this.percentSpan = document.createElement("span");
        this.percentSpan.className = swfu.settings.custom_settings.percent_css;
        this.percentSpan.style.marginTop = "10px";
        this.percentSpan.innerHTML = "(等待上传中...)";
        this.fileProgressElement.appendChild(this.percentSpan);

        //cancel href
        this.hrefSpan = document.createElement("span");
        this.hrefSpan.className = swfu.settings.custom_settings.href_delete_css;
        this.hrefControl = document.createElement("a");
        this.hrefControl.innerHTML = "取消";
        this.hrefControl.onclick = function () {
            swfu.cancelUpload(file.id);
        }
        this.hrefSpan.appendChild(this.hrefControl);
        this.fileProgressElement.appendChild(this.hrefSpan);

        //delete href
        this.delSpan = document.createElement("span");
        this.delSpan.className = swfu.settings.custom_settings.href_delete_css;
        this.delControl = document.createElement("a");
        this.delControl.innerHTML = "删除";
        this.delControl.onclick = function () {
            delUpload(file, file.id);
        }
        this.delSpan.appendChild(this.delControl);
        this.delSpan.style.display = "none";
        this.fileProgressElement.appendChild(this.delSpan);

        //insert container
        document.getElementById(targetid).appendChild(this.fileProgressElement);
    }
    else {
        this.reset();
    }
}

//恢复默认设置
FileProgress.prototype.reset = function () {
    this.stateButton = this.fileProgressElement.childNodes[0];
    this.fileSpan = this.fileProgressElement.childNodes[1];
    this.stateDiv = this.fileProgressElement.childNodes[2];
    this.stateBar = this.stateDiv.childNodes[0];
    this.percentSpan = this.fileProgressElement.childNodes[3];
    this.hrefSpan = this.fileProgressElement.childNodes[4];
    this.hrefControl = this.hrefSpan.childNodes[0];
    this.delSpan = this.fileProgressElement.childNodes[5];
    this.delControl = this.delSpan.childNodes[0];

    /*this.stateButton.className = swfu.settings.custom_settings.icoNormal_css;*/

    /*this.stateBar.className = swfu.settings.custom_settings.state_bar_css;
    this.stateBar.innerHTML = "&nbsp;";
    this.stateBar.style.width = "0%";*/

    /*this.percentSpan.className = swfu.settings.custom_settings.percent_css;
    this.percentSpan.innerHTML = "";*/
}

/*
设置状态按钮状态
state:        当前状态,1:初始化完成,2:正在等待,3:正在上传
settings:    swfupload.settings对象
*/
FileProgress.prototype.setUploadState = function (state, settings) {
    switch (state) {
        case 1:
            //初始化完成
            this.stateButton.className = settings.custom_settings.icoNormal_css;
            break;
        case 2:
            //正在等待
            this.stateButton.className = settings.custom_settings.icoWaiting_css;
            break;
        case 3:
            //正在上传
            this.stateButton.className = settings.custom_settings.icoUpload_css;
    }
}

/*
设置上传进度
percent:     已上传百分比
*/
FileProgress.prototype.setProgress = function (percent) {
    this.stateBar.style.width = percent + "%";
    this.percentSpan.innerHTML = percent + "%";
    //this.stateButton.className = swfu.settings.custom_settings.icoUpload_css;
    if (percent == 100) {
        this.hrefSpan.style.display = "none";
        this.stateDiv.style.display = "none";
        this.percentSpan.style.display = "none";

        //this.stateButton.className = swfu.settings.custom_settings.icoNormal_css;
    }
}

/*
上传完成
*/
FileProgress.prototype.setComplete = function (settings) {
    this.stateButton.className = settings.custom_settings.icoNormal_css;
    this.hrefSpan.style.display = "none";
    this.delSpan.style.display = "";
}

/*
控制上传进度对象是否显示
*/
FileProgress.prototype.setShow = function (show) {
    this.fileProgressElement.style.display = show ? "" : "none";
}
//计算文件大小的文字描述,传入参数单位为字节
function formatUnits(size) {
    if (isNaN(size) || size == null) {
        size = 0;
    }

    if (size <= 0) return size + "bytes";

    var t1 = (size / 1024).toFixed(2);
    if (t1 < 0) {
        return "0KB";
    }

    if (t1 > 0 && t1 < 1024) {
        return t1 + "KB";
    }

    var t2 = (t1 / 1024).toFixed(2);
    if (t2 < 1024)
        return t2 + "MB";

    return (t2 / 1024).toFixed(2) + "GB";
}
