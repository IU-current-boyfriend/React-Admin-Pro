import { useState, useEffect } from "react";
import { getBrowserLang } from "@/utils/utils";
import { HashRouter } from "react-router-dom";
import i18n from "i18next";
import Router from "@/routers/index";
import { ConfigProvider } from "antd";
import { connect } from "react-redux";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import AuthRouter from "@/routers/utils/authRouter";
import { setLanguage } from "./redux/modules/global/action";
import { useTheme } from "@/hooks/useTheme";
import "@/App.css";
import "moment/dist/locale/zh-cn";

const App = (props: any) => {
	const { language, assemblySize, themeConfig, setLanguage } = props;
	const { weakOrGray } = themeConfig;
	const [i18nLocale, setI18nLocale] = useState(zhCN);

	useTheme(weakOrGray);

	const setAntdLanguage = () => {
		// 如果redux中有默认语言就设置成redux的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language === "zh") return setI18nLocale(zhCN);
		if (language && language === "en") return setI18nLocale(enUS);
		if (getBrowserLang() === "zh") return setI18nLocale(zhCN);
		if (getBrowserLang() === "en") return setI18nLocale(enUS);
	};

	useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		setLanguage(language || getBrowserLang());
		setAntdLanguage();
	}, [language]);

	return (
		<HashRouter>
			<ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</HashRouter>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapActionToProps = { setLanguage };

export default connect(mapStateToProps, mapActionToProps)(App);
