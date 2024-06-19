// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { updateCollapse } from "@/redux/modules/menu/action";

const CollapseIcon = (props: any) => {
	const { isCollapse, updateCollapse } = props;
	return (
		<div className="collapsed" onClick={() => updateCollapse(!isCollapse)}>
			{isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};

const mapDispatchToProps = { updateCollapse };
const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps, mapDispatchToProps)(CollapseIcon);
