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
 * 递归查询对应的路由
 *
 */
export const searchRouteDetail = (path: string, routes: RouteObject[]): string[] => {
	let result: string[] = [];
	routes.forEach((item) => {
		if (item.path === path) {
			result.push(item.meta!.title);
		} else {
			if (item.children && item.children.length > 0) {
				item.children.forEach((i) => {
					if (i.path === path) {
						result.push(item.meta!.title, i.meta!.title);
					}
				});
			}
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
