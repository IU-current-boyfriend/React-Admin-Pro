import React from "react";
import lazyLoad from "@/routers/lazyLoad";
import { LayoutIndex } from "@/routers/contant";
import { RouteObject } from "@/routers/interface";

// 首页路由模块

const homeRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/index",
				element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "首页",
					key: "home",
				},
			},
		],
	},
];

export default homeRouter;