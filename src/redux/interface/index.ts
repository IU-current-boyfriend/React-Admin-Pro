import type { SizeType } from "antd/lib/config-provider/SizeContext";

export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

export interface TabsState {
	tabsActive: string;
	tabsList: Menu.MenuOptions[];
}

export interface BreadcrumbState {
	breadcrumbList: {
		[propName: string]: any;
	};
}

export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}

export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: SizeType;
	language: string;
	themeConfig: ThemeConfigProp;
}

export interface AuthState {
	authButtons: {
		[propName: string]: any;
	};
	authRouters: string[];
}
