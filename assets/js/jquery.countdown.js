function showTime(target, beginTime, endTime) { //function showTime(target, beginTime, endTime,curTime)//后端开发环境 多传 curTime
    this.obj = target;
    this.beginTime = beginTime;
    this.endTime = endTime;
    //this.curTime = curTime;
}

showTime.prototype.setTimeShow = function () {

    var e = this.obj;
    var that = this;
    that.obj.timer = null;
    that.obj.timer = setTimeout(function () {
        that.setTimeShow();
    }, 1e3);

    var templet = "";
    var day = 0, hour = 0, minute = 0, second = 0, timeGap = 0;

    //var a = new Date(that.curTime),
    var a = new Date(),
        f = this.beginTime.replace(/-/g, "/"),
        l = this.endTime.replace(/-/g, "/"),
        c = new Date(f),
        h = new Date(l);

    var begin = c.getTime();
    var end = h.getTime();
    var cur = a.getTime();

    var dd = 0, hh = 0, mm = 0, ss = 0;


    //已开始
    if (cur - end <= 0 & cur - begin >= 0) {
        timeGap = end - cur;

        dd = Math.floor(timeGap / 864e5);
        timeGap -= dd * 864e5;
        hh = Math.floor(timeGap / 36e5);
        timeGap -= hh * 36e5;
        mm = Math.floor(timeGap / 6e4);
        timeGap -= mm * 6e4;
        ss = Math.floor(timeGap / 1e3);


        if (dd == 0 & hh == 0 & mm == 0 & ss <= 59) {
            e.parents(".fn-timer").addClass("fn-timer-active");
        }


        dd < 10 ? dd = "0" + dd : dd = dd;
        hh < 10 ? hh = "0" + hh : hh = hh;
        mm < 10 ? mm = "0" + mm : mm = mm;
        ss < 10 ? ss = "0" + ss : ss = ss;


        templet = "<span class='timer-day cx-hide'>" + dd + "</span><span class='cx-hide'>:</span><span class='timer-hour'>" + hh + "</span>:<span class='timer-minute'>" + mm + "</span>:<span class='timer-second'>" + ss + "</span>";
        e.html(templet);
    }

    //未开始
    if (cur - begin < 0) {
        timeGap = cur - begin;
        day = Math.ceil(timeGap / 864e5);

        timeGap -= day * 864e5;
        hour = Math.ceil(timeGap / 36e5);
        timeGap -= hour * 36e5;
        minute = Math.ceil(timeGap / 6e4);
        timeGap -= minute * 6e4;
        second = Math.ceil(timeGap / 1e3);

        dd = Math.abs(day);
        hh = Math.abs(hour);
        mm = Math.abs(minute);
        ss = Math.abs(second);

        dd < 10 ? dd = "0" + dd : dd = dd;
        hh < 10 ? hh = "0" + hh : hh = hh;
        mm < 10 ? mm = "0" + mm : mm = mm;
        ss < 10 ? ss = "0" + ss : ss = ss;

        templet = "<span class='timer-day cx-hide'>" + dd + "</span><span class='cx-hide'>:</span><span class='timer-hour'>" + hh + "</span>:<span class='timer-minute'>" + mm + "</span>:<span class='timer-second'>" + ss + "</span>";
        e.html(templet);
    }

    //end
    if (cur - end > 0) {
        e.html("已结束").parents(".fn-timer").removeClass("fn-timer-active");
        clearTimeout(that.obj.timer);
    }
};