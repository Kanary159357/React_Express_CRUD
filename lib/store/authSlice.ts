import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	isLogin: boolean;
	userData: UserDataProps;
}
export interface UserDataProps {
	username: string;
	id: string;
}

const initialState: AuthState = {
	isLogin:
		(process.browser && JSON.parse(localStorage.getItem('isLogin'))) || false,
	userData: process.browser && JSON.parse(localStorage.getItem('userData')),
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginProcess: (state, action: PayloadAction<UserDataProps>) => {
			state.isLogin = true;
			state.userData = action.payload;
			process.browser &&
				localStorage.setItem('userData', JSON.stringify(action.payload));
			process.browser && localStorage.setItem('isLogin', 'true');
		},
		logoutProcess: (state) => {
			state.isLogin = false;
			state.userData = null;
			process.browser && localStorage.setItem('isLogin', 'false');
			process.browser && localStorage.removeItem('userData');
		},
	},
});
export const { loginProcess, logoutProcess } = authSlice.actions;
export default authSlice.reducer;
