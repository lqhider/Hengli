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
	
	map.setMapStyle({
		styleJson:[
	          {
                  "featureType": "water",
                  "elementType": "all",
                  "stylers": {
                            "color": "#292081"
                  }
        },
        {
                  "featureType": "highway",
                  "elementType": "geometry.fill",
                  "stylers": {
                            "color": "#000000"
                  }
        },
        {
                  "featureType": "highway",
                  "elementType": "geometry.stroke",
                  "stylers": {
                            "color": "#147a92"
                  }
        },
        {
                  "featureType": "arterial",
                  "elementType": "geometry.fill",
                  "stylers": {
                            "color": "#000000"
                  }
        },
        {
                  "featureType": "arterial",
                  "elementType": "geometry.stroke",
                  "stylers": {
                            "color": "#0b3d51"
                  }
        },
        {
                  "featureType": "local",
                  "elementType": "geometry",
                  "stylers": {
                            "color": "#000000"
                  }
        },
        {
                  "featureType": "land",
                  "elementType": "all",
                  "stylers": {
                            "color": "#2A2081"
                  }
        },
        {
                  "featureType": "railway",
                  "elementType": "geometry.fill",
                  "stylers": {
                            "color": "#000000"
                  }
        },
        {
                  "featureType": "railway",
                  "elementType": "geometry.stroke",
                  "stylers": {
                            "color": "#2A2081"
                  }
        },
        {
                  "featureType": "subway",
                  "elementType": "geometry",
                  "stylers": {
                            "lightness": -70
                  }
        },
        {
                  "featureType": "building",
                  "elementType": "geometry.fill",
                  "stylers": {
                            "color": "#000000"
                  }
        },
        {
                  "featureType": "all",
                  "elementType": "labels.text.fill",
                  "stylers": {
                            "color": "#857f7f"
                  }
        },
        {
                  "featureType": "all",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                            "color": "#000000"
                  }
        },
        {
                  "featureType": "building",
                  "elementType": "geometry",
                  "stylers": {
                            "color": "#022338"
                  }
        },
        {
                  "featureType": "green",
                  "elementType": "geometry",
                  "stylers": {
                            "color": "#062032"
                  }
        },
        {
                  "featureType": "boundary",
                  "elementType": "all",
                  "stylers": {
                            "color": "#6480CC"
                  }
        },
        {
                  "featureType": "manmade",
                  "elementType": "geometry",
                  "stylers": {
                            "color": "#022338"
                  }
        },
        {
                  "featureType": "poi",
                  "elementType": "all",
                  "stylers": {
                            "visibility": "off"
                  }
        },
        {
                  "featureType": "all",
                  "elementType": "labels.icon",
                  "stylers": {
                            "visibility": "off"
                  }
        },
        {
                  "featureType": "all",
                  "elementType": "labels.text.fill",
                  "stylers": {
                            "color": "#ffffffff",
                            "visibility": "on"
                  }
        }
]
	});
	
	var point = new BMap.Point(113.972995,23.024814);
	map.centerAndZoom(point,15);  // 初始化地图,设置中心点坐标和地图级别
	/* //添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
	        BMAP_NORMAL_MAP,
	        BMAP_HYBRID_MAP
	    ]})); */	  
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	
	// 初始化地图， 设置中心点坐标和地图级别
	//var marker = new BMap.Marker(point);
	//map.addOverlay(marker);

	function addMarker(longitude,latitude,sContent){
			
		var pointEach = new BMap.Point(longitude, latitude);
		var markerEach = new BMap.Marker(pointEach);
		map.addOverlay(markerEach);
		
		var infoWindow = new BMap.InfoWindow(sContent);
		markerEach.addEventListener("click", function(){          
		   this.openInfoWindow(infoWindow);
		});
	}
	
	function openInfoWindow(longitude,latitude,sContent){
		var pointEach = new BMap.Point(longitude, latitude);
		var markerEach = new BMap.Marker(pointEach);
		var infoWindow = new BMap.InfoWindow(sContent);
		
		var infoWindow = new BMap.InfoWindow(sContent);
		markerEach.openInfoWindow(infoWindow);
	}
</script>
</html>