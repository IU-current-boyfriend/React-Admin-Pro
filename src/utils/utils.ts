import { RouteObject } from "@/routers/interface";
/**
 * @description 获取需要展开的 subMenu
 * @param path 当前访问地址
 * @returns {Array} 需要展开的 subMenu
 */
export const getOpenKeys = (path: string) => {
	let newStr: string = "";
	let newArr: any[] = [];
	let arr = path.split("/").map((i) => "/" + i);
	for (let i = 1; i < arr.length - 1; i++) {
		newStr += arr[i];
		newArr.push(newStr);
	}
	return newArr;
};

/**
 * 递归匹配某个路由信息
 * @param path
 * @param routes
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
	let result: RouteObject = {};
	routes.forEach((route) => {
		if (path === route.path) return (result = route);
		if (route.children && route.children.length > 0) {
			const item = searchRoute(path, route.children);
			if (Object.keys(item).length) result = item;
		}
	});
	return result;
};

/**
 *
 * @param path 当前路由路径
 * @param routes 全部的路由配置信息
 * @returns 路由title信息
 */
export const searchRouteDetail = (path: string, routes: RouteObject[], result: string[] = []): string[] => {
	const includeRouteDetail = (routeArr: RouteObject[]): RouteObject | undefined => {
		return routeArr.find((item) => {
			if (item.path === path) return true;
			if (item.children && item.children.length > 0) return includeRouteDetail(item.children);
		});
	};

	routes.forEach((route) => {
		if (route.path === path) result.push(route.meta!.title);
		if (route.children && route.children.length > 0) {
			// 添加当前成功匹配到的路由信息
			includeRouteDetail(route.children) && result.push(route.meta!.title);
			// 递归只会添加匹配到的最后一个路由信息
			searchRouteDetail(path, route.children, result);
		}
	});

	return result;
};

/**
 * @description 判断数据类型
 * @param val 需要判断类型的数据
 * @returns {string} 数据类型
 */
export const isType = (val: any) => {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description 对象数组深克隆
 * @param obj 源对象
 * @returns {obj} 克隆后的对象
 */
export const deepCopy = <T>(obj: any): T => {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === "object") {
			newObj[attr] = deepCopy(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
};
