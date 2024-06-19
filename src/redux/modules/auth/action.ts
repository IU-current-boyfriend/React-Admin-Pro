import * as types from "@/redux/mutation-types";

export const setAuthButtons = (authButtons: { [propName: string]: any }) => ({
	type: types.SET_AUTH_BUTTON,
	authButtons,
});

export const setAuthRouters = (authRouters: string[]) => ({
	type: types.SET_AUTH_ROUTER,
	authRouters,
});
