import Login from "@/views/login/index";
import { useRoutes, Navigate, type RouteObject } from "react-router-dom";

const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/login",
		element: <Navigate to="/login" />,
	},
];

const Router = () => {
	// useRoutes返回的是React.ReactElement react元素；
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
