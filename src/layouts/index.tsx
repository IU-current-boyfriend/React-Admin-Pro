import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { Layout } from "antd";
import { setAuthButtons } from "@/redux/modules/auth/action";
import { updateCollapse } from "@/redux/modules/menu/action";
import { getAuthorButtons } from "@/api/modules/login";
import LayoutMenu from "./Menu";
import LayoutHeader from "./Header";
import LayoutTabs from "./Tabs";
import LayoutFooter from "./Footer";
import "./index.less";

const LayoutIndex = (props: any) => {
	const { pathname } = useLocation();
	// 从antd中的Layout组件中解构出侧边栏、content组件
	const { Sider, Content } = Layout;

	const getAuthorButtonsData = async () => {
		const { data } = await getAuthorButtons();
		props.setAuthButtons(data);
	};

	// 监听窗口的变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth;
				if (props.isCollapse === false && screenWidth < 1200) props.updateCollapse(true);
				if (props.isCollapse === false && screenWidth >= 1200) props.updateCollapse(false);
			})();
		};
	};

	useEffect(() => {
		getAuthorButtonsData();
		listeningWindow();
	}, []);

	return (
		// <Layout>
		<section className="container">
			<Sider trigger={null} collapsed={props.isCollapse} width={210} theme="dark">
				<LayoutMenu></LayoutMenu>
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				<LayoutTabs></LayoutTabs>
				<Content>
					{/* 这里样式暂时并未设置fade滑动效果，类名虽然设置了，但还未实现 */}
					<TransitionGroup className="content">
						{/* exit: 表示退出当前页面的时候是否有动画 */}
						<CSSTransition timeout={200} classNames="fade" exit={false} key={pathname}>
							<Outlet></Outlet>
						</CSSTransition>
					</TransitionGroup>
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</section>
		// </Layout>
	);
};
const mapStateToProps = (state: any) => state.menu;
const mapActionsToProps = { setAuthButtons, updateCollapse };
export default connect(mapStateToProps, mapActionsToProps)(LayoutIndex);
