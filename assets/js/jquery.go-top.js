$(".lift-return").click(function () {
    $('body,html').animate({scrollTop: 0}, 600);
    return false;
}).hover(function () {
    var $that = $(this);
    $that.find(".lift-top").hide();
    $that.find(".lift-top-active").show();

}, function () {
    var $that = $(this);
    $that.find(".lift-top").show();
    $that.find(".lift-top-active").hide();
});



