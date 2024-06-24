import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";
import "./index.less";

let option: echarts.EChartsOption = {
	tooltip: {
		trigger: "item",
		formatter: "{a} <br/> {b} : {c} ({d}%)",
	},
	legend: {
		left: "center",
		top: "bottom",
		data: ["rose1", "rose2", "rose3", "rose4", "rose5", "rose6", "rose7", "rose8"],
		textStyle: {
			color: "#a1a1a1",
		},
	},
	toolbox: {
		show: true,
		feature: {
			mark: { show: true },
			dataView: { show: true, readOnly: false },
			restore: { show: true },
			saveAsImage: { show: true },
		},
	},
	series: [
		{
			name: "Radius Mode",
			type: "pie",
			radius: [60, 280],
			center: ["50%", "50%"],
			roseType: "radius",
			itemStyle: {
				borderRadius: 5,
			},
			label: {
				show: true,
			},
			emphasis: {
				label: {
					show: true,
				},
			},
			data: [
				{
					value: 40,
					name: "rose1",
				},
				{
					value: 33,
					name: "rose2",
				},
				{
					value: 28,
					name: "rose3",
				},
				{
					value: 22,
					name: "rose4",
				},
				{
					value: 20,
					name: "rose5",
				},
				{
					value: 15,
					name: "rose6",
				},
				{
					value: 12,
					name: "rose7",
				},
				{
					value: 10,
					name: "rose8",
				},
			],
		},
	],
};

const PieChart = () => {
	const [myChart] = useEcharts(option);

	return <div ref={myChart} className="content-box"></div>;
};

export default PieChart;
