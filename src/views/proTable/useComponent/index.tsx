import { rootRouter } from "@/routers";
import { searchRouteDetail } from "@/utils/utils";
import { useLocation } from "react-router-dom";

const useComponent = () => {
	const location = useLocation();

	const res = searchRouteDetail(location.pathname, rootRouter);
	console.log("res: =>", res);
	return <span>UseComponent</span>;
};

export default useComponent;
