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
	<script type="text/javascript" src="resources/js/sjlm.js"></script>
	
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
	
	<script type="text/javascript" src="http://api.map.baidu.com/library/InfoBox/1.2/src/InfoBox_min.js"></script>
</head>
<body>
	<div class="main-body">
		<div class="container">
			<!-- header -->
			<div class="header clearfix">
				<a href="javascript:void(0)" class="logo">
					<img src="resources/images/logo.png">
				</a>
				<div class="nav clearfix">
					<a href="${pageContext.request.contextPath}/gxpt">供需平台</a>
					<a href="${pageContext.request.contextPath}/cxy">产学研</a>
					<a href="${pageContext.request.contextPath}/jyzx">教育在线</a>
					<a href="javascript:void(0)"  class="active">设计联盟</a>
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
					<div class="wl-wrap wl-wrap3">
						<a class="com-t1" href="javascript:void(0)">二级分类</a>
						<div class="s-wrap">
							<div class="wl-cnt">
								<div class="wlc-wrap wlc-w12 clearfix" id="ejfl">
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
					<div class="wl-wrap wl-wrap3">
						<a class="com-t1" href="javascript:void(0)">企业列表</a>
						<div class="s-wrap">
							<div class="wl-cnt">
								<div class="wlc-wrap wlc-w2 clearfix" id="qylb">
									<!-- <a href="#" class="active">
										<h3>杭州美意家电有限公司</h3>
										<p>发布需求数量：</p>
									</a>
									<a href="#">
										<h3>杭州美意家电有限公司</h3>
										<p>难题数量：0</p>
									</a> -->
								</div>
							</div>
						</div>
					</div>
					<!-- 设计师列表 -->
					<div class="wl-wrap">
						<a class="com-t1 com-t2" href="javascript:void(0)">设计师列表</a>
						<div class="s-wrap">
							<div class="wl-cnt">
								<div class="wlc-wrap wlc-w2 clearfix" id="sjslb">
									<!-- <a href="#" class="active">
										<h3>姓名：毛利</h3>
										<p>所属设计公司：东莞横沥伟记行模具设计厂</p>
										<p>发布设计作品数量：</p>
									</a>
									<a href="#">
										<h3>姓名：毛利</h3>
										<p>所属设计公司：东莞横沥伟记行模具设计厂</p>
										<p>发布设计作品数量：</p>
									</a> -->
								</div>
							</div>
						</div>
					</div>
					<!-- 设计师公司列表 -->
					<div class="wl-wrap wl-wrap3">
						<a class="com-t1 com-t2" href="javascript:void(0)">设计师公司列表</a>
						<div class="s-wrap">
							<div class="wl-cnt">
								<div class="wlc-wrap wlc-w2 clearfix" id="sjsgslb">
									<!-- <a href="#" class="active">
										<h3>杭州美意家电有限公司</h3>
										<p>接单设计任务数量：</p>
									</a>
									<a href="#">
										<h3>杭州美意家电有限公司</h3>
										<p>接单设计任务数量：</p>
									</a> -->
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- right -->
				<div class="w-right">
					<div class="map-wrap3">
						<div class="map" id="container">
							<!-- <img src="images/map.png"> -->
						</div>
						<!--  -->
						<!-- <div class="wr-w1 sjszy-w2">
							<div class="mask"></div>
							<div class="content">
								<h5>东莞市天倬模具有限公司</h5>
								<p>所属设计公司：东莞横沥伟记行模具设计厂</p>
								<div class="cbtn-w">
									<a href="#" class="com-btn sjszy"></a>
								</div>
							</div>
						</div> -->
						<!--  -->
						<!-- <div class="wr-w1 sjszy-w">
							<div class="mask"></div>
							<div class="content">
								<h5>姓名：毛利</h5>
								<p>所属设计公司：东莞横沥伟记行模具设计厂</p>
								<p>资历：中级设计师</p>
								<p>工作经验：6年：</p>
								<div class="cbtn-w">
									<a href="#" class="com-btn sjszy"></a>
								</div>
							</div>
						</div> -->
						<!--  -->
						<!-- <div class="wr-w2 sjsgs-w">
							<div class="mask"></div>
							<div class="content">
								<h5>北京市荣峰模具设计有限公司</h5>
								<p>领域：冲压模具设计</p>
								<p>资质：高级设计公司</p>
								<div class="cbtn-w">
									<a href="#" class="com-btn gszy"></a>
								</div>
							</div>
						</div> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</body>

<script type="text/javascript">
var contextPath="${pageContext.request.contextPath }";

	//百度地图API功能
	var map = new BMap.Map("container",{enableMapClick:false});    // 创建Map实例
	
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
	
	window.lastInfoBox = null;//定义上一个窗体为lastInfoBox;
	
	function addMarker(longitude,latitude,sContent){
		
		var pointEach = new BMap.Point(longitude, latitude);
		
		var myIcon = new BMap.Icon("resources/images/Tagging1.png", new BMap.Size(47,46));
		
		var markerEach = new BMap.Marker(pointEach,{icon:myIcon});
		map.addOverlay(markerEach);
		
		/* var infoWindow = new BMap.InfoWindow(sContent);
		markerEach.addEventListener("click", function(){          
		   this.openInfoWindow(infoWindow);
		}); */
		
		
		markerEach.addEventListener("click", function(){          
			var infoBox = new BMapLib.InfoBox(map,sContent,{
				closeIconUrl:'resources/images/close.png',
				closeIconMargin: "8px 8px 0 0",
				enableAutoPan: true,
				align: INFOBOX_AT_TOP
			});
			
			if(lastInfoBox){
	        //判断上一个窗体是否存在，若存在则执行close
	            lastInfoBox.close();
	        }
	        lastInfoBox = infoBox;
			
	      	//把关闭按钮放在窗体打开的监听事件里面，否则选择器无法用事件代理的方法获取的关闭按钮；
	        infoBox.addEventListener("open", function(e) { 
	              $('.closeBtn').on('click',function () {
	                  infoBox.close();
	              });
	        });
	        
			infoBox.open(markerEach);
		});
	}
	
	function clearOverlays(){
		
		map.clearOverlays();
	}
	
	function openInfoWindow(longitude,latitude,sContent){
		var pointEach = new BMap.Point(longitude, latitude);
		
		var myIcon = new BMap.Icon("resources/images/Tagging1.png", new BMap.Size(47,46));
		
		var markerEach = new BMap.Marker(pointEach,{icon:myIcon});
		var infoWindow = new BMap.InfoWindow(sContent);
		
		map.addOverlay(markerEach);
		
		/* markerEach.openInfoWindow(infoWindow);
		
		markerEach.addEventListener("infowindowclose", function(){
			addMarker(longitude,latitude,sContent)
		}); */
		
		//openInfoBox(markerEach,sContent);
		
		var infoBox = new BMapLib.InfoBox(map,sContent,{
			closeIconUrl:'resources/images/close.png',
			closeIconMargin: "8px 8px 0 0",
			enableAutoPan: true,
			align: INFOBOX_AT_TOP
		});
		
		if(lastInfoBox){
        //判断上一个窗体是否存在，若存在则执行close
            lastInfoBox.close();
        }
        lastInfoBox = infoBox;
		
      	//把关闭按钮放在窗体打开的监听事件里面，否则选择器无法用事件代理的方法获取的关闭按钮；
        infoBox.addEventListener("open", function(e) { 
              $('.closeBtn').on('click',function () {
                  infoBox.close();
            	  addMarker(longitude,latitude,sContent);
              });
        });
        
		infoBox.open(markerEach);
	}
</script>

</html>
