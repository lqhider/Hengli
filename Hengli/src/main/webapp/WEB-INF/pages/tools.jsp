<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>横沥模具产业</title>
	<link rel="stylesheet" type="text/css" href="resources/css/reset.css">
	<link rel="stylesheet" type="text/css" href="resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="resources/css/jquery.mloading.css">
	<script type="text/javascript" src="resources/js/jquery.js"></script>
	<script type="text/javascript" src="resources/js/plugins/jquery.form.js"></script>
	<script type="text/javascript" src="resources/js/plugins/jquery.mloading.js"></script>
	
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	    <style type="text/css">  
		html{height:100%}  
		body{height:100%;margin:0px;padding:0px}  
		img{max-width: inherit;}
		#container{height:100%}  
		.anchorBL {display: none;}
		.upload-file{
	      position: relative;
	      display: inline-block;
	      width: 200px;
	      padding: 10px 15px;
	      border: 1px solid rgb(119, 154, 80);
	      border-radius: 5px;
	      background-color: rgb(66, 215, 142);
	      color: white;
	      font-size: 17px;
	      text-align: center;
	      overflow: hidden;
	    }
	    .upload-file span{ //单行显示
	      text-overflow: ellipsis;
	      white-space: nowrap;
	      overflow: hidden;
	    }
	
	    .upload-file:hover{ //简单的hover效果
	      font-size: 15px;
	      border-color: rgb(39, 226, 81);
	    }
	
	    .upload-file input[type='file']{
	      height: 100%;
	      width: 100%;
	      position: absolute; //设置为绝对定位，不会影响到其他元素
	      top: 0;
	      right: 0;
	      opacity: 0;   //透明度为0
	      filter: alpha(opacity=0);
	      cursor: pointer;
	    }
	    
		</style>
</head>
<body>
	<div class="main-body">
		<div class="container">
			<!-- header -->
			<div class="header clearfix">
			</div>
			<!-- wrapper -->
			<div class="wrapper clearfix">
				<!-- left -->
				<!-- <div class="w-left">
					
				</div> -->
				<!-- right -->
				<div >
					<div >
						<div style="text-align:center">
							<div style="font-size:25px;font-weight:bold;color: #fff">导入全部数据</div>
							<div style="padding-top: 50px">
								<form id="relationForm">
									<div class="upload-file" id="file1">
							        	<input type="file" class="input-file" multiple="true" id="upfileInp" name="upfileInp">
							        	<div class="tip">选择导入数据文件</div>
							        	<div class="showFileName1"></div>
							      	</div>
							      	<div style="margin-left:30px;position: relative;display: inline-block;padding: 10px 15px;border: 1px solid #1E90FF;border-radius: 5px;background-color: #1E90FF;overflow: hidden;">
										<a id="importData" style="background: #1E90FF;cursor: pointer;outline: none;color: white;font-size: 17px;" href="javascript:void(0)">点击导入数据</a>
									</div>
						      	</form>
							</div>
						</div>
						<div style="padding-top: 60px;text-align:center">
							<div style="font-size:25px;font-weight:bold;color: #fff">获取经纬度</div>
							<div style="padding-top: 50px">
								<a id="companyCoordinate" style="width: 300px;height: 60px;line-height: 60px;padding: 0 11px;border: 1px #26bbdb solid;border-radius: 3px;display: inline-block;background: #1E90FF;cursor: pointer;outline: none;color: white;font-size: 17px;" href="javascript:void(0)">点此获取企业的经纬度</a>
							</div>
							<div style="padding-top: 50px">
								<a id="collegesCoordinate" style="width: 300px;height: 60px;line-height: 60px;padding: 0 11px;border: 1px #26bbdb solid;border-radius: 3px;display: inline-block;background: #1E90FF;cursor: pointer;outline: none;color: white;font-size: 17px;" href="javascript:void(0)">点此获取院校的经纬度</a>
							</div>
							<div style="padding-top: 50px">
								<a id="designCompanyCoordinate" style="width: 300px;height: 60px;line-height: 60px;padding: 0 11px;border: 1px #26bbdb solid;border-radius: 3px;display: inline-block;background: #1E90FF;cursor: pointer;outline: none;color: white;font-size: 17px;" href="javascript:void(0)">点此获取设计公司的经纬度</a>
							</div>
							<div style="padding-top: 50px">
								<a id="innovationCenterCoordinate" style="width: 300px;height: 60px;line-height: 60px;padding: 0 11px;border: 1px #26bbdb solid;border-radius: 3px;display: inline-block;background: #1E90FF;cursor: pointer;outline: none;color: white;font-size: 17px;" href="javascript:void(0)">点此获取创新中心的经纬度</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
var contextPath="${pageContext.request.contextPath }";
</script>
<script type="text/javascript">
	$(function(){
		$("#companyCoordinate").click(function(){
			ajaxFactory('正在获取经纬度,请稍后',"post",contextPath+"/tools/getCompanyLongitudeLatitude",null).done(function(result){
				  $("body").mLoading("hide");
			  	  if(result.status=="true"){
			  	  	alert('获取企业经纬度执行成功!');
			  	  }else{
			  		alert('获取企业经纬度执行失败!');
			  	  }
			})
		});
		$("#collegesCoordinate").click(function(){
			ajaxFactory('正在获取经纬度,请稍后',"post",contextPath+"/tools/getCollegesLongitudeLatitude",null).done(function(result){
					$("body").mLoading("hide");
			  	  if(result.status=="true"){
			  		  alert('获取院校经纬度执行成功!');
			  	  }else{
			  		alert('获取院校经纬度执行失败!');
			  	  }
			})
		});
		$("#designCompanyCoordinate").click(function(){
			ajaxFactory('正在获取经纬度,请稍后',"post",contextPath+"/tools/getDesignCompanyLongitudeLatitude",null).done(function(result){
				$("body").mLoading("hide");
			  	  if(result.status=="true"){
			  		  alert('获取设计公司经纬度执行成功!');
			  	  }else{
			  		alert('获取设计公司经纬度执行失败!');
			  	  }
			})
		});
		$("#innovationCenterCoordinate").click(function(){
			ajaxFactory('正在获取经纬度,请稍后',"post",contextPath+"/tools/getInnovationCenterLongitudeLatitude",null).done(function(result){
				$("body").mLoading("hide");
			  	  if(result.status=="true"){
			  		  alert('获取创新中心经纬度执行成功!');
			  	  }else{
			  		alert('获取创新中心经纬度执行失败!');
			  	  }
			})
		})
		
		
		$("#file1").on("change","input[type='file']",function(){
		  var filePath=$(this).val();
		     if(filePath.indexOf("xls")!=-1 || filePath.indexOf("xlsx")!=-1){
		         $(".tip").html("").hide();
		         var arr=filePath.split('\\');
		         var fileName=arr[arr.length-1];
		         $(".showFileName1").html(fileName);
		     }else{
		         $(".showFileName1").html("");
		         $(".tip").html("您未上传文件，或者您上传文件类型有误！").show();
		         return false;
		     };
		 });
		
		$("#importData").click(function(){
			$.fileUpload();
		})
		
		// 文件上传
		$.fileUpload = function() {
			
			var options = {
				type : "POST", // 默认是form的method（get or post），如果申明，则会覆盖
				url : contextPath + "/tools/importData", // 默认是form的action，
				dataType : 'json',
				data : {
					fileName:"upfileInp",
				},
				clearForm : true, // 成功提交后，清除所有表单元素的值
				beforeSend:function() {  
					$("body").mLoading({
					    text:"正在导入数据,请稍后"
					});
                },
				success : function(result) {
					$("body").mLoading("hide");
					if(result.status=="true"){
						alert("导入成功!");
					}else{
						alert("导入失败!");
					}
				},
				error:function() {
                    $("body").mLoading("hide");
                    alert("导入失败!");
                }
			}
			$("#relationForm").ajaxSubmit(options);
		}
	})
	
	//ajax请求
	function ajaxFactory(txt,method,url,param) { //method:请求类型，url：请求地址,param:请求参数
	    var defer = $.Deferred();
	    $.ajax({
	        type: method,
	        url:  url,
	        data: param,
	        dataType: "json",
	        beforeSend:function() {  
				$("body").mLoading({
				    text:txt
				});
            },
	        success: function(result) {
	            defer.resolve(result);
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	        	$("body").mLoading("hide");
	        	console.log("Ajax请求出错！")
	        }
	    });
	    return defer.promise();
	}
</script>

</html>

