import { Modal, message } from "antd";
import { useState, useImperativeHandle, type Ref } from "react";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void } | undefined>;
}
const InfoModal = (props: Props) => {
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
		message.success("修改用户信息成功🎉🎉🎉");
	};

	// 点击取消按钮
	const handleCancel = () => {
		setModalVisible(false);
	};
	return (
		<Modal title="个人信息" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>UserInfo ...</p>
			<p>UserInfo ...</p>
			<p>UserInfo ...</p>
		</Modal>
	);
};

export default InfoModal;
