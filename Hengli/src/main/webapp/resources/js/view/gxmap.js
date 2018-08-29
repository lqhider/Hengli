(function($){
	$(function(){
		//宽高
	    $(".con_box,.hostMonitor,.con_left").css("height", $(window).height() - 40);
	    $(window).resize(function() {
	        $(".con_box,.hostMonitor,.con_left").css("height", $(window).height() - 40);
	    })
	})
})(jQuery)
