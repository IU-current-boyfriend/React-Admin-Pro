import { useEffect } from "react";
import guard from "@/routers/utils/guard";
import { RouteObject } from "@/routers/interface";
import { useRoutes, useLocation, useNavigate } from "react-router-dom";

/**
 *
 * @description 相当于路由守卫的高阶组件
 * @returns
 */
export const RouterGuard = ({ routes }: { routes: RouteObject[] }) => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		// * 当以下三个参数改变时就执行路由拦截方法
		guard(location, navigate, routes);
	}, [location, navigate, routes]);

	const Router = useRoutes(routes);

	return Router;
};
