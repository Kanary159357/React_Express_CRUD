import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	isLogin: boolean;
	userData: {
		username: string;
		id: number;
	};
}

const initialState: AuthState = {
	isLogin: JSON.parse(localStorage.getItem('user')),
	userData: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{ username: string; id: number }>) => {
			state.isLogin = true;
			state.userData = action.payload;
		},
		logout: (state, action) => {
			state.isLogin = false;
			state.userData = null;
		},
	},
});
export const { login, logout } = authSlice.actions;
