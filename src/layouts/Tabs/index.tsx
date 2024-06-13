import { useEffect, useState } from "react";
import { Tabs, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config";
import "./index.less";

const LayoutTabs = () => {
	const { TabPane } = Tabs;
	const { pathname } = useLocation();
	const [activeKey, setActiveKey] = useState<string>(pathname);
	const [tabList] = useState([
		{
			title: "首页",
			path: "/home/index",
		},
		{
			title: "数据大屏",
			path: "/dataScreen/index",
		},
		{
			title: "使用 Hooks",
			path: "/proTable/useHooks",
		},
		{
			title: "使用 Component",
			path: "/proTable/useComponent",
		},
		{
			title: "数据可视化",
			path: "/dashboard/dataVisualize",
		},
		{
			title: "内嵌页面",
			path: "/dashboard/embedded",
		},
	]);
	const navigate = useNavigate();

	useEffect(() => {
		setActiveKey(pathname);
	}, [pathname]);

	const tabsClick = (path: string) => {
		// console.log("navigate: =>", navigate);
		// console.log("index: =>", path);
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
			{tabList.map((item: Menu.MenuOptions) => {
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

export default LayoutTabs;
