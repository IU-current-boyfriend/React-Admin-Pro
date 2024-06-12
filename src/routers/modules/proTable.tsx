import React from "react";
import lazyLoad from "@/routers/lazyLoad";
import { LayoutIndex } from "@/routers/contant";
import { RouteObject } from "@/routers/interface";

// 超级表格模块
const proTableRouter: RouteObject[] = [
	{
		element: <LayoutIndex title={"超级表格"} />,
		meta: {
			title: "超级表格",
		},
		children: [
			{
				path: "/proTable/useHooks",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useHooks"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用Hooks",
					key: "useHooks",
				},
			},
			{
				path: "/proTable/useComponent",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useComponent"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用Component",
					key: "useComponent",
				},
			},
		],
	},
];

export default proTableRouter;
