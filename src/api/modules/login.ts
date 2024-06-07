import { Login } from "@/api/interface/index";
import { PORT1, PORT2 } from "../config/servicePort";
import http from "@/api";

/**
 * @name 登录模块
 */

// 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	// return http.post<Login.ResLogin>(PORT1 + `/login`, params, {headers: {noLoading: true}})
	return http.post<Login.ResLogin>(PORT1 + `/login`, params);
};

// 获取按钮权限
export const getAuthorButtons = () => {
	return http.get<Login.ResAuthButtons>(PORT2 + `/auth/buttons`);
};

// 获取菜单列表
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`);
};
