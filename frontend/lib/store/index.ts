import {
	AnyAction,
	combineReducers,
	configureStore,
	Store,
} from '@reduxjs/toolkit';
import { Context, createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import authReducer from './authSlice';

const combinedReducers = combineReducers({
	authReducer: authReducer,
});
type reducerState = typeof combineReducers;
const rootReducer = (state: any, action: AnyAction) => {
	if (action.type === HYDRATE) {
		const clientstate = { ...state };
		const serverState = { ...action.payload };
		const nextState = { ...clientstate, ...serverState.authReducer };
		nextState.authReducer = serverState.authReducer;
		return nextState;
	}
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
