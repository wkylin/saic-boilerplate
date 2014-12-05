$(document).ready(function () {

    //关注区
    $("#J_sFixed").smartFloat();

    $("#J_tabsBorder .cx-trigger-item").on("click", function () {
        $(this).siblings('.cx-trigger-item').removeClass("cx-trigger-current").end().addClass("cx-trigger-current");
        var item = $(this).data("item");
        alert(item);
    });


    //push notice
    var intervalTimer = null;
    $(".push-notice").hover(function () {
        clearInterval(intervalTimer);
    }, function () {
        intervalTimer = window.setInterval(function () {
            showPush();
        }, 2000);
    });
    intervalTimer = window.setInterval(function () {
        showPush();
    }, 2000);

    function showPush() {
        var firstCnt = $(".push-notice").find(".push-notice-cnt:first");
        var secondCnt = $(".push-notice").find(".push-notice-cnt:last");
        if (firstCnt.is(":visible")) {
            firstCnt.hide();
        } else {
            firstCnt.show();
        }
        if (secondCnt.is(":visible")) {
            secondCnt.hide();
        } else {
            secondCnt.show();
        }
    }

    //关注/取消关注
    $(".query-result-plain").on("click", ".cx-btn-follow", function () {
        var $queryList = $(".query-result-follow").find(".cx-query-list");
        $(this).parents(".cx-query-item").clone().appendTo($queryList);
        $(this).parents(".cx-query-item").remove();
        $queryList.find(".cx-query-item:last").find(".cx-btn-follow").removeClass("cx-btn-follow").addClass("cx-btn-followed");
    });
    //取消关注
    $(".query-result-follow").on("click", ".cx-btn-followed", function () {
        var $queryList = $(".query-result-plain").find(".cx-query-list");
        $(this).parents(".cx-query-item").clone().appendTo($queryList);
        $(this).parents(".cx-query-item").remove();
        $queryList.find(".cx-query-item:last").find(".cx-btn-followed").removeClass("cx-btn-followed").addClass("cx-btn-follow");
    });

    $(".cx-btn-followed").hover(function () {
        $(this).addClass("cx-cancel-follow");
    }, function () {
        $(this).removeClass("cx-cancel-follow");
    });

    //倒计时
    $(".fn-timer-down").each(function () {
        var beginTime = $(this).attr("data-timer-begin");
        var endTime = $(this).attr("data-timer-end");
        var st = new showTime($(this), beginTime, endTime);
        st.setTimeShow();

        //加价延时30秒
        var $that = $(this);
        var day = parseInt($that.find(".timer-day").text().substring(0, 1));
        var hour = parseInt($that.find(".timer-hour").text().substring(0, 1));
        var minute = parseInt($that.find(".timer-minute").text().substring(0, 1));
        var second = parseInt($that.find(".timer-second").text().substring(0, 1));
        var $cxButton = $that.parents(".cx-query-item").find(".cx-button-text");
        if (!$cxButton.parents(".cx-button").hasClass("cx-button-disable")) {
            $cxButton.on("click", function () {
                if (day == 0 & hour == 0 & minute == 0 & 0 < second < 3) {
                    clearTimeout(st.obj.timer);
                    var aa = new Date();
                    var delay = aa.getTime() + 30000;
                    var bb = new Date(delay);
                    var se = bb.getSeconds() < 10 ? "0" + bb.getSeconds() : bb.getSeconds();
                    var end = bb.getFullYear() + "-" + (bb.getMonth() + 1) + "-" + bb.getDate() + " " + bb.getHours() + ":" + bb.getMinutes() + ":" + se;
                    var sts = new showTime($that, beginTime, end);
                    sts.obj.timer && clearTimeout(sts.obj.timer);
                    sts.setTimeShow();
                }
            });
        }
    });

    //查询结果
    $(".query-result").find(".cx-query-item").hover(function () {
        $(this).addClass("cx-query-active");
    }, function () {
        $(this).removeClass("cx-query-active");
    });
});