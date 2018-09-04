<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" href="resources/css/cube-min.css"/>
		<link rel="stylesheet" href="resources/css/index-gx.css"/>
		<link rel="stylesheet" href="resources/css/pop.css" />
		<link rel="stylesheet" href="resources/css/hengli.css" />
		<script type="text/javascript" src="resources/js/libs/jquery.js"></script>
		<script type="text/javascript" src="resources/js/plugins/jquery.nicescroll.js"></script>
		<script type="text/javascript" src="resources/js/plugins/jquery.ui.position.min.js"></script>
		<script type="text/javascript" src="resources/js/plugins/jquery.animateTip.js"></script>
		<script type="text/javascript" src="resources/js/view/gx.js"></script>
	</head>
	<body style="min-width: 1366px;">
		<div class="tc-wrap">
			<!--左侧导航栏-->
			<div class="menu">
				<!-- <div class="first-classify">
					<div class="logo"><div style="padding-left: 8px;">一级分类</div></div>
					<div class="cc">
						<div class="mj">冲压模具</div><div class="mj">简易模具</div><div class="mj">塑料成型模具</div><div class="mj">压铸模</div>
						<div class="mj">锻造成型模具</div><br>
						<div class="mj">铸造用金属模具</div><div class="mj">粉末冶金模具</div>
						<div class="mj">玻璃制品模具</div><div class="mj">橡胶成型模具</div>
						<div class="mj">陶瓷模具</div><div class="mj">设计</div>
					</div>
				</div>
				<div class="second-classify">
					<div class="logo"><div style="padding-left: 8px;">二级分类</div></div>
					<div class="cc">
						<div class="mj">套图</div><div class="mj">绘图</div><div class="mj">造型</div><div class="mj">逆向工程</div>
						<div class="mj">有限元分析</div><div class="mj">铸锻加工</div><div class="mj">车加工</div>
						<div class="mj">铣加工</div><div class="mj">钻加工</div><div class="mj">模加工</div>
						<div class="mj">电火花加工</div>
					</div>
				</div> -->
				<div class="center">
					<div>创新中心</div>
					<div class="cus">
					</div>
				</div>
			</div>
			<div class="navChild"></div>
			<!--右侧主体内容-->
			<div class="content">
        		<jsp:include page="gxmap.jsp"/>
			</div>
		</div>
	</body>
</html>
