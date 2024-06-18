// import { LayoutOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { setAssemblySize } from "@/redux/modules/global/action";
import { connect } from "react-redux";

const AssemblySize = (props: any) => {
	const menu = (
		<Menu
			items={[
				{
					key: "middle",
					disabled: props.assemblySize === "middle",
					label: <span>默认</span>,
					onClick: (e) => {
						console.log("e", e);
						props.setAssemblySize(e.key);
					},
				},
				{
					key: "large",
					disabled: props.assemblySize === "large",
					label: <span>大型</span>,
					onClick: (e) => {
						console.log("e", e);
						props.setAssemblySize(e.key);
					},
				},
				{
					key: "small",
					disabled: props.assemblySize === "small",
					label: <span>小型</span>,
					onClick: (e) => {
						console.log("e", e);
						props.setAssemblySize(e.key);
					},
				},
			]}
		/>
	);
	return (
		<Dropdown overlay={menu} placement="bottom" trigger={["click"]} arrow={true}>
			<i className="icon-style iconfont icon-contentright"></i>
		</Dropdown>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapActionToProps = { setAssemblySize };

export default connect(mapStateToProps, mapActionToProps)(AssemblySize);
