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
        
        $("#sub").click(function(){
        	var param = {
    				companyName:$("#companyName").val()
    		}
        	//ajax
        	ajaxFactory("post",contextPath+"/gx/getData",param).done(function(result){
		  	  if(result.status=="true"){
		  		  //
		  		  var arr = new Array();
		  		  var obj = {lng:"117.162868", lat:"39.166204"};
		  		  arr.push(obj);
		  		  addMarker(arr);
		  	  }
        	}) 
		})
	})
})(jQuery)
		//ajax请求
		function ajaxFactory(method,url,param) { //method:请求类型，url：请求地址,param:请求参数
		    var defer = $.Deferred();
		    $.ajax({
		        type: method,
		        url:  url,
		        data: param,
		        timeout: 30000,
		        dataType: "json",
		        success: function(result) {
		            defer.resolve(result);
		        },
		        error: function(XMLHttpRequest, textStatus, errorThrown) {
		        	console.log("Ajax请求出错！")
		        }
		    });
		    return defer.promise();
		}