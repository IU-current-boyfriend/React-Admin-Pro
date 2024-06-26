import { useEffect, useState } from "react";
import { Tabs, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { HOME_URL } from "@/config";
import { setTabsList } from "@/redux/modules/tabs/action";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/utils";
import MoreButton from "./components/MoreButton";
import "./index.less";

const LayoutTabs = (props: any) => {
	const { TabPane } = Tabs;
	const { pathname } = useLocation();
	const { tabsList } = props.tabs;
	const { themeConfig } = props.global;
	const { setTabsList } = props;
	const [activeKey, setActiveKey] = useState<string>(pathname);
	const navigate = useNavigate();

	useEffect(() => {
		addTabs();
		setActiveKey(pathname);
	}, [pathname]);

	// addTabs
	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let newTabsList = JSON.parse(JSON.stringify(tabsList));
		if (tabsList.every((item: any) => item.path !== route.path)) {
			newTabsList.push({ title: route.meta!.title, path: route.path });
		}
		setTabsList(newTabsList);
		setActiveKey(pathname);
	};

	const tabsClick = (path: string) => {
		navigate(path);
	};

	// * delTabs
	const delTabs = (tabPath: string) => {
		if (tabPath === HOME_URL) return;
		if (tabPath === pathname) {
			tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== pathname) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success("你删除了tabs标签😄😄😄");
		setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath));
	};

	return (
		<>
			{!themeConfig.tabs && (
				<div className="tabs">
					<Tabs
						// animated
						type="editable-card"
						activeKey={activeKey}
						onChange={tabsClick}
						onEdit={(path) => {
							delTabs(path as string);
						}}
						hideAdd
					>
						{tabsList.map((item: Menu.MenuOptions) => {
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
					<MoreButton delTabs={delTabs} {...props}></MoreButton>
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => state;
/*
	mapActionToProps是对象的情况，而不是函数的情况，需要去官网看一下: 官网指出:
	connect 的 mapDispatch 参数可以定义为接收 dispatch 参数的函数，
	也可以定义为包含 action creator 的对象。我们建议总是使用 mapDispatch 的“对象简写”格式 ，
	因为这样极大地简化了代码。几乎不需要将 mapDispatch 写为函数。
 */

const mapActionToProps = { setTabsList };

export default connect(mapStateToProps, mapActionToProps)(LayoutTabs);
