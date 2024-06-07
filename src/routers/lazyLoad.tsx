import React, { Suspense } from "react";
import { Spin } from "antd";

// 类型还是挺重要的，一个是异步组件类型，一个是React元素节点类型
// Suspense还是挺有意思的，当异步路由在加载的时候，它会使用fallback属性中的内容代替展示页面
// 需要测试效果也很简单，你可以把浏览器中的nextWork调慢一点
const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
	return (
		<Suspense
			fallback={
				<Spin
					size="large"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
					}}
				/>
			}
		>
			<Comp />
		</Suspense>
	);
};

export default lazyLoad;
