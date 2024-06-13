import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import "@/styles/reset.less";
import "@/styles/common.less";
import "antd/dist/antd.css";
import App from "@/App";

const root = createRoot(document.getElementById("root")!);

root.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);
