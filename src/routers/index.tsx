import { Navigate, useRoutes, type RouteObject } from "react-router-dom";
import React from "react";
import lazyLoad from "./lazyLoad";
// import Home from "@/views/Home";
// import Login from "@/views/login/index";
// import NotFound from "@/components/ErrorMessage/404";
// import LayoutIndex from "@/layouts/index";
// import DataScreen from "@/views/dataScreen";
// import UseHooks from "@/views/proTable/useHooks";
// import UseComponent from "@/views/proTable/useComponent";
// import DataVisualize from "@/views/dashboard/dataVisualize";

const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: lazyLoad(React.lazy(() => import("@/views/login/index"))),
	},
	{
		element: lazyLoad(React.lazy(() => import("@/layouts/index"))),
		children: [
			{
				path: "/home",
				element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
			},
			{
				path: "/dataScreen",
				element: lazyLoad(React.lazy(() => import("@/views/dataScreen/index"))),
			},
			{
				path: "/proTable/useHooks",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useHooks"))),
			},
			{
				path: "/proTable/useComponent",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useComponent"))),
			},
			{
				path: "/dashboard/dataVisualize",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/dataVisualize"))),
			},
		],
	},
	{
		path: "/403",
		element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/403"))),
	},
	{
		path: "/404",
		element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/404"))),
	},
	{
		path: "/500",
		element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/500"))),
	},
	{
		path: "*",
		element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/404"))),
	},
];

const Router = () => {
	// useRoutes返回的是React.ReactElement react元素；
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
