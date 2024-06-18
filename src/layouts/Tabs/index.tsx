import { useEffect, useState } from "react";
import { Tabs, message, Button, Dropdown, Menu } from "antd";
import { HomeFilled, DownOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { HOME_URL } from "@/config";
import { setTabsList } from "@/redux/modules/tabs/action";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/utils";
import "./index.less";

const LayoutTabs = (props: any) => {
	const { TabPane } = Tabs;
	const { pathname } = useLocation();
	const [activeKey, setActiveKey] = useState<string>(pathname);
	const navigate = useNavigate();

	useEffect(() => {
		addTabs();
		setActiveKey(pathname);
	}, [pathname]);

	// addTabs
	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let tabsList = JSON.parse(JSON.stringify(props.tabsList));
		if (props.tabsList.every((item: any) => item.path !== route.path)) {
			tabsList.push({ title: route.meta!.title, path: route.path });
		}
		props.setTabsList(tabsList);
		setActiveKey(pathname);
	};

	const tabsClick = (path: string) => {
		navigate(path);
	};

	// * delTabs
	const delTabs = () => {
		if (pathname === HOME_URL) return;
		props.tabsList.forEach((item: Menu.MenuOptions, index: number) => {
			if (item.path !== pathname) return;
			const nextTab = props.tabsList[index + 1] || props.tabsList[index - 1];
			if (!nextTab) return;
			navigate(nextTab.path);
		});
		message.success("你删除了tabs标签😄😄😄");
		props.setTabsList(props.tabsList.filter((item: Menu.MenuOptions) => item.path !== pathname));
	};

	// * delAllTabs
	const closeMultipeTab = (tabPath?: string) => {
		const handleTabsList = props.tabsList.filter((item: Menu.MenuOptions) => {
			return item.path === tabPath || item.path === HOME_URL;
		});
		props.setTabsList(handleTabsList);
		tabPath ?? navigate(HOME_URL);
	};

	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: <span>关闭当前</span>,
					onClick: delTabs,
				},
				{
					key: "2",
					label: <span>关闭其它</span>,
					onClick: () => closeMultipeTab(pathname),
				},
				{
					key: "3",
					label: <span>关闭所有</span>,
					onClick: () => closeMultipeTab(),
				},
			]}
		/>
	);

	return (
		<div className="tabs">
			<Tabs
				type="editable-card"
				activeKey={activeKey}
				onChange={tabsClick}
				onEdit={() => {
					delTabs();
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
			<Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }} trigger={["click"]}>
				<Button className="more-button" type="primary" size="small">
					更多
					<DownOutlined />
				</Button>
			</Dropdown>
		</div>
	);
};

const mapStateToProps = (state: any) => state.tabs;
/*
	mapActionToProps是对象的情况，而不是函数的情况，需要去官网看一下: 官网指出:
	connect 的 mapDispatch 参数可以定义为接收 dispatch 参数的函数，
	也可以定义为包含 action creator 的对象。我们建议总是使用 mapDispatch 的“对象简写”格式 ，
	因为这样极大地简化了代码。几乎不需要将 mapDispatch 写为函数。
 */

const mapActionToProps = { setTabsList };

export default connect(mapStateToProps, mapActionToProps)(LayoutTabs);
