import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
	const navigate = useNavigate();

	const onFinish = (values: any) => {
		console.log("Success:", values);
		message.success("登录成功!");
		navigate("/home");
	};

	const onFinishFailed = (errInfo: any) => {
		console.log("errInfo: =>", errInfo);
	};
	return (
		<Form
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "please input your username!" }]}>
				<Input placeholder="用户名:admin/user" prefix={<UserOutlined />}></Input>
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "please input your password!" }]}>
				<Input placeholder="密码:123456" prefix={<LockOutlined />}></Input>
			</Form.Item>
			<Form.Item className="login-btn">
				<Button icon={<CloseCircleOutlined />}>重置</Button>
				<Button icon={<UserOutlined />}>登录</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
