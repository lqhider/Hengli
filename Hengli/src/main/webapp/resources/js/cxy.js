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
		  			
		  			getCxyData();
		  		})
			  })
	  	  }
    	})
    	
    	getCxyData();
    	getInnovateNum();
    	
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
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>'+companyList[i].name+'</h3>';
//			  			if(companyList[i].conundrum_number != null && companyList[i].conundrum_number!=''){
//			  				html += '<p>难题数量：'+companyList[i].conundrum_number+'</p>';
//			  			}
//			  			if(companyList[i].cooperate_number != null && companyList[i].cooperate_number!=''){
//			  				html += '<p>合作数量：'+companyList[i].cooperate_number+'</p>';
//			  			}
//			  			html += '</a>';
		  			  html += '<p>难题数量：'+(companyList[i].conundrum_number==null?"":companyList[i].conundrum_number)+
		  					  '</p><p>合作数量：'+(companyList[i].cooperate_number==null?"":companyList[i].cooperate_number)+'</p></a>';
		  			  
		  			var sContent = '<div class="wr-w2">'+
										'<div class="mask"></div><div class="closeBtn"></div>'+
										'<div class="content">'+
											'<h5>'+companyList[i].name+'</h5>';
		  			if(companyList[i].conundrum_number != null && companyList[i].conundrum_number!=''){
		  				sContent += '<p>难题数量：'+companyList[i].conundrum_number+'</p>';
		  			}
		  			if(companyList[i].cooperate_number != null && companyList[i].cooperate_number!=''){
		  				sContent += '<p>合作数量：'+companyList[i].cooperate_number+'</p>';
		  			}
//											'<p>难题数量：'+companyList[i].conundrum_number+'</p>'+
//											'<p>合作数量：'+companyList[i].cooperate_number+'</p>'+
//											'<div class="cbtn-w">'+
		  			sContent += '<div class="cbtn-w">';
		  			if(companyList[i].homepage != null && companyList[i].homepage != ''){
		  				sContent += '<a target="_blank" href="'+companyList[i].homepage+'" class="com-btn gszy"></a>';
		  			}
		  			if(companyList[i].conundrum_more != null && companyList[i].conundrum_more != ''){
		  				sContent += '<a target="_blank" href="'+companyList[i].conundrum_more+'" class="com-btn gdnt"></a>';
		  			}else{
		  				sContent += '<a target="_blank" href="http://iur.casicloud.com/view/problem_list.htm" class="com-btn gdnt"></a>';
		  			}
		  			sContent += '</div></div></div>';
//												'<a target="_blank" href="'+companyList[i].homepage+'" class="com-btn gszy"></a>'+
//												'<a target="_blank" href="'+companyList[i].conundrum_more+'" class="com-btn gdnt"></a>'+
//											'</div>'+
//										'</div>'+
//									'</div>';
		  			  
		  			  //地图标注
		  			  addMarker(companyList[i].longitude, companyList[i].latitude, sContent);
		  		  }
		  		  $("#qylb").empty().append(html);
		  		  
		  		  //院校列表
		  		  html = "";
		  		  for(var i = 0; i < collegesList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>'+collegesList[i].name+'</h3>';
//			  			if((collegesList[i].expert_num != null && collegesList[i].expert_num!='') || (collegesList[i].achievement_num != null && collegesList[i].achievement_num!='')){
//			  				html += '<p class="clearfix">';
//			  				
//			  				if(collegesList[i].expert_num != null && collegesList[i].expert_num!=''){
//			  					html += '<span>专家数量：'+collegesList[i].expert_num+'</span>';
//				  			}
//				  			if(collegesList[i].achievement_num != null && collegesList[i].achievement_num!=''){
//				  				html += '<span>成果数量：'+collegesList[i].achievement_num+'</span>';
//				  			}
//				  			
//				  			html += '</p>';
//			  			}
//			  			if(collegesList[i].cooperate_num != null && collegesList[i].cooperate_num!=''){
//		  					html += '<p class="clearfix"><span>合作数量：'+collegesList[i].cooperate_num+'</span></p>';
//			  			}
//			  			html += '</a>';
		  			  html += '<p class="clearfix"><span>专家数量：'+(collegesList[i].expert_num==null?"":collegesList[i].expert_num)+'</span>'+
							'<span>成果数量：'+(collegesList[i].achievement_num==null?"":collegesList[i].achievement_num)+'</span></p>'+
							'<p class="clearfix"><span>合作数量：'+(collegesList[i].cooperate_num==null?"":collegesList[i].cooperate_num)+'</span></p></a>';
		  			  
		  			var sContent = '<div class="wr-w1">'+
										'<div class="mask"></div><div class="closeBtn"></div>'+
										'<div class="content">'+
											'<h5>'+collegesList[i].name+'</h5>';
		  			if(collegesList[i].expert_num != null && collegesList[i].expert_num!=''){
		  				sContent += '<p>专家数量：'+collegesList[i].expert_num+'</p>';
		  			}
		  			if(collegesList[i].achievement_num != null && collegesList[i].achievement_num!=''){
		  				sContent += '<p>成果数量：'+collegesList[i].achievement_num+'</p>';
		  			}
		  			if(collegesList[i].cooperate_num != null && collegesList[i].cooperate_num!=''){
		  				sContent += '<p>合作数量：'+collegesList[i].cooperate_num+'</p>';
		  			}
//											'<p>专家数量：'+collegesList[i].expert_num+'</p>'+
//											'<p>成果数量：'+collegesList[i].achievement_num+'</p>'+
//											'<p>合作数量：'+collegesList[i].cooperate_num+'</p>'+
//											'<div class="cbtn-w">'+
		  			sContent += '<div class="cbtn-w">';
		  			if(collegesList[i].homepage != null && collegesList[i].homepage != ''){
		  				sContent += '<a target="_blank" href="'+collegesList[i].homepage+'" class="com-btn yxzy"></a>';
		  			}
		  			if(collegesList[i].more_achievement != null && collegesList[i].more_achievement != ''){
		  				sContent += '<a target="_blank" href="'+collegesList[i].more_achievement+'" class="com-btn gdcg"></a>';
		  			}else{
		  				sContent += '<a target="_blank" href="http://iur.casicloud.com/view/achievement_list.htm" class="com-btn gdcg"></a>';
		  			}
		  			sContent += '</div></div></div>';
//												'<a target="_blank" href="'+collegesList[i].homepage+'" class="com-btn yxzy"></a>'+
//												'<a target="_blank" href="'+collegesList[i].more_achievement+'" class="com-btn gdcg"></a>'+
//											'</div>'+
//										'</div>'+
//									'</div>';
		  			  
		  			  //地图标注
		  			  addMarker(collegesList[i].longitude, collegesList[i].latitude, sContent);
		  		  }
		  		  $("#yxlb").empty().append(html);
		  		  
		  		  $("#qylb a").each(function(index, element) {
  			  		$(this).click(function(){
  			  			$("#qylb a").removeClass("active");
  			  			$("#yxlb a").removeClass("active");
  			  			$(this).addClass("active");
  			  			
  			  		var sContent = '<div class="wr-w2">'+
									'<div class="mask"></div><div class="closeBtn"></div>'+
									'<div class="content">'+
										'<h5>'+companyList[index].name+'</h5>';
	  			  	if(companyList[index].conundrum_number != null && companyList[index].conundrum_number!=''){
		  				sContent += '<p>难题数量：'+companyList[index].conundrum_number+'</p>';
		  			}
		  			if(companyList[index].cooperate_number != null && companyList[index].cooperate_number!=''){
		  				sContent += '<p>合作数量：'+companyList[index].cooperate_number+'</p>';
		  			}
//										'<p>难题数量：'+companyList[index].conundrum_number+'</p>'+
//										'<p>合作数量：'+companyList[index].cooperate_number+'</p>'+
//										'<div class="cbtn-w">'+
		  			sContent += '<div class="cbtn-w">';
		  			if(companyList[index].homepage != null && companyList[index].homepage != ''){
		  				sContent += '<a target="_blank" href="'+companyList[index].homepage+'" class="com-btn gszy"></a>';
		  			}
		  			if(companyList[index].conundrum_more != null && companyList[index].conundrum_more != ''){
		  				sContent += '<a target="_blank" href="'+companyList[index].conundrum_more+'" class="com-btn gdnt"></a>';
		  			}else{
		  				sContent += '<a target="_blank" href="http://iur.casicloud.com/view/problem_list.htm" class="com-btn gdnt"></a>';
		  			}
		  			sContent += '</div></div></div>';
//											'<a target="_blank" href="'+companyList[index].homepage+'" class="com-btn gszy"></a>'+
//											'<a target="_blank" href="'+companyList[index].conundrum_more+'" class="com-btn gdnt"></a>'+
//										'</div>'+
//									'</div>'+
//								'</div>';
  			  			
	  					openInfoWindow(companyList[index].longitude, companyList[index].latitude, sContent);
  			  		})
	  			  })
		  		  
  			  	  $("#yxlb a").each(function(index, element) {
  			  		$(this).click(function(){
  			  			$("#qylb a").removeClass("active");
			  			$("#yxlb a").removeClass("active");
			  			$(this).addClass("active");
			  			
			  			var sContent = '<div class="wr-w1">'+
							'<div class="mask"></div><div class="closeBtn"></div>'+
							'<div class="content">'+
								'<h5>'+collegesList[index].name+'</h5>';
			  			if(collegesList[index].expert_num != null && collegesList[index].expert_num!=''){
			  				sContent += '<p>专家数量：'+collegesList[index].expert_num+'</p>';
			  			}
			  			if(collegesList[index].achievement_num != null && collegesList[index].achievement_num!=''){
			  				sContent += '<p>成果数量：'+collegesList[index].achievement_num+'</p>';
			  			}
			  			if(collegesList[index].cooperate_num != null && collegesList[index].cooperate_num!=''){
			  				sContent += '<p>合作数量：'+collegesList[index].cooperate_num+'</p>';
			  			}
//								'<p>专家数量：'+collegesList[index].expert_num+'</p>'+
//								'<p>成果数量：'+collegesList[index].achievement_num+'</p>'+
//								'<p>合作数量：'+collegesList[index].cooperate_num+'</p>'+
//								'<div class="cbtn-w">'+
			  			sContent += '<div class="cbtn-w">';
			  			if(collegesList[index].homepage != null && collegesList[index].homepage != ''){
			  				sContent += '<a target="_blank" href="'+collegesList[index].homepage+'" class="com-btn yxzy"></a>';
			  			}
			  			if(collegesList[index].more_achievement != null && collegesList[index].more_achievement != ''){
			  				sContent += '<a target="_blank" href="'+collegesList[index].more_achievement+'" class="com-btn gdcg"></a>';
			  			}else{
			  				sContent += '<a target="_blank" href="http://iur.casicloud.com/view/achievement_list.htm" class="com-btn gdcg"></a>';
			  			}
			  			sContent += '</div></div></div>';
//									'<a target="_blank" href="'+collegesList[index].homepage+'" class="com-btn yxzy"></a>'+
//									'<a target="_blank" href="'+collegesList[index].more_achievement+'" class="com-btn gdcg"></a>'+
//								'</div>'+
//							'</div>'+
//						'</div>';
			  			
	  					openInfoWindow(collegesList[index].longitude, collegesList[index].latitude, sContent);
  			  		})
	  			  })
		  		  
		  	  }
        	}) 
    	}
    	
    	function getInnovateNum(){
    		ajaxFactory("post",contextPath+"/cxy/getInnovateNum",'').done(function(result){
  		  	  if(result.status=="true"){
  		  		  var data = result.data;
		  		  var innovateNum = data.innovateNum;
		  		  
			  		var dataArr = [];
			      	for(var i = 0; i < innovateNum.length; i ++){
			      		var obj = {};
			      		obj.industrial_area = innovateNum[i].name;
			      		obj.conundrum_number = innovateNum[i].conundrum_number;
			      		obj.cooperate_number = innovateNum[i].cooperate_number;
			      		obj.color1 = "#7C6ACC";
			      		obj.color2 = "#FFCD42";
			  			dataArr.push(obj);
			  		}
			      	
			      	var chart = AmCharts.makeChart("chart", {
			      	    "theme": "light",
			      	    "type": "serial",
			      	    /*"dataProvider": [{
			      	        "country": "USA",
			      	        "year2004": 3.5,
			      	        "year2005": 4.2,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "UK",
			      	        "year2004": 1.7,
			      	        "year2005": 3.1,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "Canada",
			      	        "year2004": 2.8,
			      	        "year2005": 2.9,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "Japan",
			      	        "year2004": 2.6,
			      	        "year2005": 2.3,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "France",
			      	        "year2004": 1.4,
			      	        "year2005": 2.1,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "Brazil",
			      	        "year2004": 2.6,
			      	        "year2005": 4.9,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "Russia",
			      	        "year2004": 6.4,
			      	        "year2005": 7.2,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "India",
			      	        "year2004": 8,
			      	        "year2005": 7.1,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "India",
			      	        "year2004": 8,
			      	        "year2005": 7.1,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "India",
			      	        "year2004": 8,
			      	        "year2005": 7.1,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "India",
			      	        "year2004": 8,
			      	        "year2005": 7.1,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "India",
			      	        "year2004": 8,
			      	        "year2005": 7.1,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "India",
			      	        "year2004": 8,
			      	        "year2005": 7.1,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "India",
			      	        "year2004": 8,
			      	        "year2005": 7.1,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }, {
			      	        "country": "China",
			      	        "year2004": 9.9,
			      	        "year2005": 10.1,
			      			"color1": "#7C6ACC",
			      			"color2": "#FFCD42"
			      	    }]*/
			      	    "dataProvider":dataArr,
			      	    "valueAxes": [{
			      	        "stackType": "3d",
			      	        "position": "left",
			      	        "title": "",
			      	        "labelsEnabled":false
			      	    }],
			      	    "startDuration": 1,
			      	    "graphs": [{
			      	        "balloonText": "[[category]] 难题数量 : <b>[[value]]</b>",
			      	        "fillAlphas": 0.9,
			      	        "lineAlpha": 0.2,
			      			"colorField": "color1",
			      	        "title": "难题数量",
			      	        "type": "column",
			      	        "valueField": "conundrum_number",
			      			"labelText": "[[value]]",
			      			"showAllValueLabels":true,
			      			"columnWidth":0.7
			      	    }, {
			      	        "balloonText": "[[category]] 合作数量 : <b>[[value]]</b>",
			      	        "fillAlphas": 0.9,
			      	        "lineAlpha": 0.2,
			      	        "colorField": "color2",
			      	        "title": "合作数量",
			      	        "type": "column",
			      	        "valueField": "cooperate_number",
			      			"labelText": "[[value]]",
			      			"showAllValueLabels":true,
			      			"columnWidth":0.7
			      	    }],
			      	    "plotAreaFillAlphas": 0.1,
			      	    "depth3D": 60,
			      	    "angle": 30,
			      	    "chartCursor": {
			      	    	"oneBalloonOnly":true
	  	  			    },
			      	    "categoryField": "industrial_area",
			      	    "categoryAxis": {
			      	        "gridPosition": "start"
			      	    },
			      	    "export": {
			      	    	"enabled": false
			      	     }
			      	});
			      	jQuery('.chart-input').off().on('input change',function() {
			      		var property	= jQuery(this).data('property');
			      		var target		= chart;
			      		chart.startDuration = 0;
	
			      		if ( property == 'topRadius') {
			      			target = chart.graphs[0];
			      	      	if ( this.value == 0 ) {
			      	          this.value = undefined;
			      	      	}
			      		}
	
			      		target[property] = this.value;
			      		chart.validateNow();
			      	});
  		  	  }
        	}) 
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
		});*/
    	
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