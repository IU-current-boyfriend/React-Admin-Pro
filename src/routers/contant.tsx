import Layout from "@/layouts/index";
import AuthRouter from "@/routers/utils/authRouter";
// import { createContext } from "react";
// export const LayoutTitleContext = createContext({});
// export const { Provider } = LayoutTitleContext;

// export const LayoutIndex = (props: { title?: string } = {}) => {
// 	return (
// 		<Provider value={props}>
// 			<Layout />
// 		</Provider>
// 	);
// };
export const LayoutIndex = () => (
	<AuthRouter>
		<Layout />
	</AuthRouter>
);
