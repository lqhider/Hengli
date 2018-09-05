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
		  			
		  			getCxyData();
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
		  			
		  			getCxyData();
		  		})
			  })
	  	  }
    	})
    	
    	getCxyData();
    	
    	$(".search-btn").click(function(){
    		getCxyData();
  		})
    	
    	//获取企业列表和创新中心列表
    	function getCxyData(){
    		//清空标注
    		clearOverlays();
    		
    		var param = {
    				name:$("#name").val(),
    				first_classification:$("#yjfl a.active").attr("fl"),
    				second_classification:$("#ejfl a.active").attr("fl")
    		}
        	//ajax
        	ajaxFactory("post",contextPath+"/cxy/getCxyData",param).done(function(result){
		  	  if(result.status=="true"){
		  		  var data = result.data;
		  		  var companyList = data.companyList;
		  		  var collegesList = data.collegesList;
		  		  
		  		  //企业列表
		  		  var html="";
		  		  for(var i = 0; i < companyList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>'+companyList[i].name+'</h3>'+
								'<p>难题数量：'+companyList[i].conundrum_number+'</p><p>合作数量：'+companyList[i].cooperate_number+'</p></a>';
		  			  
		  			/*var sContent = '<div style="width: 340px;position: absolute;top: 140px;right: 15px;padding: 15px 15px 5px 15px;z-index: 8;">'+
										'<div style="position: absolute;width: 100%;height: 100%;left: 0;right: 0;top: 0;background: #6452e7;opacity: 0.7;z-index:8;"></div>'+
										'<div style="position: relative;z-index: 9;color: #fff;font-size: 14px;">'+
											'<h5>东莞市天倬模具有限公司</h5>'+
											'<p>供应数量：</p>'+
											'<p>需求数量：</p>'+
											'<p>定制服务数量：</p>'+
											'<div style="text-align: right;margin-top: 10px;">'+
												'<a href="#" style="width: 87px;height: 24px;display:block;margin: 0px auto;background: url(../images/gszy.png) no-repeat;"></a>'+
												'<a href="#" style="width: 87px;height: 24px;display:block;margin: 0px auto; background: url(../images/gxpt.png) no-repeat;margin-left: 10px;"></a>'+
											'</div>'+
										'</div>'+
									'</div>';*/
		  			var sContent = '<div class="wr-w1">'+
										'<div class="mask"></div>'+
										'<div class="content">'+
											'<h5>东莞市天倬模具有限公司</h5>'+
											'<p>供应数量：</p>'+
											'<p>需求数量：</p>'+
											'<p>定制服务数量：</p>'+
											'<div class="cbtn-w">'+
												'<a href="#" class="com-btn gszy"></a>'+
												'<a href="#" class="com-btn gxpt"></a>'+
											'</div>'+
										'</div>'+
									'</div>';
		  			  
		  			  //地图标注
		  			  addMarker(companyList[i].longitude,companyList[i].latitude,sContent);
		  		  }
		  		  $("#qylb").empty().append(html);
		  		  
		  		  //院校列表
		  		  html = "";
		  		  for(var i = 0; i < collegesList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>'+collegesList[i].name+'</h3>'+
							'<p class="clearfix"><span>专家数量：'+collegesList[i].expert_num+'</span>'+
							'<span>成果数量：'+collegesList[i].achievement_num+'</span></p>'+
							'<p class="clearfix"><span>合作数量：'+collegesList[i].cooperate_num+'</span></p></a>';
		  			  
		  			  //地图标注
		  			  addMarker(collegesList[i].longitude,collegesList[i].latitude,'');
		  		  }
		  		  $("#yxlb").empty().append(html);
		  		  
		  		  $("#qylb a").each(function(index, element) {
  			  		$(this).click(function(){
  			  			$("#qylb a").removeClass("active");
  			  			$("#yxlb a").removeClass("active");
  			  			$(this).addClass("active");
  			  			
	  					openInfoWindow(companyList[index].longitude, companyList[index].latitude,'');
  			  		})
	  			  })
		  		  
  			  	  $("#yxlb a").each(function(index, element) {
  			  		$(this).click(function(){
  			  			$("#qylb a").removeClass("active");
			  			$("#yxlb a").removeClass("active");
			  			$(this).addClass("active");
	  					openInfoWindow(collegesList[index].longitude, collegesList[index].latitude,'');
  			  		})
	  			  })
		  		  
		  	  }
        	}) 
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
				type: 'column'
			},
			title: {
				text: '各工业区企业数量分布'
			},
			xAxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			},
			yAxis:{
				title:{
					text:''
				},
				labels:{
					enabled:false
			   }
			},
			series: [{
				data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
				showInLegend: false
			}],
			credits:{
			     enabled: false // 禁用版权信息
			}
		});
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