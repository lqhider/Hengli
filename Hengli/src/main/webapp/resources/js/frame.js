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
        	ajaxFactory("post",contextPath+"/gx/getGxData",param).done(function(result){
		  	  if(result.status=="true"){
		  		  var data = result.data;
		  		  var companyList = data.companyList;
		  		  var innovationCenterList = data.innovationCenterList;
		  		  
		  		  //创新中心列表
		  		  $(".cus").empty();
		  		  var html="";
		  		  for(var i = 0; i < innovationCenterList.length; i ++){
		  			  
		  			  html += '<div class="gd_box">'+innovationCenterList[i].name+'</div>';
		  			  
		  		  }
		  		  $(".cus").empty().append(html);
		  		  
  			  	  $(".gd_box").each(function(index, element) {
  			  		$(this).click(function(){
  			  			alert(innovationCenterList[index].longitude);
	  					  openInfoWindow(innovationCenterList[index].longitude, innovationCenterList[index].latitude,'');
  			  		})
	  			  })
		  		  
		  		  //地图标注
		  		  for(var i = 0; i < companyList.length; i ++){
		  			  addMarker(companyList[i].longitude,companyList[i].latitude,'');
		  		  }
		  		  for(var i = 0; i < innovationCenterList.length; i ++){
		  			  addMarker(innovationCenterList[i].longitude,innovationCenterList[i].latitude,'');
		  		  }
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