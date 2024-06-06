import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from "antd";
import LayoutMenu from "./Menu";
import LayoutHeader from "./Header";
import LayoutTabs from "./Tabs";
import LayoutFooter from "./Footer";
import "./index.scss";

// 从antd中的Layout组件中解构出侧边栏、content组件
const { Sider, Content } = Layout;

const LayoutIndex = (props: { name: string }) => {
	console.log("props: =>", props);
	const { pathname } = useLocation();

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={false}>
				<LayoutMenu></LayoutMenu>
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				<LayoutTabs></LayoutTabs>
				<Content>
					{/* 这里样式暂时并未设置fade滑动效果，类名虽然设置了，但还未实现 */}
					<TransitionGroup className="container">
						{/* exit: 表示退出当前页面的时候是否有动画 */}
						<CSSTransition timeout={200} classNames="fade" exit={false} key={pathname}>
							<Outlet></Outlet>
						</CSSTransition>
					</TransitionGroup>
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</Layout>
	);
};
export default LayoutIndex;
