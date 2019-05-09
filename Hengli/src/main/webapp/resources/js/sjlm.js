(function($){
	$(function(){
		//ajax获取一级分类
    	ajaxFactory("post",contextPath+"/classification/getFirstClassification",{}).done(function(result){
		  	  if(result.status=="true"){
		  		var data = result.data;
		  		
		  		var html = '<a href="javascript:void(0)" fl="">全部</a>';
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
		  			
		  			$("#sjslb").empty();
		  			getSjlmData();
		  		})
			  })
    	})
    	
    	//ajax获取二级分类
    	ajaxFactory("post",contextPath+"/classification/getSecondClassification",{}).done(function(result){
	  	  if(result.status=="true"){
	  		var data = result.data;
	  		
	  		var html = '<a href="javascript:void(0)" fl="">全部</a>';
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
		  			
		  			$("#sjslb").empty();
		  			getSjlmData();
		  		})
			  })
	  	  }
    	})
    	
    	getSjlmData();
    	
    	$(".search-btn").click(function(){
    		$("#sjslb").empty();
    		getSjlmData();
  		})
    	
    	//获取企业列表设计公司列表
    	function getSjlmData(){
    		//清空标注
    		clearOverlays();
    		
    		$("#sjslb").empty();
    		
    		var param = {
    				name:$("#name").val(),
    				first_classification:$("#yjfl a.active").attr("fl"),
    				second_classification:$("#ejfl a.active").attr("fl")
    		}
        	//ajax
        	ajaxFactory("post",contextPath+"/sjlm/getSjlmData",param).done(function(result){
		  	  if(result.status=="true"){
		  		  var data = result.data;
		  		  var companyList = data.companyList;
		  		  var designCompanyList = data.designCompanyList;
		  		  
		  		  //企业列表
		  		  var html="";
		  		  for(var i = 0; i < companyList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>'+companyList[i].name+'</h3>';
//			  			if(companyList[i].requirement_num != null && companyList[i].requirement_num!=''){
//			  				html += '<p>发布需求数量：'+companyList[i].requirement_num+'</p>';
//			  			}
//			  			html += '</a>';
		  			  html += '<p>发布需求数量：'+(companyList[i].requirement_num==null?"":companyList[i].requirement_num)+'</p></a>';
		  			  
		  			  var sContent = '<div class="wr-w1 sjszy-w2">'+
										'<div class="mask"></div><div class="closeBtn"></div>'+
										'<div class="content">'+
											'<h5>'+companyList[i].name+'</h5>';
		  			if(companyList[i].requirement_num != null && companyList[i].requirement_num!=''){
		  				sContent += '<p>发布需求数量：'+companyList[i].requirement_num+'</p>';
		  			}
//											'<p>发布需求数量：'+companyList[i].requirement_num+'</p>'+
//											'<div class="cbtn-w">'+
		  			sContent += '<div class="cbtn-w">';
		  			if(companyList[i].demand_hall != null && companyList[i].demand_hall != ''){
		  				sContent += '<a target="_blank" href="'+companyList[i].demand_hall+'" class="com-btn xqdt"></a>';
		  			}else{
		  				sContent += '<a target="_blank" href="http://mujufw.casicloud.com/view/wants_list.htm" class="com-btn xqdt"></a>';
		  			}
		  			sContent += '</div></div></div>';
//												'<a target="_blank" href="'+companyList[i].demand_hall+'" class="com-btn xqdt"></a>'+
//											'</div>'+
//										'</div>'+
//									'</div>';
		  			  
		  			  //地图标注
		  			  addMarker(companyList[i].longitude, companyList[i].latitude, sContent);
		  		  }
		  		  $("#qylb").empty().append(html);
		  		  
		  		  $("#qylb a").each(function(index, element) {
  			  		$(this).click(function(){
  			  			$("#qylb a").removeClass("active");
  			  			$("#sjsgslb a").removeClass("active");
  			  			$(this).addClass("active");
  			  			
  			  		var sContent = '<div class="wr-w1 sjszy-w2">'+
									'<div class="mask"></div><div class="closeBtn"></div>'+
									'<div class="content">'+
										'<h5>'+companyList[index].name+'</h5>';
	  			  	if(companyList[index].requirement_num != null && companyList[index].requirement_num!=''){
		  				sContent += '<p>发布需求数量：'+companyList[index].requirement_num+'</p>';
		  			}
//										'<p>发布需求数量：'+companyList[index].requirement_num+'</p>'+
//										'<div class="cbtn-w">'+
	  			  	sContent += '<div class="cbtn-w">';
	  			  	if(companyList[index].demand_hall != null && companyList[index].demand_hall != ''){
		  				sContent += '<a target="_blank" href="'+companyList[index].demand_hall+'" class="com-btn xqdt"></a>';
		  			}else{
		  				sContent += '<a target="_blank" href="http://mujufw.casicloud.com/view/wants_list.htm" class="com-btn xqdt"></a>';
		  			}
		  			sContent += '</div></div></div>';
//											'<a target="_blank" href="'+companyList[index].demand_hall+'" class="com-btn xqdt"></a>'+
//										'</div>'+
//									'</div>'+
//								'</div>';
  			  			
	  					openInfoWindow(companyList[index].longitude, companyList[index].latitude, sContent);
  			  		})
	  			  })
	  			  
	  			  
	  			  //设计师公司列表
		  		  var html="";
		  		  for(var i = 0; i < designCompanyList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)" sjsgs="'+designCompanyList[i].id+'"><h3>'+designCompanyList[i].name+'</h3>';
//			  			if(designCompanyList[i].receipt_num != null && designCompanyList[i].receipt_num!=''){
//			  				html += '<p>接单设计任务数量：'+designCompanyList[i].receipt_num+'</p>';
//			  			}
//			  			html += '</a>';
		  			  html += '<p>接单设计任务数量：'+(designCompanyList[i].receipt_num==null?"":designCompanyList[i].receipt_num)+'</p></a>';
		  			  
		  			  var sContent = '<div class="wr-w2 sjsgs-w">'+
										'<div class="mask"></div><div class="closeBtn"></div>'+
										'<div class="content">'+
											'<h5>'+designCompanyList[i].name+'</h5>';
			  			if(designCompanyList[i].domain != null && designCompanyList[i].domain!=''){
			  				sContent += '<p>领域：'+designCompanyList[i].domain+'</p>';
			  			}
			  			if(designCompanyList[i].qualifications != null && designCompanyList[i].qualifications!=''){
			  				sContent += '<p>资质：'+designCompanyList[i].qualifications+'</p>';
			  			}
//											'<p>领域：'+designCompanyList[i].domain+'</p>'+
//											'<p>资质：'+designCompanyList[i].qualifications+'</p>'+
//											'<div class="cbtn-w">'+
			  			sContent += '<div class="cbtn-w">';
			  			if(designCompanyList[i].homepage != null && designCompanyList[i].homepage != ''){
			  				sContent += '<a target="_blank" href="'+designCompanyList[i].homepage+'" class="com-btn gszy"></a>';
			  			}
			  			sContent += '</div></div></div>';
//												'<a target="_blank" href="'+designCompanyList[i].homepage+'" class="com-btn gszy"></a>'+
//											'</div>'+
//										'</div>'+
//									'</div>';
		  			  
		  			  //地图标注
		  			  addMarker(designCompanyList[i].longitude, designCompanyList[i].latitude, sContent);
		  		  }
		  		  $("#sjsgslb").empty().append(html);
		  		  
		  		  $("#sjsgslb a").each(function(index, element) {
  			  		$(this).click(function(){
  			  			$("#qylb a").removeClass("active");
			  			$("#sjsgslb a").removeClass("active");
  			  			$(this).addClass("active");
  			  			
  			  			var sContent = '<div class="wr-w2 sjsgs-w">'+
									'<div class="mask"></div><div class="closeBtn"></div>'+
									'<div class="content">'+
										'<h5>'+designCompanyList[index].name+'</h5>';
	  			  		if(designCompanyList[index].domain != null && designCompanyList[index].domain!=''){
			  				sContent += '<p>领域：'+designCompanyList[index].domain+'</p>';
			  			}
		  			  	if(designCompanyList[index].qualifications != null && designCompanyList[index].qualifications!=''){
			  				sContent += '<p>资质：'+designCompanyList[index].qualifications+'</p>';
			  			}
//										'<p>领域：'+designCompanyList[index].domain+'</p>'+
//										'<p>资质：'+designCompanyList[index].qualifications+'</p>'+
//										'<div class="cbtn-w">'+
		  			  	sContent += '<div class="cbtn-w">';
		  			  	if(designCompanyList[index].homepage != null && designCompanyList[index].homepage != ''){
		  			  		sContent += '<a target="_blank" href="'+designCompanyList[index].homepage+'" class="com-btn gszy"></a>';
		  			  	}
		  			  	sContent += '</div></div></div>';
//											'<a target="_blank" href="'+designCompanyList[index].homepage+'" class="com-btn gszy"></a>'+
//										'</div>'+
//									'</div>'+
//								'</div>';
  			  			
	  					openInfoWindow(designCompanyList[index].longitude, designCompanyList[index].latitude, sContent);
	  					
	  					getDesigner();
  			  		})
	  			  })
	  			  
	  			  
	  			$("#sjsgslb a:eq(0)").click();
		  	  }
        	}) 
    	}
    	
    	function getDesigner(){
    		var param = {
    				design_company:$("#sjsgslb a.active").attr("sjsgs")
    		}
    		//ajax
        	ajaxFactory("post",contextPath+"/sjlm/getDesigner",param).done(function(result){
		  	  if(result.status=="true"){
		  		  var data = result.data;
		  		  var designerList = data.designerList;
		  		  
		  		  //设计师列表
		  		  var html="";
		  		  for(var i = 0; i < designerList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>姓名：'+designerList[i].dname+'</h3>';
//			  			if(designerList[i].dcname != null && designerList[i].dcname!=''){
//			  				html += '<p>所属设计公司：'+designerList[i].dcname+'</p>';
//			  			}
//			  			if(designerList[i].publication_num != null && designerList[i].publication_num!=''){
//			  				html += '<p>发布设计作品数量：'+designerList[i].publication_num+'</p>';
//			  			}
//			  			html += '</a>';
		  			  html += '<p>所属设计公司：'+(designerList[i].dcname==null?"":designerList[i].dcname)+
		  			  			'</p><p>发布设计作品数量：'+(designerList[i].publication_num==null?"":designerList[i].publication_num)+'</p></a>';
		  		  }
		  		  $("#sjslb").empty().append(html);
		  		  
		  		  //添加设计师的点击事件
			  	  $("#sjslb a").each(function(index, element) {
			  		$(this).click(function(){
			  			$("#qylb a").removeClass("active");
			  			$("#sjsgslb a").removeClass("active");
			  			$("#sjslb a").removeClass("active");
			  			$(this).addClass("active");
			  			
			  			var sContent = '<div class="wr-w1 sjszy-w">'+
										'<div class="mask"></div><div class="closeBtn"></div>'+
										'<div class="content">'+
											'<h5>姓名：'+designerList[index].dname+'</h5>';
			  			if(designerList[index].dcname != null && designerList[index].dcname!=''){
			  				sContent += '<p>所属设计公司：'+designerList[index].dcname+'</p>';
			  			}
			  			if(designerList[index].seniority != null && designerList[index].seniority!=''){
			  				sContent += '<p>资历：'+designerList[index].seniority+'</p>';
			  			}
			  			if(designerList[index].work_experience != null && designerList[index].work_experience!=''){
			  				sContent += '<p>工作经验：'+designerList[index].work_experience+'年</p>';
			  			}
//											'<p>所属设计公司：'+designerList[index].dcname+'</p>'+
//											'<p>资历：'+designerList[index].seniority+'</p>'+
//											'<p>工作经验：'+designerList[index].work_experience+'年</p>'+
//											'<div class="cbtn-w">'+
			  			sContent += '<div class="cbtn-w">';
			  			if(designerList[index].homepage != null && designerList[index].homepage != ''){
			  				sContent += '<a target="_blank" href="'+designerList[index].homepage+'" class="com-btn sjszy"></a>';
			  			}
			  			sContent += '</div></div></div>';
//												'<a target="_blank" href="'+designerList[index].homepage+'" class="com-btn sjszy"></a>'+
//											'</div>'+
//										'</div>'+
//									'</div>';
			  			
			  			openInfoWindow(designerList[index].longitude, designerList[index].latitude, sContent);
			  		})
				  })
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