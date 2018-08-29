<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="resources/css/cube-min.css" />
    <link rel="stylesheet" href="resources/css/index-gx.css"/>
    <script type="text/javascript" src="resources/js/libs/jquery.js"></script>
    <script type="text/javascript" src="resources/js/plugins/jquery.nicescroll.js"></script>
    
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">  
	html{height:100%}  
	body{height:100%;margin:0px;padding:0px}  
	img{max-width: inherit;}
	#container{height:100%}  
	</style>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=6xnpV6UuLrzn9p6eow4HW3l2Ra1sER6E"></script>
</head>

<body>
	<div class="con_box">
			<div class="con_left" id="container"></div>
	</div>
</body>
<script type="text/javascript">
var contextPath="${pageContext.request.contextPath }";

	//百度地图API功能
	var map = new BMap.Map("container");    // 创建Map实例
	var point = new BMap.Point(117.162252,39.166211);
	map.centerAndZoom(point,19);  // 初始化地图,设置中心点坐标和地图级别
	/* //添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
	        BMAP_NORMAL_MAP,
	        BMAP_HYBRID_MAP
	    ]})); */	  
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	
	// 初始化地图， 设置中心点坐标和地图级别
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);

	function addMarker(arr){
		for(var i = 0; i < arr.length; i ++){
			
			var infoBox = new BMapLib.InfoBox(map,html.join(""),{
				boxStyle:{
					background:"no-repeat center top"
					,width: "270px"
					,height: "300px"
				},
				closeIconMargin: "1px 1px 0 0",
				enableAutoPan: true,
				align: INFOBOX_AT_TOP
			});
			
			var point = new BMap.Point(arr[i].lng, arr[i].lat);
			var marker = new BMap.Marker(point);
			map.addOverlay(marker);
			
			infoBox.open(marker);
		}
	}
</script>
</html>