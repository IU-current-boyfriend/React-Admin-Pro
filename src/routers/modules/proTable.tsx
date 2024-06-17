import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/contant";
import { RouteObject } from "@/routers/interface";

// 超级表格模块
const proTableRouter: RouteObject[] = [
	{
		// element: <LayoutIndex title={"超级表格"} />,
		element: <LayoutIndex />,
		meta: {
			title: "超级表格",
		},
		children: [
			{
				path: "/proTable/useHooks",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useHooks/index"))),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用Hooks",
					key: "useHooks",
				},
			},
			{
				path: "/proTable/useComponent",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useComponent/index"))),
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
