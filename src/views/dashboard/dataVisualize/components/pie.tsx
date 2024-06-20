import usePie from "./usePie";
const Pie = () => {
	const [pieChart] = usePie();
	return <div ref={pieChart} style={{ width: "100%", height: "100%" }}></div>;
};

export default Pie;
