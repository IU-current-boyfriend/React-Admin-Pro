import * as echarts from "echarts";
// import { useCallback } from "react";

/**
 * @description 使用Eachrts（只是为了添加图标响应式）
 * @param echart myChart Echarts实例(必须传递)
 * @param options 绘制Echarts的参数（必须传递）
 */
const useEcharts = (element: HTMLElement, options: echarts.EChartsCoreOption) => {
	const myChart: echarts.EChartsType = echarts.init(element);

	myChart.setOption(options);

	const setMyChartSizeEvent = () => {
		myChart && myChart.resize();
	};

	const bindChartSizeEvent = () => window.addEventListener("resize", setMyChartSizeEvent, false);
	const removeChartSizeEvent = () => window.removeEventListener("resize", setMyChartSizeEvent, false);

	return {
		chartInstance: myChart,
		bindChartSizeEvent,
		removeChartSizeEvent,
	};
};

export default useEcharts;
