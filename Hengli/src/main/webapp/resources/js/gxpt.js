(function($){
	$(function(){
		//ajax获取一级分类
    	ajaxFactory("post",contextPath+"/classification/getFirstClassification",{}).done(function(result){
		  	  if(result.status=="true"){
		  		var data = result.data;
		  		
		  		var html = '<a href="javascript:void(0)" fl="">全部</a>';
		  		for(var i = 0; i < data.length; i ++){
		  			  html += '<a href="javascript:void(0)" fl="'+data[i].name+'">'+data[i].name+'</a>';
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
	  		
	  		var html = '<a href="javascript:void(0)" fl="">全部</a>';
	  		for(var i = 0; i < data.length; i ++){
	  			  html += '<a href="javascript:void(0)" fl="'+data[i].name+'">'+data[i].name+'</a>';
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
    	getCompanyDistribution();
    	
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
							'<h3>'+companyList[i].name+'</h3>';
//			  			if((companyList[i].product_number != null && companyList[i].product_number!='') || (companyList[i].need_number != null && companyList[i].need_number!='')){
//			  				html += '<p class="clearfix">';
//			  				
//			  				if(companyList[i].product_number != null && companyList[i].product_number!=''){
//			  					html += '<span>供应数量：'+companyList[i].product_number+'</span>';
//				  			}
//				  			if(companyList[i].need_number != null && companyList[i].need_number!=''){
//				  				html += '<span>需求数量：'+companyList[i].need_number+'</span>';
//				  			}
//				  			
//				  			html += '</p>';
//			  			}
//			  			if(companyList[i].custom_service_number != null && companyList[i].custom_service_number!=''){
//			  				html += '<p class="clearfix">定制服务数量：'+companyList[i].custom_service_number+'</p>';
//			  			}
//			  			html += '</a>';
		  			  html += '<p class="clearfix"><span>供应数量：'+(companyList[i].product_number==null?"":companyList[i].product_number)+
							'</span><span>需求数量：'+(companyList[i].need_number==null?"":companyList[i].need_number)+'</span></p>'+
							'<p class="clearfix">定制服务数量：'+(companyList[i].custom_service_number==null?"":companyList[i].custom_service_number)+'</p></a>';
		  			  
		  			var sContent = '<div class="wr-w1">'
						+'<div class="mask"></div><div class="closeBtn"></div>'
						+'<div class="content">'
							+'<h5>'+companyList[i].name+'</h5>';
		  			if(companyList[i].product_number != null && companyList[i].product_number!=''){
		  				sContent += '<p>供应数量：'+companyList[i].product_number+'</p>';
		  			}
		  			if(companyList[i].need_number != null && companyList[i].need_number!=''){
		  				sContent += '<p>需求数量：'+companyList[i].need_number+'</p>';
		  			}
		  			if(companyList[i].custom_service_number != null && companyList[i].custom_service_number!=''){
		  				sContent += '<p>定制服务数量：'+companyList[i].custom_service_number+'</p>';
		  			}
//							+'<p>供应数量：'+companyList[i].product_number+'</p>'
//							+'<p>需求数量：'+companyList[i].need_number+'</p>'
//							+'<p>定制服务数量：'+companyList[i].custom_service_number+'</p>'
//							+'<div class="cbtn-w">'
		  			sContent = sContent + '<div class="cbtn-w">';
		  			if(companyList[i].homepage != null && companyList[i].homepage != ''){
		  				sContent += '<a target="_blank" href="'+companyList[i].homepage+'" class="com-btn gszy"></a>';
		  			}
//								+'<a target="_blank" href="'+companyList[i].homepage+'" class="com-btn gszy"></a>'
		  			if(companyList[i].gxptURL != null && companyList[i].gxptURL != ''){
		  				sContent += '<a target="_blank" href="'+companyList[i].gxptURL+'" class="com-btn gxpt"></a>';
		  			}else{
		  				sContent += '<a target="_blank" href="http://mujuyun.btob.casicloud.com/view/b2b/b2bCapability/list.html" class="com-btn gxpt"></a>';
		  			}
		  			sContent += '</div></div></div>';
//								+'<a target="_blank" href="'+companyList[i].gxptURL+'" class="com-btn gxpt"></a>'
//							+'</div>'
//						+'</div>'
//					+'</div>';
		  			  
		  			  //地图标注
		  			  addMarker(companyList[i].longitude,companyList[i].latitude,sContent);
		  		  }
		  		  $("#qylb").empty().append(html);
		  		  
		  		  //创新中心列表
		  		  html="";
		  		  for(var i = 0; i < innovationCenterList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>'+innovationCenterList[i].name+'</h3></a>';
		  			  
		  			  var sContent = '<div class="wr-w2">'+
										'<div class="mask"></div><div class="closeBtn"></div>'+
										'<div class="content">'+
											'<h5>'+innovationCenterList[i].name+'</h5>';
		  			if(innovationCenterList[i].introduce != null && innovationCenterList[i].introduce!=''){
		  				sContent += '<p>中心介绍：'+innovationCenterList[i].introduce+'</p>';
		  			}
		  			if(innovationCenterList[i].address != null && innovationCenterList[i].address!=''){
		  				sContent += '<p>中心地址：'+innovationCenterList[i].address+'</p>';
		  			}
//											'<p>中心介绍：'+innovationCenterList[i].introduce+'</p>'+
//											'<p>中心地址：'+innovationCenterList[i].address+'</p>'+
//											'<div class="cbtn-w">'+
		  			sContent = sContent + '<div class="cbtn-w">';
		  			if(innovationCenterList[i].homepage != null && innovationCenterList[i].homepage != ''){
		  				sContent += '<a target="_blank" href="'+innovationCenterList[i].homepage+'" class="com-btn zxzy"></a>';
		  			}
		  			sContent += '</div></div></div>';
//												'<a target="_blank" href="'+innovationCenterList[i].homepage+'" class="com-btn zxzy"></a>'+
//											'</div>'+
//										'</div>'+
//									'</div>';
		  			  
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
										+'<div class="mask"></div><div class="closeBtn"></div>'
										+'<div class="content">'
											+'<h5>'+companyList[index].name+'</h5>';
		  			  	if(companyList[index].product_number != null && companyList[index].product_number!=''){
			  				sContent += '<p>供应数量：'+companyList[index].product_number+'</p>';
			  			}
			  			if(companyList[index].need_number != null && companyList[index].need_number!=''){
			  				sContent += '<p>需求数量：'+companyList[index].need_number+'</p>';
			  			}
			  			if(companyList[index].custom_service_number != null && companyList[index].custom_service_number!=''){
			  				sContent += '<p>定制服务数量：'+companyList[index].custom_service_number+'</p>';
			  			}
//											+'<p>供应数量：'+companyList[index].product_number+'</p>'
//											+'<p>需求数量：'+companyList[index].need_number+'</p>'
//											+'<p>定制服务数量：'+companyList[index].custom_service_number+'</p>'
//											+'<div class="cbtn-w">'
			  			sContent = sContent + '<div class="cbtn-w">';
			  			if(companyList[index].homepage != null && companyList[index].homepage != ''){
			  				sContent += '<a target="_blank" href="'+companyList[index].homepage+'" class="com-btn gszy"></a>';
			  			}
			  			if(companyList[index].gxptURL != null && companyList[index].gxptURL != ''){
			  				sContent += '<a target="_blank" href="'+companyList[index].gxptURL+'" class="com-btn gxpt"></a>';
			  			}else{
			  				sContent += '<a target="_blank" href="http://mujuyun.btob.casicloud.com/view/b2b/b2bCapability/list.html" class="com-btn gxpt"></a>';
			  			}
			  			sContent += '</div></div></div>';
//												+'<a target="_blank" href="'+companyList[index].homepage+'" class="com-btn gszy"></a>'
//												+'<a target="_blank" href="'+companyList[index].gxptURL+'" class="com-btn gxpt"></a>'
//											+'</div>'
//										+'</div>'
//									+'</div>';
  			  			
	  					openInfoWindow(companyList[index].longitude, companyList[index].latitude, sContent);
  			  		})
	  			  })
		  		  
  			  	  $("#cxzx a").each(function(index, element) {
  			  		$(this).click(function(){
  			  			$("#qylb a").removeClass("active");
			  			$("#cxzx a").removeClass("active");
			  			$(this).addClass("active");
			  			
			  			var sContent = '<div class="wr-w2">'+
										'<div class="mask"></div><div class="closeBtn"></div>'+
										'<div class="content">'+
											'<h5>'+innovationCenterList[index].name+'</h5>';
			  			if(innovationCenterList[index].introduce != null && innovationCenterList[index].introduce!=''){
			  				sContent += '<p>中心介绍：'+innovationCenterList[index].introduce+'</p>';
			  			}
			  			if(innovationCenterList[index].address != null && innovationCenterList[index].address!=''){
			  				sContent += '<p>中心地址：'+innovationCenterList[index].address+'</p>';
			  			}
//											'<p>中心介绍：'+innovationCenterList[index].introduce+'</p>'+
//											'<p>中心地址：'+innovationCenterList[index].address+'</p>'+
//											'<div class="cbtn-w">'+
			  			sContent = sContent + '<div class="cbtn-w">';
			  			if(innovationCenterList[index].homepage != null && innovationCenterList[index].homepage != ''){
			  				sContent += '<a target="_blank" href="'+innovationCenterList[index].homepage+'" class="com-btn zxzy"></a>';
			  			}
			  			sContent += '</div></div></div>';
//												'<a target="_blank" href="'+innovationCenterList[index].homepage+'" class="com-btn zxzy"></a>'+
//											'</div>'+
//										'</div>'+
//									'</div>';
			  			
	  					openInfoWindow(innovationCenterList[index].longitude, innovationCenterList[index].latitude, sContent);
  			  		})
	  			  })
		  		  
		  		  
		  	  }
        	}) 
    	}
    	
    	function getCompanyDistribution(){
    		
    		ajaxFactory("post",contextPath+"/gxpt/getCompanyDistribution",'').done(function(result){
  		  	  if(result.status=="true"){
  		  		var data = result.data;
  		  		var companyDistribution = data.companyDistribution;
  		  		
  		  		//企业分布
  	  			var nameArr = [];
  		  		var dataArr = [];
  	  			for(var i = 0; i < companyDistribution.length; i ++){
  	  				nameArr.push(companyDistribution[i].name);
  	  				dataArr.push(companyDistribution[i].count);
  	  			}
  	  			
  	  	    	/*var colors = Highcharts.getOptions().colors;
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
  	  			});*/
  	  			
  	  			var dataArr = [];
  	  			for(var i = 0; i < companyDistribution.length; i ++){
  	  				var obj = {};
  	  				obj.industrial_area = companyDistribution[i].name;
  	  				obj.count = companyDistribution[i].count;
  	  				obj.color = "#7C6ACC";
  	  				dataArr.push(obj);
  	  			}
  	  			
  	  			var chart = AmCharts.makeChart("chart", {
  	  			    "theme": "light",
  	  			    "type": "serial",
  	  			    "startDuration": 1,
  	  			    /*"dataProvider": [{
  	  			        "country": "USA",
  	  			        "visits": 4025,
  	  			        "color": "#7C6ACC",
  	  			    }, {
  	  			        "country": "China",
  	  			        "visits": 1882,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "Japan",
  	  			        "visits": 1809,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "Germany",
  	  			        "visits": 1322,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "UK",
  	  			        "visits": 1122,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "France",
  	  			        "visits": 1114,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "India",
  	  			        "visits": 984,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "Spain",
  	  			        "visits": 711,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "Netherlands",
  	  			        "visits": 665,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "Russia",
  	  			        "visits": 580,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "South Korea",
  	  			        "visits": 443,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "Canada",
  	  			        "visits": 441,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "Brazil",
  	  			        "visits": 395,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "Italy",
  	  			        "visits": 386,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "Taiwan",
  	  			        "visits": 338,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "123",
  	  			        "visits": 338,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "444",
  	  			        "visits": 338,
  	  			        "color": "#7C6ACC"
  	  			    }, {
  	  			        "country": "5555",
  	  			        "visits": 338,
  	  			        "color": "#7C6ACC"
  	  			    }],*/
  	  			    "dataProvider":dataArr,
  	  			    "valueAxes": [{
  	  			        "position": "left",
  	  			        "axisAlpha":0,
  	  			        "gridAlpha":0,
  	  			        "labelsEnabled":false
  	  			    }],
  	  			    "graphs": [{
  	  			        "balloonText": "[[category]]: <b>[[value]]</b>",
  	  			        "colorField": "color",
  	  			        "fillAlphas": 0.85,
  	  			        "lineAlpha": 0.1,
  	  			        "type": "column",
  	  			        "topRadius":1,
  	  			        "valueField": "count",
  	  					"labelText": "[[value]]",
  	  					"showAllValueLabels":true,
  	  			    }],
  	  			    "depth3D": 40,
  	  				"angle": 30,
  	  			    "chartCursor": {
  	  			        "categoryBalloonEnabled": true,
  	  			        "cursorAlpha": 0,
  	  			        "zoomable": true
  	  			    },
  	  			    "categoryField": "industrial_area",
  	  			    "categoryAxis": {
  	  			        "gridPosition": "start",
  	  			        "axisAlpha":0,
  	  			        "gridAlpha":0

  	  			    },
  	  			    "export": {
  	  			    	"enabled": false
  	  			     }

  	  			}, 0);
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