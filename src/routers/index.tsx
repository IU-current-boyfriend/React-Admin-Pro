import Home from "@/views/Home";
import Login from "@/views/login/index";
import NotFound from "@/components/ErrorMessage/404";
import LayoutIndex from "@/layouts/index";
import { Navigate, useRoutes, type RouteObject } from "react-router-dom";

const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/home" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		element: <LayoutIndex name="我是参数" />,
		children: [
			{
				path: "/home",
				element: <Home />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
];

const Router = () => {
	// useRoutes返回的是React.ReactElement react元素；
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
