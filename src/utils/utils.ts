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
			includeRouteDetail(route.children) && route.meta && result.push(route.meta.title);
			// 递归只会添加匹配到的最后一个路由信息
			searchRouteDetail(path, route.children, result);
		}
	});

	return result;
};

/**
 * 根据路由查询面包屑
 */
export const getBreadcrumbList = (path: string, routes: Menu.MenuOptions[], result: string[] = []) => {
	const includeRouteDetail = (routeArr: Menu.MenuOptions[]): Menu.MenuOptions | undefined => {
		return routeArr.find((item) => {
			if (item.path === path) return true;
			if (item.children && item.children.length > 0) return includeRouteDetail(item.children);
		});
	};

	routes.forEach((route) => {
		if (route.path === path) result.push(route.title);
		if (route.children && route.children.length > 0) {
			// 添加当前成功匹配到的路由信息
			includeRouteDetail(route.children) && result.push(route.title);
			// 递归只会添加匹配到的最后一个路由信息
			getBreadcrumbList(path, route.children, result);
		}
	});

	return result;
};

/**
 * 另一种递归查询面包屑的方法
 */
// export const getBreadcrumbList = (path: string, menuList: Menu.MenuOptions[]) => {
// 	let tempPath: any[] = [];
// 	try {
// 		const getNodePath = (node: Menu.MenuOptions) => {
// 			tempPath.push(node);
// 			// 找到符合条件的节点，通过throw终止掉递归
// 			if (node.path === path) {
// 				throw new Error("GOT IT!");
// 			}
// 			if (node.children && node.children.length > 0) {
// 				for (let i = 0; i < node.children.length; i++) {
// 					getNodePath(node.children[i]);
// 				}
// 				// 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
// 				tempPath.pop();
// 			} else {
// 				// 找到叶子节点时，删除路径当中的该叶子节点
// 				tempPath.pop();
// 			}
// 		};
// 		for (let i = 0; i < menuList.length; i++) {
// 			getNodePath(menuList[i]);
// 		}
// 	} catch (e) {
// 		return tempPath.map((item) => item.title);
// 	}
// };

/**
 * 根据菜单数据储存所有的面包屑数据
 *
 *
 */
export const findAllBreadcrumb = (menuList: Menu.MenuOptions[]): { [key: string]: any } => {
	let handleBreadcrumbList: any = {};
	const loop = (menuItem: Menu.MenuOptions) => {
		if (menuItem?.children?.length) menuItem.children.forEach((item) => loop(item));
		else handleBreadcrumbList[menuItem.path] = getBreadcrumbList(menuItem.path, menuList);
	};
	menuList.forEach((item) => loop(item));
	return handleBreadcrumbList;
};

export function handleRouter(routerList: Menu.MenuOptions[], newArr: string[] = []) {
	routerList.forEach((item: Menu.MenuOptions) => {
		typeof item === "object" && item.path && newArr.push(item.path);
		item.children && item.children.length && handleRouter(item.children, newArr);
	});
	return newArr;
}

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
