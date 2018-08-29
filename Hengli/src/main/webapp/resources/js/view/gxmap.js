(function($){
	$(function(){
		//宽高
	    $(".con_box,.hostMonitor,.con_left").css("height", $(window).height() - 40);
	    $(".con_main").css("height", $(window).height() - 95);
	    $(".ztree").height($(window).height() - 40 -55 -55 -10);
	    $(window).resize(function() {
	        $(".con_box,.hostMonitor,.con_left").css("height", $(window).height() - 40);
	        $(".con_main").css("height", $(window).height() - 95);
	        $(".ztree").height($(window).height() - 40 -55 -55 -10);
	    })
	})
})(jQuery)
