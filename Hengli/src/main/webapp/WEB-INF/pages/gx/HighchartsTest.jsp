<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript" src="resources/js/libs/jquery.js"></script>
		<script type="text/javascript" src="resources/js/highcharts.js"></script>
	</head>
	<body>
		<div id="container" style="height: 300px">
			<script type="text/javascript">
			var colors = Highcharts.getOptions().colors;
			$.each(colors, function(i, color) {
				colors[i] = {
					linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
					stops: [
						[0, "#5D4BA5"],
						[0.2, "#6F5CCE"],
						[0.4, '#8460CD'],
						[0.6, '#BD7BEA'],
						[0.8, '#D186E8'],
						[1, "#8963B4"]
					]
				};
			});
			// Create the chart
			var chart = new Highcharts.Chart({
				chart: {
					renderTo: 'container',
					type: 'column'
				},
				xAxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				},
				series: [{
					data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
				}]
			});
		</script>
		</div>
	</body>
</html>
