import { Modal, message } from "antd";
import { useState, useImperativeHandle, type Ref } from "react";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void } | undefined>;
}
const PasswordModal = (props: Props) => {
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	// 向外组件外暴露的方法
	const showModal = (params: { name: number }) => {
		console.log("params: =>", params);
		setModalVisible(true);
	};

	useImperativeHandle(props.innerRef, () => ({
		showModal,
	}));

	// 点击弹窗确认按钮的方法
	const handleOk = () => {
		setModalVisible(false);
		message.success("修改用户密码成功🎉🎉🎉");
	};

	// 点击取消按钮
	const handleCancel = () => {
		setModalVisible(false);
	};
	return (
		<Modal title="修改密码" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>Some Password ...</p>
			<p>Some Password ...</p>
			<p>Some Password ...</p>
		</Modal>
	);
};

export default PasswordModal;
