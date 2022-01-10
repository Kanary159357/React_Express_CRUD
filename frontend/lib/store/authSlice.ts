import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	isLogin: boolean;
	userData: UserDataProps | null;
	accessToken: string | null;
}
export interface UserDataProps {
	username: string;
	id: string;
}

const initialState: AuthState = {
	isLogin: false,
	userData: null,
	accessToken: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginProcess: (state, action: PayloadAction<AuthState>) => {
			state.isLogin = action.payload.isLogin;
			state.userData = action.payload.userData;
			state.accessToken = action.payload.accessToken;
		},
		logoutProcess: (state) => {
			state.isLogin = false;
			state.userData = null;
			state.accessToken = null;
		},
		updateAccessToken: (state, action: PayloadAction<{ token: string }>) => {
			state.accessToken = action.payload.token;
		},

		resetUser: (state) => {
			state = initialState;
		},
	},
});
export const { loginProcess, logoutProcess, updateAccessToken, resetUser } =
	authSlice.actions;
export default authSlice.reducer;
