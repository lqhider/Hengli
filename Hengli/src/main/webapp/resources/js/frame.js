(function($){
	$(function(){
		var resizePage = (function () {
               var  wh = $(window).innerHeight()>900?$(window).innerHeight():900;
               var  $mainPage = $(".main-page");
                $(".view-box").css("height",wh);
                $mainPage.css("height",wh - 55);
            return arguments.callee;
        })();

        $(window).resize(resizePage);
	})
})(jQuery)
