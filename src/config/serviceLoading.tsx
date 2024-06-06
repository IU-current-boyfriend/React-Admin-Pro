import { createPortal } from "react-dom";
import Loading from "@/components/Loading";

let needLoadingRequestCount = 0;

// // 展示loading
// export const showFullScreenLoading = () => {
// 	if (needLoadingRequestCount === 0) {
// 		let dom = document.createElement("div");
// 		dom.setAttribute("id", "loading");
// 		document.body.appendChild(dom);
// 		ReactDOM.render(<Loading />, dom);
// 	}
// 	needLoadingRequestCount++;
// };

// // * 隐藏loading
// export const tryHideFullScreenLoading = () => {
// 	if (needLoadingRequestCount <= 0) return;
// 	needLoadingRequestCount--;
// 	if (needLoadingRequestCount === 0) {
// 		document.body.removeChild(document.getElementById("loading") as HTMLElement);
// 	}
// };

// 展示loading
export const showFullScreenLoading = () => {
	if (needLoadingRequestCount === 0) {
		let dom = document.createElement("div");
		dom.setAttribute("id", "loading");
		document.body.appendChild(dom);
		createPortal(<Loading />, dom);
	}
	needLoadingRequestCount++;
};

// 隐藏loading
export const tryHideFullScreenLoading = () => {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		document.body.removeChild(document.getElementById("loading") as HTMLElement);
	}
};
