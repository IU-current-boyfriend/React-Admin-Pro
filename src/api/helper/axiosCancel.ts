import axios, { type AxiosRequestConfig, type Canceler } from "axios";
import { isFunction } from "@/utils/is";
import qs from "qs";

// 声明一个Map用于储存每个请求的表示和取消函数
let pendingMap = new Map<string, Canceler>();

// 序列化参数
export const getPendingUrl = (config: AxiosRequestConfig) =>
	[config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

export class AxiosCancel {
	/**
	 * @description: 添加请求
	 */
	addPending(config: AxiosRequestConfig) {
		// 在请求开始前，对之前的请求做检查取消的操作
		this.removePending(config);
		const url = getPendingUrl(config);
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken((cancel) => {
				if (!pendingMap.has(url)) {
					// 如果pending中不存在当前请求，则添加进去
					pendingMap.set(url, cancel);
				}
			});
	}
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config);

		if (pendingMap.has(url)) {
			// 如果在pending中存在当前请求表示，需要取消当前请求，并且移除
			const cancel = pendingMap.get(url);
			cancel && cancel();
			pendingMap.delete(url);
		}
	}

	/**
	 * @description: 清空所有pending
	 */
	removeAllPending() {
		pendingMap.forEach((cancel) => {
			cancel && isFunction(cancel) && cancel();
		});
		pendingMap.clear();
	}

	/**
	 * @description:重置
	 */
	reset(): void {
		pendingMap = new Map<string, Canceler>();
	}
}

export default new AxiosCancel();
