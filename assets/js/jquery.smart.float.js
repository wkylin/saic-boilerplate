;
(function ($) {
    $.fn.smartFloat = function () {
        var position = function (element) {
            var top = element.position().top, pos = element.css("position");
            $(window).scroll(function () {
                var scrolls = $(this).scrollTop();
                var tempDiv = '<div class="temp-div" style="height:' + element.outerHeight() + 'px;"></div>';
                if (scrolls > top) {

                    if ($(".temp-div").size() < 1) {
                        $(tempDiv).insertAfter(element);
                    }
                    if (window.XMLHttpRequest) {
                        element.css({
                            position: "fixed",
                            top: 0
                        });
                    } else {
                        element.css({
                            top: scrolls
                        });
                    }
                } else {
                    if ($(".temp-div").size() > 0) {
                        $(".temp-div").remove();
                    }
                    element.css({
                        position: pos,
                        top: top
                    });
                }
            });
        };
        return $(this).each(function () {
            position($(this));
        });
    };
})(jQuery);