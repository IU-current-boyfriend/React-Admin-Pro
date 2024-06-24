import { Button } from "antd";
import { getAuthorButtons } from "@/api/modules/login";
import AgeRatioChart from "./components/AgeRatioChart";

const DataScreen = () => {
	const requestMenuList = async () => {
		// const res = await getMenuList();
		const res = await getAuthorButtons();
		console.log(res);
	};
	return (
		<div className="content-box">
			{/* <span className="text">DataScreen 🍓🍇🍈🍉</span> */}
			<AgeRatioChart />
			<Button type="primary" onClick={requestMenuList}>
				点我发起网络请求😎
			</Button>
		</div>
	);
};

export default DataScreen;
