import * as echarts from "echarts";

import { useEffect, useRef } from "react";

/**
 * @description 使用Echarts(只是添加图表响应式)
 * @param Element data数据 目前置身对于此Hooks-admin里一些data都是写死在options，所以data为可选，根据项目自行修改即可。
 * @return chart
 */
export const useEcharts = (options: echarts.EChartsCoreOption, data?: any) => {
	const myEchart = useRef<echarts.EChartsType>();
	const echartsRef = useRef<HTMLDivElement>(null);

	/* echarts图表的尺寸变化事件处理函数 */
	const echartResize = () => {
		echartsRef && myEchart?.current?.resize();
	};

	useEffect(() => {
		/* 目的很明确，当外部的data数据变化的时候，将重新绘制echart图表 */
		if (data?.length !== 0) {
			myEchart?.current?.setOption(options);
		}
	}, [data]);

	/* 组件初始化的操作 */
	useEffect(() => {
		if (echartsRef?.current) {
			myEchart.current = echarts.init(echartsRef.current as HTMLDivElement);
		}
		myEchart?.current?.setOption(options);
		/* 监听窗口尺寸的变化 */
		window.addEventListener("resize", echartResize, false);
		return () => {
			/* 取消副作用函数 */
			myEchart?.current?.dispose();
			window.removeEventListener("resize", echartResize, false);
		};
	}, []);

	return [echartsRef];
};
