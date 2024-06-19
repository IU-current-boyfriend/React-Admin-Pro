import { Avatar, Modal, Menu, Dropdown, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import avatar from "@/assets/images/avatar.png";
import InfoModal from "./InfoModal";
import PasswordModal from "./PasswordModal";
import { HOME_URL } from "@/config";

interface ModalProps {
	showModal: (params: { name: number }) => void;
}

const AvatarIcon = (props: any) => {
	const navigate = useNavigate();
	const getHome = () => navigate(HOME_URL);
	const { setToken } = props;
	const infoRef = useRef<ModalProps>(null!);
	const passRef = useRef<ModalProps>(null!);
	const logout = () => {
		Modal.confirm({
			title: "温馨提醒💗",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认退出登录?",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				setToken("");
				message.success("退出登录成功!");
				navigate("/login");
			},
		});
	};
	const menu = (
		<Menu
			items={[
				{
					label: (
						<span className="dropdown-item" onClick={getHome}>
							首页
						</span>
					),
					key: "1",
				},
				{
					label: (
						<span className="dropdown-item" onClick={() => infoRef.current.showModal({ name: 111 })}>
							个人信息
						</span>
					),
					key: "2",
				},
				{
					label: (
						<span className="dropdown-item" onClick={() => passRef.current.showModal({ name: 222 })}>
							修改密码
						</span>
					),
					key: "3",
				},
				// { 这种写法，导致onClick属性接受的类型不匹配,需要通过绑定函数来处理，不能够直接调用showModal方法
				// 	label: <span onClick={passRef.current.showModal({ name: 222 })}>修改密码</span>,
				// 	key: "2",
				// },
				{
					type: "divider",
				},
				{
					label: (
						<span className="dropdown-item" onClick={logout}>
							退出登录
						</span>
					),
					key: "4",
				},
			]}
		></Menu>
	);
	return (
		<>
			{/* overlay在4.24.0版本之前可以使用，但是控制台会提示已被废弃，参考文档可以更新为menu属性 */}
			<Dropdown overlay={menu} placement="bottom" arrow trigger={["click"]}>
				<Avatar src={avatar} size="large"></Avatar>
			</Dropdown>
			<InfoModal innerRef={infoRef}></InfoModal>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</>
	);
};

const mapActionToProps = { setToken };

export default connect(null, mapActionToProps)(AvatarIcon);
