import Router from "@/routers/index";
import { BrowserRouter } from "react-router-dom";
import "@/App.css";

const App = () => {
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	);
};

export default App;
