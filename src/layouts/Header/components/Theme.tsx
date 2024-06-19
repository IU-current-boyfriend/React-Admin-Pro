import { Drawer, Divider, Switch } from "antd";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setWeakOrGray } from "@/redux/modules/global/action";

const Theme = (props: any) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [weakOrGray, setWeakOrGray] = useState<string>(props.themeConfig.weakOrGray);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const onChange = (checked: boolean, theme: string) => {
		if (checked) return props.setWeakOrGray(theme);
		props.setWeakOrGray("");
	};

	const initTheme = () => {
		const elHtml = document.documentElement as HTMLElement;
		if (!props.themeConfig.weakOrGray) elHtml.setAttribute("style", "");
		if (props.themeConfig.weakOrGray === "weak") elHtml.setAttribute("style", "filter: invert(80%)");
		if (props.themeConfig.weakOrGray === "gray") elHtml.setAttribute("style", "filter: grayscale(1)");
		setWeakOrGray(props.themeConfig.weakOrGray);
	};

	useEffect(() => {
		initTheme();
	}, [props.themeConfig.weakOrGray]);

	return (
		<>
			<i className="icon-style iconfont icon-zhuti" onClick={() => showDrawer()}></i>
			<Drawer title="主题设置" closable={false} onClose={onClose} visible={visible} width={320}>
				<Divider style={{ margin: "0 0 16px 0" }}>主题</Divider>
				<div className="theme-item">
					<span>暗黑模式（未完成）</span>
					<Switch
						checkedChildren={<>🌞</>}
						unCheckedChildren={<>🌜</>}
						onChange={(e) => {
							console.log(e);
						}}
					/>
				</div>
				<div className="theme-item">
					<span>灰色模式</span>
					<Switch
						checked={weakOrGray === "gray"}
						onChange={(e) => {
							onChange(e, "gray");
						}}
					/>
				</div>
				<div className="theme-item">
					<span>色弱模式</span>
					<Switch
						checked={weakOrGray === "weak"}
						onChange={(e) => {
							onChange(e, "weak");
						}}
					/>
				</div>
			</Drawer>
		</>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapActionToProps = { setWeakOrGray };

export default connect(mapStateToProps, mapActionToProps)(Theme);
