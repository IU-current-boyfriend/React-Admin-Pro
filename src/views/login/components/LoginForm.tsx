import md5 from "js-md5";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import { setTabsList } from "@/redux/modules/tabs/action";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface/";
import { loginApi } from "@/api/modules/login";
import { HOME_URL } from "@/config";
const LoginForm = (props: any) => {
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { t } = useTranslation();
	const { setToken, setTabsList } = props;

	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			loginForm.password = md5(loginForm.password);
			const { data } = await loginApi(loginForm);
			setToken(data?.access_token);
			setTabsList([]);
			message.success("登录成功!");
			navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errInfo: any) => {
		console.log("errInfo: =>", errInfo);
	};
	return (
		<Form
			name="basic"
			form={form}
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名:admin/user" prefix={<UserOutlined />}></Input>
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete="new-password" placeholder="密码:123456" prefix={<LockOutlined />}></Input.Password>
			</Form.Item>
			<Form.Item className="login-btn">
				<Button onClick={() => form.resetFields()} icon={<CloseCircleOutlined />}>
					{t("login.reset")}
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapActionToProps = { setToken, setTabsList };

export default connect(null, mapActionToProps)(LoginForm);
