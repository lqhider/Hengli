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
		  			
		  			getJyzxData();
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
		  			
		  			getJyzxData();
		  		})
			  })
	  	  }
    	})
    	
    	getJyzxData();
    	
    	$(".search-btn").click(function(){
    		getJyzxData();
  		})
    	
    	//获取院校列表
    	function getJyzxData(){
    		//清空标注
    		clearOverlays();
    		
    		var param = {
    				name:$("#name").val(),
    				first_classification:$("#yjfl a.active").attr("fl"),
    				second_classification:$("#ejfl a.active").attr("fl")
    		}
        	//ajax
        	ajaxFactory("post",contextPath+"/jyzx/getJyzxData",param).done(function(result){
		  	  if(result.status=="true"){
		  		  var data = result.data;
		  		  var collegesList = data.collegesList;
		  		  
		  		  //院校列表
		  		  var html="";
		  		  for(var i = 0; i < collegesList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)" yx="'+collegesList[i].id+'"><h3>'+collegesList[i].name+'</h3>'+
								'<p class="clearfix"><span>师资数量：'+collegesList[i].teachers_num+'    </span><span>课程数量：'+collegesList[i].course_num+'</span></p>'+
								'<p class="clearfix"><span>资料数量：'+collegesList[i].datum_num+'   </span></p><p class="clearfix"><span class="blo">报名培训数量：'+collegesList[i].enroll_num+'</span></p></a>';
		  			  
		  			var sContent = '<div class="wr-w1 sjszy-w2">'+
										'<div class="mask"></div><div class="closeBtn"></div>'+
										'<div class="content">'+
											'<h5>'+collegesList[i].name+'</h5>'+
											'<p>师资数量：'+collegesList[i].teachers_num+'</p>'+
											'<p>课程数量：'+collegesList[i].course_num+'</p>'+
											'<p>资料数量：'+collegesList[i].datum_num+'</p>'+
											'<p>报名培训数量：'+collegesList[i].enroll_num+'</p>'+
											'<div class="cbtn-w">'+
												'<a target="_blank" href="'+collegesList[i].homepage+'" class="com-btn yxzy"></a>'+
											'</div>'+
										'</div>'+
									'</div>';
		  			  
		  			  //地图标注
		  			  addMarker(collegesList[i].longitude,collegesList[i].latitude,sContent);
		  		  }
		  		  $("#yxlb").empty().append(html);
		  		  
		  		  $("#yxlb a").each(function(index, element) {
  			  		$(this).click(function(){
  			  			$("#yxlb a").removeClass("active");
  			  			$(this).addClass("active");
  			  			
	  			  		var sContent = '<div class="wr-w1 sjszy-w2">'+
											'<div class="mask"></div><div class="closeBtn"></div>'+
											'<div class="content">'+
												'<h5>'+collegesList[index].name+'</h5>'+
												'<p>师资数量：'+collegesList[index].teachers_num+'</p>'+
												'<p>课程数量：'+collegesList[index].course_num+'</p>'+
												'<p>资料数量：'+collegesList[index].datum_num+'</p>'+
												'<p>报名培训数量：'+collegesList[index].enroll_num+'</p>'+
												'<div class="cbtn-w">'+
													'<a target="_blank" href="'+collegesList[index].homepage+'" class="com-btn yxzy"></a>'+
												'</div>'+
											'</div>'+
										'</div>';
  			  			
	  					openInfoWindow(collegesList[index].longitude, collegesList[index].latitude, sContent);
	  					
	  					getLectureTeacher();
  			  		})
	  			  })
		  	  }
        	}) 
    	}
    	
    	function getLectureTeacher(){
    		var param = {
    			colleges:$("#yxlb a.active").attr("yx")
    		}
    		//ajax
        	ajaxFactory("post",contextPath+"/jyzx/getLectureTeacher",param).done(function(result){
		  	  if(result.status=="true"){
		  		  var data = result.data;
		  		  var lectureList = data.lectureList;
		  		  var teacherList = data.teacherList;
		  		  
		  		  //讲座列表
		  		  var html="";
		  		  for(var i = 0; i < lectureList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>'+lectureList[i].theme+'</h3>'+
								'<p>时间：'+lectureList[i].time+'</p><p>地址：'+lectureList[i].address+'</p></a>';
		  		  }
		  		  $("#jzlb").empty().append(html);
		  		  
		  		  //添加讲座的点击事件
			  	  $("#jzlb a").each(function(index, element) {
			  		$(this).click(function(){
			  			$("#yxlb a").removeClass("active");
			  			$("#jzlb a").removeClass("active");
			  			$("#jslb a").removeClass("active");
			  			$(this).addClass("active");
			  			
			  			var sContent = '<div class="wr-w1 yx-w1">'+
										'<div class="mask"></div><div class="closeBtn"></div>'+
										'<div class="content">'+
											'<h5>'+lectureList[index].cname+'</h5>'+
											'<p>主题：'+lectureList[index].theme+'</p>'+
											'<p>授课教师：'+lectureList[index].tname+'</p>'+
											'<p>课程类型：'+lectureList[index].course_type+'</p>'+
											'<p>课程费用：'+lectureList[index].course_fee+'</p>'+
											'<div class="cbtn-w">'+
												'<a target="_blank" href="'+lectureList[index].details_page+'" class="com-btn jzhdxq"></a>'+
											'</div>'+
										'</div>'+
									'</div>';
			  			
			  			openInfoWindow(lectureList[index].longitude, lectureList[index].latitude, sContent);
			  		})
				  })
		  		  
		  		  //讲师列表
		  		  html="";
		  		  for(var i = 0; i < teacherList.length; i ++){
		  			  
		  			  html += '<a href="javascript:void(0)"><h3>姓名：'+teacherList[i].tname+'</h3><p>所属院校：'+teacherList[i].cname+'</p>'+
								'<p>工作年限：'+teacherList[i].work_year+'</p><p>课程数量：'+teacherList[i].course_num+'</p></a>';
		  		  }
		  		  $("#jslb").empty().append(html);
		  		  
		  		  //添加讲师的点击事件
			  	  $("#jslb a").each(function(index, element) {
			  		$(this).click(function(){
			  			$("#yxlb a").removeClass("active");
			  			$("#jzlb a").removeClass("active");
			  			$("#jslb a").removeClass("active");
			  			$(this).addClass("active");
			  			
			  			var sContent = '<div class="wr-w2 yx-w">'+
										'<div class="mask"></div><div class="closeBtn"></div>'+
										'<div class="content">'+
											'<h5>姓名：'+teacherList[index].tname+'</h5>'+
											'<p>所属院校：'+teacherList[index].cname+'</p>'+
											'<p>工作年限：'+teacherList[index].work_year+'</p>'+
											'<p>课程数量：'+teacherList[index].course_num+'</p>'+
											'<p>讲师简介：'+teacherList[index].summary+'</p>'+
											'<div class="cbtn-w">'+
												'<a target="_blank" href="'+teacherList[index].homepage+'" class="com-btn yxzy"></a>'+
											'</div>'+
										'</div>'+
									'</div>';
			  			
			  			openInfoWindow(teacherList[index].longitude, teacherList[index].latitude, sContent);
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