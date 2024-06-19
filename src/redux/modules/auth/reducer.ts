import { AnyAction } from "redux";
import { AuthState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const authState: AuthState = {
	// * { useHooks: {add: true, delete: false}}
	authButtons: {},
	authRouters: [],
};

// auth reducer
const auth = (state: AuthState = authState, action: AnyAction) =>
	produce(state, (draftState) => {
		switch (action.type) {
			case types.SET_AUTH_BUTTON:
				draftState.authButtons = action.authButtons;
				break;
			case types.SET_AUTH_ROUTER:
				draftState.authRouters = action.authRouters;
				break;
			default:
				return draftState;
		}
	});
export default auth;
