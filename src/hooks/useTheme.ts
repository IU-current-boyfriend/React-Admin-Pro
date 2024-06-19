export const useTheme = (weakOrGrap: string) => {
	const initTheme = () => {
		const body = document.documentElement as HTMLElement;

		if (!weakOrGrap) body.setAttribute("style", "");
		if (weakOrGrap === "weak") body.setAttribute("style", "filter: invert(80%)");
		if (weakOrGrap === "gray") body.setAttribute("style", "filter: grayscale(1)");
	};

	initTheme();

	return {
		initTheme,
	};
};
