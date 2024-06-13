// import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import "@/styles/reset.less";
import "@/styles/common.less";
import "@/assets/iconfont/iconfont.less";
import "antd/dist/antd.css";
import App from "@/App";

// // react18创建会导致antd菜单折叠时闪烁，等待官方修复
// const root = createRoot(document.getElementById("root")!);
// root.render(
// 	<Provider store={store}>
// 		<PersistGate persistor={persistor}>
// 			<App />
// 		</PersistGate>
// 	</Provider>
// );

// 换成react17的方式创建
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);
