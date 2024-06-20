import useCruse from "./useCruse";

const Curve = () => {
	const [cruseChart] = useCruse();
	return <div ref={cruseChart} style={{ width: "100%", height: "100%" }}></div>;
};

export default Curve;
