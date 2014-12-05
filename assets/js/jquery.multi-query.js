$(document).ready(function () {

    //设置默认值
    var defaultVal = $($(".drop-down-box").get(0)).find(".drop-input").text();
    //选项卡
    $(".cx-tabs-box").on("click", "li", function () {
        //选项卡状态
        $(this).siblings(".cx-trigger-item").removeClass("cx-trigger-current").end().addClass("cx-trigger-current");

        $(".del-select").trigger("click", function () {
            clearAll($(this));
        });

        //alert(getAllConditional());
        //请求查询
        $.ajax({
            url: "js/query.json",
            type: "post",
            data: getAllConditional(),
            success: function (data) {
                // alert("success:"+data.type);
            }
        });
    });

    //不限选择条件
    $(".cx-select-list").on("click", ".select-all", function () {
        if (!$(this).hasClass("selected")) {
            $(this).addClass("selected");
        }

        var $flexBox = $(this).parents(".cx-select-item");
        $flexBox.find("dd").removeClass("selected");
        var $selectResult = $(".cx-select-result");
        var selected = $flexBox.find("dl").attr("id");
        $selectResult.find("." + selected).remove();

        if ($(this).data("name") == 'brand') {
            $selectResult.find(".select-brand").remove();
            $selectResult.find(".select-series").remove();
            $(".drop-input").text(defaultVal);
            var $list = $(".drop-down-series").find(".down-option-list");
            $(".drop-down-series").find("dl").remove();
            $list.find("li").remove();
            $list.css({"height": "auto"});
        }

        if ($selectResult.find(".selected").size() < 1) {
            $(".select-no").show();
            $(".del-select").hide();
        }

        //组合条件
        var str = getAllConditional();
        console.log(str);
    });

    //删除已选择的选项
    $(".cx-select-result").on("click", "dd:not(':last')", function () {
        if ($(this).hasClass("select-no")) {
            return false;
        }

        var item = $(this).attr("data-item");

        var $dropSeries = $(".drop-down-series");
        //品牌
        if ($(this).hasClass("select-brand")) {
            var $dropBrand = $(".drop-down-brand");
            $dropBrand.parents(".cx-select-item").find(".select-all").addClass("selected");
            $dropBrand.find(".drop-input").text(defaultVal);
            $dropSeries.find("dl").remove();
            $dropSeries.find(".drop-input").text(defaultVal);
            $dropSeries.find(".down-option-list").find("li").remove();

            $(this).parents("dl").find(".select-series").remove();
        }

        //车系
        if ($(this).hasClass("select-series")) {
            $dropSeries.find("dl").remove();
            $dropSeries.find(".drop-input").text(defaultVal);
        }

        var cItem = $("." + item);
        cItem.removeClass("selected");

        cItem.each(function () {
            if ($(this).parents("dl").find(".selected").size() == 0) {
                $(this).parents(".cx-select-item").find(".select-all").addClass("selected");
            }
        });

        if (!$(this).hasClass("del-select")) {
            $(this).remove();
        } else {
            $(this).hide();
        }

        if ($(".cx-select-result").find(".selected").size() < 1) {
            $(".select-no").show();
            $(".del-select").hide();
        }

        //组合条件
        var str = getAllConditional();
        console.log(str);
    });

    //全部清除
    $(".del-select").on("click", function () {
        clearAll($(this));
        //组合条件
        var str = getAllConditional();
        console.log(str);
    });

    function clearAll(obj) {
        obj.hide();
        $(".cx-select-result .selected").remove();
        $(".cx-select-list dd").removeClass("selected");
        $(".select-no").show();
        var $selectAll = $(".cx-select-list .select-all");
        if (!$selectAll.hasClass(".selected")) {
            $selectAll.addClass("selected");
        }

        $(".drop-input").text(defaultVal);
        var $list = $(".drop-down-series").find(".down-option-list");
        $(".drop-down-series").find("dl").remove();
        $list.find("li").remove();
        $list.css({"height": "auto"});
    }

    //选项选中
    $(".cx-select-list").on("click", "dd", function () {
        var itemIndex = $(this).data("item");
        if ($(this).hasClass("selected")) {

            $(this).removeClass("selected");
            var $selectResult = $(".cx-select-result");
            $('.cx-select-result .' + itemIndex).remove();
            if ($selectResult.find(".selected").size() < 1) {
                $(".select-no").show();
                $(".del-select").hide();
            }
            if ($(this).parents("dl").find(".selected").size() < 1) {
                $(this).parents(".cx-select-item").find(".select-all").addClass("selected");
            }
        } else {
            var item = $(this).data("item");
            var selected = $(this).parent("dl").attr("id");
            $(this).addClass("selected").addClass(item);
            $(this).parents(".cx-select-item").find(".select-all").removeClass("selected");

            var $selectResult = $(".cx-select-result");

            var copyThisA = $(this).clone();
            if ($(".selected" + item).length < 1) {
                copyThisA.removeClass(item).addClass(item).addClass(selected).insertBefore($(".cx-select-result dl").find("dd:last"));
                $selectResult.find(".select-no").hide();
                $selectResult.find(".del-select").show();

                //每一项选择时改变'全部'
                var allSize = $('.cx-select-result .' + selected).size();
                var size = $("#" + selected).find("dd").size();
                if (allSize == size && size != 1) {
                    $('.cx-select-result .' + selected).remove();
                    $("#" + selected).find("dd").removeClass("selected");
                    $("#" + selected).parents(".cx-select-item").find(".select-all").addClass("selected");
                    if ($selectResult.find(".selected").size() < 1) {
                        $(".cx-select-result .del-select").hide();
                        $(".cx-select-result .select-no").show();
                    }

                }
            }
        }

        //组合条件
        var str = getAllConditional();
        console.log(str);
    });

    // 下拉菜单
    $("body").on("click", function () {
        $(".down-option-list").hide();
    });

    //绑定click事件
    $(".drop-down-box").on("click", function () {
        $(".down-option-list").hide();
        if (!$(this).hasClass("drop-down-disabled")) {
            var $list = $(this).find(".down-option-list");
            if ($list.is(":visible")) {
                $list.hide();
            } else {
                $list.show();
            }
        }
        return false;
    });

    //First Drop Down 预加载

    var dlSelect = '<dl class="cx-hide"><dd class="selected" data-name="brand" data-item="select0item0"><span>不限</span></dd></dl>';
    $(dlSelect).appendTo($(".drop-down-brand").find(".drop-down-box"));

    $(".drop-down-brand .down-option-item").on("click", function () {
        //附值
        var text = $(this).text();
        var item = $(this).data("option-item");
        var name = $(this).data("option-name");
        var id = $(this).parents(".cx-drop-down").attr("id");
        var val = $(this).data("option-val");

        $(this).parents(".drop-down-box").find(".drop-input").text(text);
        $(this).addClass("down-option-active").end().siblings("down-option-item").removeClass("down-option-active");
        $(this).parents(".down-option-list").hide();

        //隐藏 select-no
        $(".cx-select-result").find(".select-no").hide();
        $(".cx-select-result").find(".del-select").show();

        //二级菜单选择默认
        $(".drop-down-series").find('.drop-input').text($(".select-no").text());
        $(".cx-select-result").find(".select-series").remove();

        if ($(".drop-down-series").find("dl").size() > 0) {
            $(".drop-down-series").find("dl").remove();
        }

        //查询二级菜单
        $.ajax({
            url: "js/drop.json",
            data: {"key": val},
            type: "post",
            dataType: "json",
            success: function (data) {
                var $series = $(".drop-down-series");
                $series.find(".drop-down-box").removeClass("drop-down-disabled");

                $series.find(".down-option-list").css({"height": "200px"});
                var dlSize = $(".cx-select-list").find("dl").size();
                $series.attr("id", "select" + parseInt(dlSize));

                var optionList = "";
                $.each(data.key, function (index, items) {
                    optionList += '<li class="down-option-item" data-option-val="' + index + '" data-option-name="series" ' + 'data-option-item="select' + dlSize + 'item' + index + '">' + items + '</li>';
                });

                var $seriesOptions = $series.find(".down-option-list");
                $seriesOptions.empty();
                $(optionList).appendTo($seriesOptions);
                seriesDrop();

            },
            error: function () {

            }
        });

        //选择显示
        var options = '<dd class="selected select-brand ' + id + '" data-name="' + name + '"><span>' + text + '</span></dd>';

        var $selectBrand = $(".cx-select-result").find(".select-brand");
        var $selectAll = $(this).parents(".cx-select-item").find(".select-all");

        // 处理第一个选项
        if ($selectBrand.size() < 1) {
            $(options).insertBefore($(".cx-select-result dl").find("dd:last"));

            //添加隐藏条件
            $(this).parents(".cx-drop-down").find("dl").remove();
            var dlSelect = '<dl class="cx-hide"><dd data-item="' + item + '" data-name="' + name + '" class="selected"><span>' + text + '</span></dd></dl>';
            $(dlSelect).appendTo($(this).parents(".cx-drop-down"));
        } else {
            $selectBrand.find("span").text(text);
        }
        $selectAll.removeClass("selected");

        //组合条件
        var str = getAllConditional();
        console.log(str);

        return false;
    }).on("mouseover", function () {
        $(this).addClass("down-option-active");
    }).on("mouseout", function () {
        $(this).removeClass("down-option-active");
    });

    // Second Drop Down

    function seriesDrop() {

        $(".drop-down-series .down-option-item").on("click", function () {

            var text = $(this).text();
            var item = $(this).data("option-item");
            var name = $(this).data("option-name");
            var id = $(this).parents(".cx-drop-down").attr("id");
            var val = $(this).data("option-val");

            $(this).parents(".drop-down-box").find(".drop-input").text(text);
            $(this).addClass("down-option-active").end().siblings("down-option-item").removeClass("down-option-active");
            $(this).parents(".down-option-list").hide();

            //选择显示(不同点)
            var options = '<dd class="selected select-series ' + id + '" data-name="' + name + '"><span>' + text + '</span></dd>';
            var $selectBrand = $(".cx-select-result").find(".select-series");
            var $selectAll = $(this).parents(".cx-select-item").find(".select-all");

            // 处理第一个选项
            if ($selectBrand.size() < 1) {
                $(options).insertBefore($(".cx-select-result dl").find("dd:last"));
                //添加隐藏条件
                var dlSelect = '<dl class="cx-hide"><dd data-item="' + item + '" data-name="' + name + '" class="selected"><span>' + text + '</span></dd></dl>';
                $(dlSelect).appendTo($(this).parents(".cx-drop-down"));
            } else {
                $selectBrand.find("span").text(text);
            }
            $selectAll.removeClass("selected");

            //组合条件
            var str = getAllConditional();
            console.log(str);

            return false;
        }).hover(function () {
            $(this).addClass("down-option-active");
        }, function () {
            $(this).removeClass("down-option-active");
        });
    }

    //以下为获取选项条件
    function getAllConditional() {
        var str = "";
        //console.log($(".cx-select-list").find("dl").size());
        $(".cx-select-list").find("dl").each(function (index) {
            str += getStr(index);
        });
        return str;
    }

    function getStr(str) {
        var tempStr = "";
        var $select = $(".cx-select-result .select" + str);

        var size = $select.size();
        if (size > 0) {
            tempStr = getText($(".cx-select-result .select" + str));

        } else {
            var $first = $("#select" + str).parents(".cx-select-item").find(".select-all");
            tempStr = "&" + $first.data("name") + "=" + $first.find("span").text();
        }
        return tempStr;
    }

    function getText(obj) {
        var temp = "";

        obj.each(function () {
            var $that = $(this);
            if (typeof($that.attr("data-city")) == "undefined") {
                temp += "&" + $that.data("name") + "=" + $that.find("span").text();
            } else {
                temp += "&" + $that.data("name") + "=" + $that.data('city');
            }

        });
        return temp;
    }
});
