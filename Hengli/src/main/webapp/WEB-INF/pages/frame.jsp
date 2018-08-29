<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" href="resources/css/cube-min.css"/>
		<link rel="stylesheet" href="resources/css/indexTop.css" />
		<link rel="stylesheet" href="resources/css/index-gx.css"/>
		<link rel="stylesheet" href="resources/css/pop.css" />
		<script type="text/javascript" src="resources/js/libs/jquery.js"></script>
		<script type="text/javascript" src="resources/js/plugins/jquery.nicescroll.js"></script>
		<script type="text/javascript" src="resources/js/plugins/jquery.ui.position.min.js"></script>
		<script type="text/javascript" src="resources/js/plugins/jquery.animateTip.js"></script>
		<script type="text/javascript" src="resources/js/frame.js"></script>
	</head>
	<body>
		<div class="view-box">
		<div class="header">
			<!--左上角logo区域-->
			<div class="logo">
				<a class="logo-panel"> <span class="logo-icon"></span> <span
					class="down-icon"></span> </a>
			</div>
	
			<div class="topRight">
		     <!-- 切换租户 -->
			<div class="changeSelect">
			<span>切换租户</span>
			<input type="text" id="companyName">
			<span id="sub">提交</span>
			</div>
			
			</div>

		</div>

		<!--系统显示区域-->
		<div class="main-page">
			<%-- <iframe src="${pageContext.request.contextPath}/gxIndex" frameborder="0"
				marginheight="0" scrolling="no" marginwidth="0" width="100%"
				height="100%" id="mainFrame" name="mainFrame"></iframe> --%>
			<jsp:include page="gx/gxlist.jsp"/>
		</div>
	</div>
	</body>
<script type="text/javascript">
var contextPath="${pageContext.request.contextPath }";
</script>
</html>
