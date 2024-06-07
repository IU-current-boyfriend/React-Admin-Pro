import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import "./index.scss";

const LayoutTabs = () => {
	const { TabPane } = Tabs;
	const { pathname } = useLocation();
	const [activeKey, setActiveKey] = useState<string>(pathname);
	const [tabList] = useState([
		{
			title: "首页",
			path: "/home",
		},
		{
			title: "超级表格",
			path: "/proTable",
		},
		{
			title: "数据大屏",
			path: "/dataScreen",
		},
		{
			title: "使用 Hooks",
			path: "/useHooks",
		},
		// {
		// 	title: "使用 Hooks",
		// 	path: "/useHooks",
		// },
		// {
		// 	title: "使用 Component",
		// 	path: "/useComponent",
		// },
		// {
		// 	title: "数据可视化",
		// 	path: "/dashboard",
		// },
		// {
		// 	title: "内嵌页面",
		// 	path: "/embedded",
		// },
		// {
		// 	title: "基础 Form",
		// 	path: "/basicForm",
		// },
		// {
		// 	title: "校验 Form",
		// 	path: "/validateForm",
		// },
		// {
		// 	title: "动态 Form",
		// 	path: "/dynamicForm",
		// },
		// {
		// 	title: "水型图",
		// 	path: "/waterChart",
		// },
		// {
		// 	title: "柱状图",
		// 	path: "/columnChart",
		// },
		// {
		// 	title: "折线图",
		// 	path: "/超级表格",
		// },
		// {
		// 	title: "雷达图",
		// 	path: "/radarChart",
		// },
		// {
		// 	title: "嵌套环形图",
		// 	path: "/nestedChart",
		// },
	]);

	useEffect(() => {
		setActiveKey(pathname);
	}, [pathname]);

	const tabsClick = (index: any) => {
		console.log("index: =>", index);
	};

	const delTabs = (path: string) => {
		console.log("path: =>", path);
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
								{item.path === "/home" ? <HomeFilled /> : ""}
								{item.title}
							</span>
						}
						closable={item.path !== "/home"}
					></TabPane>
				);
			})}
		</Tabs>
	);
};

export default LayoutTabs;
