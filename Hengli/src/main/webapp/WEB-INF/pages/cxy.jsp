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
	<script type="text/javascript" src="resources/js/highcharts.js"></script>
	<script type="text/javascript" src="resources/js/cxy.js"></script>
	
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	    <style type="text/css">  
		html{height:100%}  
		body{height:100%;margin:0px;padding:0px}  
		img{max-width: inherit;}
		#container{height:100%}  
		.anchorBL {display: none;}
		</style>
		<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=6xnpV6UuLrzn9p6eow4HW3l2Ra1sER6E"></script>
</head>
<body>
	<div class="main-body">
		<div class="container">
			<!-- header -->
			<div class="header clearfix">
				<a href="#" class="logo">
					<img src="resources/images/logo.png">
				</a>
				<div class="nav clearfix">
					<a href="#">供需平台</a>
					<a href="#" class="active">产学研</a>
					<a href="#">教育在线</a>
					<a href="#">设计联盟</a>
				</div>
				<div class="search">
					<input type="text" id="name"/>
					<a href="javascript:void(0);" class="search-btn"></a>
				</div>
			</div>
			<!-- wrapper -->
			<div class="wrapper clearfix">
				<!-- left -->
				<div class="w-left">
					<div class="wl-wrap">
						<a class="com-t1" href="javascript:void(0)">一级分类</a>
						<div class="s-wrap">
							<div class="wl-cnt">
								<div class="wlc-wrap wlc-w1 clearfix" id="yjfl">
									<!-- <a href="#">冲压模具</a>
									<a href="#">简易模具</a>
									<a href="#">塑料成型模具</a>
									<a href="#" class="active">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">简易模具</a>
									<a href="#">塑料成型模具</a>
									<a href="#">冲压模具</a>
									<a href="#">简易模具</a>
									<a href="#">塑料成型模具</a>
									<a href="#">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">简易模具</a>
									<a href="#">塑料成型模具</a> -->
								</div>
							</div>
						</div>
					</div>
					<!-- 二级分类 -->
					<div class="wl-wrap">
						<a class="com-t1" href="javascript:void(0)">二级分类</a>
						<div class="s-wrap">
							<div class="wl-cnt">
								<div class="wlc-wrap wlc-w1 clearfix" id="ejfl">
									<!-- <a href="#">冲压模具</a>
									<a href="#">简易模具</a>
									<a href="#">塑料成型模具</a>
									<a href="#" class="active">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">简易模具</a>
									<a href="#">塑料成型模具</a>
									<a href="#">冲压模具</a>
									<a href="#">简易模具</a>
									<a href="#">塑料成型模具</a>
									<a href="#">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">冲压模具</a>
									<a href="#">简易模具</a>
									<a href="#">塑料成型模具</a> -->
								</div>
							</div>
						</div>
					</div>
					<!-- 企业列表 -->
					<div class="wl-wrap wl-wrap2">
						<a class="com-t1" href="javascript:void(0)">企业列表</a>
						<div class="s-wrap">
							<div class="wl-cnt">
								<div class="wlc-wrap wlc-w2 clearfix" id="qylb">
									<!-- <a href="#" class="active">
										<h3>杭州美意家电有限公司</h3>
										<p>难题数量：0</p>
										<p>合作数量：0</p>
									</a>
									<a href="#">
										<h3>杭州美意家电有限公司</h3>
										<p>难题数量：0</p>
										<p>合作数量：0</p>
									</a> -->
								</div>
							</div>
						</div>
					</div>
					<!-- 院校列表 -->
					<div class="wl-wrap">
						<a class="com-t1" href="javascript:void(0)">院校列表</a>
						<div class="s-wrap">
							<div class="wl-cnt">
								<div class="wlc-wrap wlc-w2 clearfix" id="yxlb">
									<!-- <a href="#" class="active">
										<h3>上海交通大学研究中心</h3>
										<p class="clearfix">
											<span>专家数量：0</span>
											<span>成果数量：0</span>
										</p>
										<p class="clearfix">
											<span>合作数量：0</span>
										</p>
									</a>
									<a href="#">
										<h3>上海交通大学磨具CAD国家工程研究中心</h3>
										<p class="clearfix">
											<span>专家数量：0</span>
											<span>成果数量：0</span>
										</p>
										<p class="clearfix">
											<span>合作数量：0</span>
										</p>
									</a> -->
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- right -->
				<div class="w-right">
					<div class="map-wrap">
						<div class="map" id="container">
							<!-- <img src="images/map.png"> -->
						</div>
						<!--  -->
						<!-- <div class="wr-w1">
							<div class="mask"></div>
							<div class="content">
								<h5>东莞市天倬模具有限公司</h5>
								<p>供应数量：</p>
								<p>需求数量：</p>
								<p>定制服务数量：</p>
								<div class="cbtn-w">
									<a href="#" class="com-btn gszy"></a>
									<a href="#" class="com-btn gdnt"></a>
								</div>
							</div>
						</div> -->
						<!--  -->
						<!-- <div class="wr-w2">
							<div class="mask"></div>
							<div class="content">
								<h5>模具装备节能创新中心</h5>
								<p>中心介绍：</p>
								<p>中心地址：东莞松山湖国家高新科技产业园区</p>
								<div class="cbtn-w">
									<a href="#" class="com-btn yxzy"></a>
									<a href="#" class="com-btn gdcg"></a>
								</div>
							</div>
						</div> -->
						<!-- 柱状图 -->
						<div class="d-b-w">
							<div class="mask"></div>
							<div class="chart" id="chart">
								<!-- 柱状图在这里 -->
							</div>
							<span class="arrow-up"></span>
						</div>
					</div>
					<a href="javascript:void(0);" class="com-btn cxtj"></a>
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
		$(".cxtj").click(function(){
			var dbw = $(".d-b-w")
			if(dbw.is(":hidden")){
				dbw.show();
			}else{
				dbw.hide();
			}
		})
	})
</script>

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
	
	function clearOverlays(){
		
		map.clearOverlays();
	}
	
	function openInfoWindow(longitude,latitude,sContent){
		var pointEach = new BMap.Point(longitude, latitude);
		var markerEach = new BMap.Marker(pointEach);
		var infoWindow = new BMap.InfoWindow(sContent);
		
		map.addOverlay(markerEach);
		
		markerEach.openInfoWindow(infoWindow);
	}
</script>
</html>

