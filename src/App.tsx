import Router from "@/routers/index";
import { HashRouter } from "react-router-dom";
import "@/App.css";

const App = () => {
	return (
		<HashRouter>
			<Router />
		</HashRouter>
	);
};

export default App;
