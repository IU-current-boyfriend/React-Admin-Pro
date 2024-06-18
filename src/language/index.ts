import i18n from "i18next";
import enUsTrans from "./modules/en-us";
import znUsTrans from "./modules/zh-cn";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enUsTrans,
		},
		zh: {
			translation: znUsTrans,
		},
	},
	// 选择默认语言，选择内容为上诉配置中的key，即为en/zh
	fallbackLng: "zh",
	debug: false,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
