import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/contant";
import { RouteObject } from "@/routers/interface";

// dashboard路由模块
const dashboardRouter: RouteObject[] = [
	{
		path: "/dashboard",
		// element: <LayoutIndex title="dashboard" />,
		element: <LayoutIndex />,
		meta: {
			title: "Dashboard",
		},
		children: [
			{
				path: "/dashboard/dataVisualize",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/dataVisualize/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "数据可视化",
					key: "dataVisualize",
				},
			},
			{
				path: "/dashboard/embedded",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/embedded/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "内嵌页面",
					key: "embedded",
				},
			},
		],
	},
];

export default dashboardRouter;
