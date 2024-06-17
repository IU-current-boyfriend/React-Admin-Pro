import { useLocation, Navigate } from "react-router-dom";
import { routerArray } from "@/routers/index";
import { searchRoute } from "@/utils/utils";
import { store } from "@/redux/index";
import { HOME_URL } from "@/config";

const AuthRouter = (props: any) => {
	const { pathname } = useLocation();
	const route = searchRoute(pathname, routerArray);

	// * 判断当前路由是否需要访问权限（不需要权限直接放行路由）
	if (!route.meta?.requiresAuth) return props.children;

	// * 判断是否存在token
	const token = store.getState().global.token;
	if (!token) return <Navigate to="/login" replace />;

	// * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
	const dynamicRouter = store.getState().auth.authRouters;
	// * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
	const staticRouter = [HOME_URL, "/403"];
	const routerList = dynamicRouter.concat(staticRouter);

	if (routerList.indexOf(pathname) === -1) return <Navigate to="/403" />;

	// 当前账号有权限返回Layout组件，正常访问页面
	return props.children;
};

export default AuthRouter;
