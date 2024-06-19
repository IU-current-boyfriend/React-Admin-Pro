import qs from "qs";
import { Login } from "@/api/interface/index";
import { PORT1 } from "../config/servicePort";
import http from "@/api";

/**
 * @name 登录模块
 */

// 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	// return http.post<Login.ResLogin>(PORT1 + `/login`, params, {headers: {noLoading: true}})
	return http.post<Login.ResLogin>(PORT1 + `/login`, params);
	return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post请求携带query参数 ===> ? username=admin&password=123456
	return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post请求携带表单参数 ===> application/x-www-form-urlencoded;
	return http.post<Login.ResLogin>(PORT1 + `/login`, params, { Headers: { noLoading: true } }); // 控制当前请求不显示loading
};

// 获取按钮权限
export const getAuthorButtons = () => {
	return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`);
};

// 获取菜单列表
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`);
};
