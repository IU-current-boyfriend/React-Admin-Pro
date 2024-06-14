import { useEffect, useState } from "react";
import { Tabs, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { HOME_URL } from "@/config";
import { addTabs } from "@/redux/modules/tabs/action";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/utils";
import "./index.less";

const LayoutTabs = (props: any) => {
	const { TabPane } = Tabs;
	const { pathname } = useLocation();
	const [activeKey, setActiveKey] = useState<string>(pathname);
	const navigate = useNavigate();

	useEffect(() => {
		// 通过pathname从路由配置中查询当前路由的信息，设置为tab栏
		const route = searchRoute(pathname, routerArray);
		props.addTabs({ title: route.meta!.title, path: route.path });
		setActiveKey(pathname);
	}, [pathname]);

	const tabsClick = (path: string) => {
		navigate(path);
	};

	const delTabs = (path: string) => {
		console.log("path: =>", path);
		message.success("删除Tabs标签😁");
	};

	return (
		<Tabs
			type="editable-card"
			activeKey={activeKey}
			onChange={tabsClick}
			onEdit={(path) => {
				delTabs(path as string);
			}}
			hideAdd
		>
			{props.tabsList.map((item: Menu.MenuOptions) => {
				return (
					<TabPane
						key={item.path}
						tab={
							<span>
								{item.path === HOME_URL ? <HomeFilled /> : ""}
								{item.title}
							</span>
						}
						closable={item.path !== HOME_URL}
					></TabPane>
				);
			})}
		</Tabs>
	);
};

const mapStateToProps = (state: any) => state.tabs;
/*
	mapActionToProps是对象的情况，而不是函数的情况，需要去官网看一下: 官网指出:
	connect 的 mapDispatch 参数可以定义为接收 dispatch 参数的函数，
	也可以定义为包含 action creator 的对象。我们建议总是使用 mapDispatch 的“对象简写”格式 ，
	因为这样极大地简化了代码。几乎不需要将 mapDispatch 写为函数。
 */

const mapActionToProps = { addTabs };

export default connect(mapStateToProps, mapActionToProps)(LayoutTabs);
