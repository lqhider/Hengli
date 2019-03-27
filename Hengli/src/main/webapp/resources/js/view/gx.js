(function($){
	$(function(){
		var resizePage = (function () {
            $("body").height($(window).height());
            var ww = $(window).width(),
                wh = $("body").innerHeight(),
                $menu = $(".menu"),
                $content = $(".content");
                $menu.height(wh);
			    $content.height(wh);
            return arguments.callee;
        })();

        $(window).resize(resizePage);
        
        //下拉列表初始化滚动条
        $(".comp-list").niceScroll({
            zindex:4,
            cursorcolor: "#0099ff",
            autohidemode: false,
            cursorborder: "1px solid transparent",
            cursorwidth: "8px"
        });
      //下拉列表初始化滚动条
        $(".center").niceScroll({
            zindex:4,
            cursorcolor: "#0099ff",
            autohidemode: false,
            cursorborder: "1px solid transparent",
            cursorwidth: "4px"
        });
	})
})(jQuery)
