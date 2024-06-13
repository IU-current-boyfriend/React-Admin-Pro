import { connect } from "react-redux";
import logo from "@/assets/images/logo.png";

const Logo = (props: any) => {
	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{/* <h2 className="logo-text">Hooks Admin</h2> */}
			{!props.isCollapse ? <h2 className="logo-text">Hooks Admin</h2> : null}
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps)(Logo);
