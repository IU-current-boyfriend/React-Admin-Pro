// import { SkinOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";

const Theme = () => {
	const [visible, setVisible] = useState<boolean>(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<i className="icon-style iconfont icon-zhuti" onClick={() => showDrawer()}></i>
			<Drawer title="主题设置" closable={false} onClose={onClose} visible={visible}>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Drawer>
		</>
	);
};

export default Theme;
