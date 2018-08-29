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
				<div class="first-classify">
					一级分类
				</div>
				<div class="second-classify">
					二级分类
				</div>
				<!--底部按钮区域-->
				<div class="bottom-menu">
					<a class="help" data-tip="使用手册"></a><a class="logout" data-tip="退出系统"></a>
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
