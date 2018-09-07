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
		  		  var companyDistribution = data.companyDistribution;
		  		  
		  		  //企业列表
		  		  var html="";
		  		  for(var i = 0; i < companyList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)">'+
							'<h3>'+companyList[i].name+'</h3>'+
							'<p class="clearfix"><span>供应数量：'+companyList[i].product_number+'</span><span>需求数量：'+companyList[i].need_number+'</span></p>'+
							'<p class="clearfix">定制服务数量：'+companyList[i].custom_service_number+'</p></a>';
		  			  
		  			var sContent = '<div class="wr-w1">'
						+'<div class="mask"></div>'
						+'<div class="content">'
							+'<h5>'+companyList[i].name+'</h5>'
							+'<p>供应数量：'+companyList[i].product_number+'</p>'
							+'<p>需求数量：'+companyList[i].need_number+'</p>'
							+'<p>定制服务数量：'+companyList[i].custom_service_number+'</p>'
							+'<div class="cbtn-w">'
								+'<a target="_blank" href="'+companyList[i].homepage+'" class="com-btn gszy"></a>'
								+'<a target="_blank" href="'+companyList[i].gxptURL+'" class="com-btn gxpt"></a>'
							+'</div>'
						+'</div>'
					+'</div>';
		  			  
		  			  //地图标注
		  			  addMarker(companyList[i].longitude,companyList[i].latitude,sContent);
		  		  }
		  		  $("#qylb").empty().append(html);
		  		  
		  		  //创新中心列表
		  		  html="";
		  		  for(var i = 0; i < innovationCenterList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>'+innovationCenterList[i].name+'</h3></a>';
		  			  
		  			  var sContent = '<div class="wr-w2">'+
										'<div class="mask"></div>'+
										'<div class="content">'+
											'<h5>'+innovationCenterList[i].name+'</h5>'+
											'<p>中心介绍：'+innovationCenterList[i].introduce+'</p>'+
											'<p>中心地址：'+innovationCenterList[i].address+'</p>'+
											'<div class="cbtn-w">'+
												'<a target="_blank" href="'+innovationCenterList[i].homepage+'" class="com-btn zxzy"></a>'+
											'</div>'+
										'</div>'+
									'</div>';
		  			  
		  			  //地图标注
		  			  addMarker(innovationCenterList[i].longitude,innovationCenterList[i].latitude,sContent);
		  		  }
		  		  $("#cxzx").empty().append(html);
		  		  
		  		  $("#qylb a").each(function(index, element) {
  			  		$(this).click(function(){
  			  			$("#qylb a").removeClass("active");
  			  			$("#cxzx a").removeClass("active");
  			  			$(this).addClass("active");
  			  			
	  			  		var sContent = '<div class="wr-w1">'
										+'<div class="mask"></div>'
										+'<div class="content">'
											+'<h5>'+companyList[index].name+'</h5>'
											+'<p>供应数量：'+companyList[index].product_number+'</p>'
											+'<p>需求数量：'+companyList[index].need_number+'</p>'
											+'<p>定制服务数量：'+companyList[index].custom_service_number+'</p>'
											+'<div class="cbtn-w">'
												+'<a target="_blank" href="'+companyList[index].homepage+'" class="com-btn gszy"></a>'
												+'<a target="_blank" href="'+companyList[index].gxptURL+'" class="com-btn gxpt"></a>'
											+'</div>'
										+'</div>'
									+'</div>';
  			  			
	  					openInfoWindow(companyList[index].longitude, companyList[index].latitude, sContent);
  			  		})
	  			  })
		  		  
  			  	  $("#cxzx a").each(function(index, element) {
  			  		$(this).click(function(){
  			  			$("#qylb a").removeClass("active");
			  			$("#cxzx a").removeClass("active");
			  			$(this).addClass("active");
			  			
			  			var sContent = '<div class="wr-w2">'+
										'<div class="mask"></div>'+
										'<div class="content">'+
											'<h5>'+innovationCenterList[index].name+'</h5>'+
											'<p>中心介绍：'+innovationCenterList[index].introduce+'</p>'+
											'<p>中心地址：'+innovationCenterList[index].address+'</p>'+
											'<div class="cbtn-w">'+
												'<a target="_blank" href="'+innovationCenterList[index].homepage+'" class="com-btn zxzy"></a>'+
											'</div>'+
										'</div>'+
									'</div>';
			  			
	  					openInfoWindow(innovationCenterList[index].longitude, innovationCenterList[index].latitude, sContent);
  			  		})
	  			  })
		  		  
		  		  
	  			
	  			//企业分布
	  			var nameArr = [];
		  		var dataArr = [];
	  			for(var i = 0; i < companyDistribution.length; i ++){
	  				nameArr.push(companyDistribution[i].name);
	  				dataArr.push(companyDistribution[i].count);
	  			}
	  			
	  	    	var colors = Highcharts.getOptions().colors;
	  			$.each(colors, function(i, color) {
	  				colors[i] = {
	  					linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
	  					stops: [
	  						[0, "#5D4BA5"],
	  						[0.2, "#6F5CCE"],
	  						[0.4, '#8460CD'],
	  						[0.6, '#BD7BEA'],
	  						[0.8, '#D186E8'],
	  						[1, "#8963B4"]
	  					]
	  				};
	  			});
	  			// Create the chart
	  			var chart = new Highcharts.Chart({
	  				chart: {
	  					renderTo: 'chart',
	  					type: 'column',
	  					backgroundColor: 'rgba(0,0,0,0)'
	  				},
	  				title: {
	  					text: '各工业区企业数量分布'
	  				},
	  				xAxis: {
	  					categories: nameArr,
	  					tickLength:5,
		                min:0, //别忘了这里
        				max:10
	  				},
	  				yAxis:{
	  					title:{
	  						text:''
	  					},
	  					labels:{
	  						enabled:false
	  				   }
	  				},
	  				tooltip: {
	  					pointFormatter: function() {
	  					    return '<b>'+ this.y +'</b>'
	  					}
	  				},
	  				//设置滚动条   
	  				scrollbar: {
	  					enabled: true
	  				},
	  				series: [{
	  					data: dataArr,
	  					showInLegend: false
	  				}],
	  				credits:{
	  				     enabled: false // 禁用版权信息
	  				}
	  			});
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