import { HashRouter } from "react-router-dom";
import Router from "@/routers/index";
import "@/App.css";

const App = () => {
	return (
		<HashRouter>
			<Router />
		</HashRouter>
	);
};

export default App;
