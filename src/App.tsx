import { HashRouter } from "react-router-dom";
import { RouterGuard } from "@/routers/routerGuard";
import rootRouter from "@/routers/index";
import "@/App.css";

const App = () => {
	return (
		<HashRouter>
			<RouterGuard routes={rootRouter}></RouterGuard>
		</HashRouter>
	);
};

export default App;
