/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer from './authSlice';

const combinedReducers = combineReducers({
	authReducer: authReducer,
});
const rootReducer = (state: any, action: AnyAction) => {
	if (action.type === HYDRATE) {
		const clientstate = { ...state };
		const serverState = { ...action.payload };
		const nextState = { ...clientstate, ...serverState.authReducer };
		nextState.authReducer = serverState.authReducer;
		return nextState;
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return combinedReducers(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
});

const makeStore = () => store;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof combinedReducers>;
export type RootDispatch = typeof store['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
