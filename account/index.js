import React, { Component } from 'react';

import CanvasJSReact from './assets/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints1 = [];
var dataPoints2 = [];
var updateInterval = 1000;
//initial values
var yValue1 = 0;
var yValue2 = 0;
var xValue = 5;
class AccountPage extends Component {
	constructor(props) {
		super(props);
		this.updateChart = this.updateChart.bind(this);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		
	}
	
	componentDidMount(){
		this.updateChart(20);
		setInterval(this.updateChart, updateInterval);
	}
	toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	updateChart(count) {

		count = count || 1;
		var deltaY1, deltaY2;
		for (var i = 0; i < count; i++) {
			xValue += 1;
			deltaY1 = 5 + Math.random() *(-5-5);
			deltaY2 = 5 + Math.random() *(-5-5);
			yValue1 = Math.floor(Math.random()*40);
			yValue2 = Math.floor(Math.random()*10);
			dataPoints1.push({
			  x: xValue,
			  y: yValue1
			});
			dataPoints2.push({
			  x: xValue,
			  y: yValue2
			});
		}
		this.chart.options.data[0].legendText = " Positive - " + yValue1 + " %";
		this.chart.options.data[1].legendText = " Negative - " + yValue2 + " %";
		this.chart.render();
	}
	render() {
		console.log(this.props);
		const options = {
			zoomEnabled: true,
			theme: "light2",
			title: {
				text: "Emotion"
			},
			axisX: {
				title: "chart updates every 1 secs"
			},
			axisY:{
				suffix: " %"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor:"pointer",
				verticalAlign: "top",
				fontSize: 18,
				fontColor: "dimGrey",
				itemclick : this.toggleDataSeries
			},
			data: [
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 %",
          zValueFormatString: "#,##0 %",

					showInLegend: true,
					name: "Positive",
					dataPoints: dataPoints1
				},
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 %",
          zValueFormatString: "#,##0 %",
					showInLegend: true,
					name: "Negative" ,
					dataPoints: dataPoints2
				}
			]
		}
		return (
			<div>
				<CanvasJSChart options = {options}
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default AccountPage;
