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
	})
})(jQuery)
