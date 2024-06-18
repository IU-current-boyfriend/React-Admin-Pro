import { useEffect } from "react";
import { connect } from "react-redux";
import { Table, DatePicker } from "antd";
import "./index.less";

const useHooks = (props: any) => {
	const { RangePicker } = DatePicker;
	useEffect(() => {
		console.log(props.authButtons);
	}, []);

	const columns = [
		{
			title: "姓名",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "年龄",
			dataIndex: "age",
			key: "age",
		},
		{
			title: "住址",
			dataIndex: "address",
			key: "address",
		},
	];

	return (
		<>
			<RangePicker />
			<Table dataSource={[]} columns={columns}></Table>
		</>
	);
};

const mapStateToProps = (state: any) => state.auth;
export default connect(mapStateToProps)(useHooks);
