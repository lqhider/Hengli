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
		<div id="chart" style="height: 300px">
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
  					renderTo: 'chart',
  					type: 'column'
  				},
  				title: {
  					text: '各工业区企业数量分布'
  				},
  				xAxis: {
  					categories: ['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1']
  				},
  				yAxis:{
  					title:{
  						text:''
  					},
  					labels:{
  						enabled:false
  				   }
  				},
  				tooltip: {
  					pointFormatter: function() {
  					    return '<b>'+ this.y +'</b>'
  					}
  				},
  				series: [{
  					data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  					showInLegend: false
  				}],
  				credits:{
  				     enabled: false // 禁用版权信息
  				}
  			});
		</script>
		</div>
	</body>
</html>
