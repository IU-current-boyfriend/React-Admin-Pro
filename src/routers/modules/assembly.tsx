import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/contant";
import { RouteObject } from "@/routers/interface";

// 常用组件的模块
const assemblyRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "常用组件",
		},
		children: [
			{
				path: "/assembly/guide",
				element: lazyLoad(React.lazy(() => import("@/views/assembly/guide/index"))),
				meta: {
					requiresAuth: true,
					title: "引导页",
					key: "guid",
				},
			},
			{
				path: "/assembly/svgIcon",
				element: lazyLoad(React.lazy(() => import("@/views/assembly/svgIcon/index"))),
				meta: {
					requiresAuth: true,
					title: "SVG图标",
					key: "svgIcon",
				},
			},
			{
				path: "/assembly/selectIcon",
				element: lazyLoad(React.lazy(() => import("@/views/assembly/selectIcon/index"))),
				meta: {
					// keepAlive: true,
					requiresAuth: true,
					title: "Icon 选择",
					key: "selectIcon",
				},
			},
			{
				path: "/assembly/batchImport",
				element: lazyLoad(React.lazy(() => import("@/views/assembly/batchImport/index"))),
				meta: {
					// keepAlive: true,
					requiresAuth: true,
					title: "批量导入数据",
					key: "selectIcon",
				},
			},
		],
	},
];

export default assemblyRouter;
