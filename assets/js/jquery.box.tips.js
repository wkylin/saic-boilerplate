$(".bubble-info").each(function () {
    var $that = $(this);
    $that.on("mouseover", function () {
        $that.find(".bubble-wrapper").stop(true, false).animate({"width": "404px", "height": "304px", "left": "-370px", "top": "20px"}, 600);
    }).on("mouseout", function () {
        $that.find(".bubble-wrapper").stop(true, false).animate({"width": "0", "height": "0", "left": "30px", "top": "20px"}, 600);
    });
});