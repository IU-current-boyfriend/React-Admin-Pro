import { Alert, Button } from "antd";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import steps from "./step";

const Guide = () => {
	const driver = new Driver({
		animate: true, // 在更改突出显示的元素时是否设置动画
		opacity: 0.75, // 背景不透明度(0表示表示只有弹出窗口，没有覆盖)
		doneBtnText: "结束", // 最后一个按钮上的文本
		closeBtnText: "关闭", // 此步骤的“关闭”按钮上的文本
		nextBtnText: "下一步", // 此步骤的下一步按钮文本
		prevBtnText: "上一步", // 此步骤的上一步按钮文本
	});

	const guide = () => {
		driver.defineSteps(steps);
		driver.start();
		console.log("driver: =>", driver);
	};

	return (
		<div className="card content-box">
			<Alert
				message="引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本Demo是基于driver.js."
				style={{ width: "100%" }}
				type="warning"
			/>
			<div style={{ margin: "15px auto" }}>
				<Button type="primary" id="antd-button" onClick={guide}>
					打开引导页🤵
				</Button>
			</div>
		</div>
	);
};

export default Guide;
