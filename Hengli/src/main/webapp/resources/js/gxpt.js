(function($){
	$(function(){
		//ajax获取一级分类
    	ajaxFactory("post",contextPath+"/classification/getFirstClassification",{}).done(function(result){
		  	  if(result.status=="true"){
		  		var data = result.data;
		  		
		  		var html = "";
		  		for(var i = 0; i < data.length; i ++){
		  			  html += '<a href="javascript:void(0)" fl="'+data[i].id+'">'+data[i].name+'</a>';
		  		}
		  		$("#yjfl").empty().append(html);
		  	  }
		  	  
		  	  //添加一级分类点击事件
		  	  $("#yjfl a").each(function(index, element) {
		  		$(this).click(function(){
		  			$("#yjfl a").removeClass("active");
		  			$("#ejfl a").removeClass("active");
		  			$(this).addClass("active");
		  			
		  			getGxptData();
		  		})
			  })
    	})
    	
    	//ajax获取二级分类
    	ajaxFactory("post",contextPath+"/classification/getSecondClassification",{}).done(function(result){
	  	  if(result.status=="true"){
	  		var data = result.data;
	  		
	  		var html = "";
	  		for(var i = 0; i < data.length; i ++){
	  			  html += '<a href="javascript:void(0)" fl="'+data[i].id+'">'+data[i].name+'</a>';
	  		}
	  		$("#ejfl").empty().append(html);
	  		
	  		//添加二级分类点击事件
	  		$("#ejfl a").each(function(index, element) {
		  		$(this).click(function(){
		  			$("#yjfl a").removeClass("active");
		  			$("#ejfl a").removeClass("active");
		  			$(this).addClass("active");
		  			
		  			getGxptData();
		  		})
			  })
	  	  }
    	})
    	
    	getGxptData();
    	
    	$(".search-btn").click(function(){
    		getGxptData();
  		})
    	
    	//获取企业列表和创新中心列表
    	function getGxptData(){
    		//清空标注
    		clearOverlays();
    		
    		var param = {
    				companyName:$("#companyName").val(),
    				first_classification:$("#yjfl a.active").attr("fl"),
    				second_classification:$("#ejfl a.active").attr("fl")
    		}
        	//ajax
        	ajaxFactory("post",contextPath+"/gxpt/getGxptData",param).done(function(result){
		  	  if(result.status=="true"){
		  		  var data = result.data;
		  		  var companyList = data.companyList;
		  		  var innovationCenterList = data.innovationCenterList;
		  		  
		  		  //企业列表
		  		  var html="";
		  		  for(var i = 0; i < companyList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)">'+
							'<h3>'+companyList[i].name+'</h3>'+
							'<p class="clearfix"><span>供应数量：'+companyList[i].product_number+'</span><span>需求数量：'+companyList[i].need_number+'</span></p>'+
							'<p class="clearfix">定制服务数量：'+companyList[i].custom_service_number+'</p></a>';
		  			  
		  			  //地图标注
		  			  addMarker(companyList[i].longitude,companyList[i].latitude,'');
		  		  }
		  		  $("#qylb").empty().append(html);
		  		  
		  		  //创新中心列表
		  		  html="";
		  		  for(var i = 0; i < innovationCenterList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>'+innovationCenterList[i].name+'</h3></a>';
		  			  
		  			  //地图标注
		  			  addMarker(innovationCenterList[i].longitude,innovationCenterList[i].latitude,'');
		  		  }
		  		  $("#cxzx").empty().append(html);
		  		  
		  		  $("#qylb a").each(function(index, element) {
  			  		$(this).click(function(){
	  					openInfoWindow(companyList[index].longitude, companyList[index].latitude,'');
  			  		})
	  			  })
		  		  
  			  	  $("#cxzx a").each(function(index, element) {
  			  		$(this).click(function(){
	  					openInfoWindow(innovationCenterList[index].longitude, innovationCenterList[index].latitude,'');
  			  		})
	  			  })
		  		  
		  		  //地图标注
		  		  /*for(var i = 0; i < companyList.length; i ++){
		  			  addMarker(companyList[i].longitude,companyList[i].latitude,'');
		  		  }
		  		  for(var i = 0; i < innovationCenterList.length; i ++){
		  			  addMarker(innovationCenterList[i].longitude,innovationCenterList[i].latitude,'');
		  		  }*/
		  	  }
        	}) 
    	}
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