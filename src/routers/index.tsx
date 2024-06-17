// import { Navigate, useRoutes } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";

// Login、LayoutIndex没有必要懒加载
import Login from "@/views/login/index";

// 通过vite获取到所有的路由
const metaRoutes = import.meta.globEager("./modules/*.tsx");
// console.log("meta: =>", metaRoutes);

// 处理路由
export const routerArray: RouteObject[] = [];

Object.entries(metaRoutes).reduce((prev, [routeKey, route]) => {
	routeKey && route.default && routerArray.push(...route.default);
	return prev;
}, routerArray);

const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: <Login />,
		// meta的作用，可以用做路由跳转携带的信息，比如说requiresAuth字段，如果存在的话
		// 就可以当作用户已经登录，如果不存在则没有登录
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login",
		},
	},
	...routerArray,
	{
		path: "*",
		element: <Navigate to="/404" />,
	},
];

const Router = () => {
	// useRoutes返回的是React.ReactElement react元素；
	const routes = useRoutes(rootRouter);
	return routes;
};

// export default rootRouter;
export default Router;
