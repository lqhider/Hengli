<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>横沥模具产业</title>
	<link rel="stylesheet" type="text/css" href="resources/css/reset.css">
	<link rel="stylesheet" type="text/css" href="resources/css/main.css">
	<script type="text/javascript" src="resources/js/jquery.js"></script>
	
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	    <style type="text/css">  
		html{height:100%}  
		body{height:100%;margin:0px;padding:0px}  
		img{max-width: inherit;}
		#container{height:100%}  
		.anchorBL {display: none;}
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
							<div style="font-size:25px;font-weight:bold;color: #fff">导入数据</div>
							<div></div>
						</div>
						<div style="padding-top: 300px;text-align:center">
							<div style="font-size:25px;font-weight:bold;color: #fff">获取经度纬度</div>
							<div style="padding-top: 50px">
								<a id="getCoordinate" style="width: 350px;height: 60px;line-height: 60px;padding: 0 11px;border: 1px #26bbdb solid;border-radius: 3px;display: inline-block;background: #1E90FF;cursor: pointer;outline: none;color: white;font-size: 17px;" href="javascript:void(0)">点此获取企业、院校、设计公司的经纬度</a>
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
		$("#getCoordinate").click(function(){
			ajaxFactory("post",contextPath+"/tools/getLongitudeLatitude",null).done(function(result){
			  	  if(result.status=="true"){
			  		  alert('获取经度纬度执行成功!');
			  	  }
			})
		})
	})
	
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
</script>

</html>

