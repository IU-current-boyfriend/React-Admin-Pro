import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

const BreadcrumNav = (props: any) => {
	const { pathname } = useLocation();

	const breadcrumbList = props.breadcrumbList[pathname] || [];

	return (
		<Breadcrumb>
			<Breadcrumb.Item href="#/home/index">首页</Breadcrumb.Item>
			{breadcrumbList?.map((item: string) => {
				return <Breadcrumb.Item key={item}>{item !== "首页" ? item : null}</Breadcrumb.Item>;
			})}
		</Breadcrumb>
	);
};

const mapStateToProps = (state: any) => state.breadcrumb;

export default connect(mapStateToProps)(BreadcrumNav);
