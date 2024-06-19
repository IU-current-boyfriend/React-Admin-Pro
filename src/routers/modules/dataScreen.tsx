import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/contant";
import { RouteObject } from "@/routers/interface";

// 数据大屏路由模块
const dataScreenRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/dataScreen/index",
				element: lazyLoad(React.lazy(() => import("@/views/dataScreen"))),
				meta: {
					// keepAlive: true,
					requiresAuth: false,
					title: "数据大屏",
					key: "dataScreen",
				},
			},
		],
	},
];

export default dataScreenRouter;
