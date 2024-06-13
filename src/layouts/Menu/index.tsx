import React, { useEffect, useState } from "react";
import { Spin, Menu, type MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./components/Logo";
import { getOpenKeys } from "@/utils/utils";
import { getMenuList } from "@/api/modules/login";
import "./index.less";

type MenuItem = Required<MenuProps>["items"][number];

const LayoutMenu = () => {
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
			data && setMenuList(deepLoopFloat(data));
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
		setOpenKeys(getOpenKeys(pathname));
	}, [pathname]);

	useEffect(() => {
		getMenuData();
	}, []);

	const navigate = useNavigate();
	/**
	 * 点击MenuItem的事件处理函数
	 * @param e
	 */
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
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
			<Logo></Logo>
			<Spin tip="loading..." spinning={loading}>
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

export default LayoutMenu;
