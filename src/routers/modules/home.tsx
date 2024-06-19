import React from "react";
// import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/contant";
import { RouteObject } from "@/routers/interface";
import Home from "@/views/home/index";

// 首页路由模块

const homeRouter: RouteObject[] = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/index",
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <Home />,
				meta: {
					// keepAlive: true,
					requiresAuth: true,
					title: "首页",
					key: "home",
				},
			},
		],
	},
];

export default homeRouter;
