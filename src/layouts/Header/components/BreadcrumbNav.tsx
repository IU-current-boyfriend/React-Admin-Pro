import { Breadcrumb } from "antd";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { routerArray } from "@/routers";
// import { searchRouteDetail } from "@/utils/utils";
import { searchRoute } from "@/utils/utils";
import { LayoutTitleContext } from "@/routers/contant";

const BreadcrumNav = () => {
	const { pathname } = useLocation();
	const route = searchRoute(pathname, routerArray);
	// const routes = searchRouteDetail(pathname, routerArray);

	const props: { title?: string } = useContext(LayoutTitleContext);

	let breadcrumbList: any[] = [];
	if (props!.title) breadcrumbList = [props!.title, route.meta!.title];
	else breadcrumbList = [route.meta!.title];

	console.log("breadcrumbList: =>", breadcrumbList);
	return (
		<Breadcrumb>
			<Breadcrumb.Item>Home</Breadcrumb.Item>
			<Breadcrumb.Item>List</Breadcrumb.Item>
			<Breadcrumb.Item>App</Breadcrumb.Item>
		</Breadcrumb>
	);
};

export default BreadcrumNav;
