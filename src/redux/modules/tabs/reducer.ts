import { type AnyAction } from "redux";
import { TabsState } from "@/redux/interface";
import { HOME_URL } from "@/config";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const tabsState: TabsState = {
	tabsActive: HOME_URL,
	tabsList: [
		{
			title: "首页",
			path: HOME_URL,
		},
	],
};

const tabs = (state: TabsState = tabsState, action: AnyAction) =>
	produce(state, (draftState) => {
		switch (action.type) {
			case types.SET_TABS_LIST:
				draftState.tabsList = action.tabsList;
				break;
			case types.SET_TABS_ACTIVE:
				draftState.tabsActive = action.tabsActive;
				break;
			default:
				return draftState;
		}
	});

export default tabs;
