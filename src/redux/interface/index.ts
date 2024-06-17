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
		[key: string]: any;
	};
}

export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
}

export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: string;
	language: string;
	themeConfig: ThemeConfigProp;
}

export interface AuthState {
	authButtons: {
		[propName: string]: any;
	};
	authRouters: string[];
}
