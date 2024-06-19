import * as echarts from "echarts";

/**
 * @description 使用Eachrts（只是为了添加图标响应式）
 * @param echart myChart Echarts实例(必须传递)
 * @param options 绘制Echarts的参数（必须传递）
 */
const useEcharts = (echart: echarts.EChartsType, options: echarts.EChartsCoreOption) => {
	if (options && typeof options === "object") {
		echart.setOption(options);
	}

	// 自适应尺寸
	const echartsResize = () => {
		echart && echart.resize();
	};

	const addEvent = () => {
		window.addEventListener("resize", echartsResize, false);
	};

	addEvent();

	const deleteEvent = () => {
		window.removeEventListener("resize", echartsResize, false);
	};

	return {
		deleteEvent,
	};
};

export default useEcharts;
