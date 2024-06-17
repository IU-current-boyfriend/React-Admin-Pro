import React, { useEffect, useState } from "react";
import { Spin, Menu, type MenuProps } from "antd";
import { connect } from "react-redux";
import * as Icons from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthRouters } from "@/redux/modules/auth/action";
import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
import { getOpenKeys, handleRouter, searchRoute } from "@/utils/utils";
import { getMenuList } from "@/api/modules/login";
import Logo from "./components/Logo";
import { findAllBreadcrumb } from "@/utils/utils";
import "./index.less";

type MenuItem = Required<MenuProps>["items"][number];

const LayoutMenu = (props: any) => {
	const { pathname } = useLocation();
	const [loading, setLoading] = useState<boolean>(false);
	const [menuList, setMenuList] = useState<MenuItem[]>([]);

	const getItem = (
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: "group"
	): MenuItem => {
		return {
			label,
			key,
			icon,
			children,
			type,
		} as MenuItem;
	};

	// 动态渲染图标
	const customIcons: { [key: string]: any } = Icons;

	const addIcon = (name: string) => {
		return React.createElement(customIcons[name]);
	};

	// 递归组装Menu菜单数据
	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
		menuList.forEach((item: Menu.MenuOptions) => {
			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
		});
		return newArr;
	};

	/**
	 * getMenuData请求菜单栏数据
	 */
	const getMenuData = async () => {
		setLoading(true);
		try {
			const { data } = await getMenuList();
			if (!data) return;
			setMenuList(deepLoopFloat(data));
			// 储存处理过后的所有面包屑导航到redux中
			props.setBreadcrumbList(findAllBreadcrumb(data));
			// 把路由菜单处理成一维数组，存储到redux中，做菜单权限校验
			const dynamicRouter = handleRouter(data);
			props.setAuthRouters(dynamicRouter);
		} finally {
			setLoading(false);
		}
	};

	/**
	 * 通过pathname设置subMenu菜单栏选中项
	 */

	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	useEffect(() => {
		setSelectedKeys([pathname]);
		props.isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, props.isCollapse]);

	useEffect(() => {
		getMenuData();
	}, []);

	const navigate = useNavigate();
	/**
	 * 点击MenuItem的事件处理函数
	 * @param e
	 */
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		const route = searchRoute(key, props.menuList);
		/* 实际上这里并不会跳转，因为按照现在的代码逻辑menuList在Redux中没有储存值。 */
		if (route.isLink) window.open(route.isLink, "_blank");
		navigate(key);
	};

	const onOpenChange = (openKeys: string[]) => {
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		// 最新展开的SubMenu,说明当前展开的subMenu是同一个
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	};

	return (
		<div className="menu">
			<Spin tip="loading..." spinning={loading}>
				<Logo></Logo>
				<Menu
					theme="dark"
					mode="inline"
					triggerSubMenuAction="click"
					selectedKeys={selectedKeys}
					items={menuList}
					openKeys={openKeys}
					onClick={clickMenu}
					onOpenChange={onOpenChange}
				></Menu>
			</Spin>
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapActionsToProps = {
	setBreadcrumbList,
	setAuthRouters,
};

export default connect(mapStateToProps, mapActionsToProps)(LayoutMenu);
