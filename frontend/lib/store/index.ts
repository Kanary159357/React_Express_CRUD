/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from './authSlice';

const combinedReducers = combineReducers({
	authReducer: authReducer,
});

export const store = configureStore({
	reducer: combinedReducers,
	devTools: true,
});

const makeStore = () => store;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof combinedReducers>;
export type RootDispatch = typeof store['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
