export const idValidation = (id: string) => {
	const regExp = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]{4,12}$/;
	return regExp.test(id);
};
export const usernameValidation = (username: string) => {
	const regExp = /^[a-zA-Z\dㄱ-ㅎ|ㅏ-ㅣ|가-힣]{6,12}$/;
	return regExp.test(username);
};

export const passwordValidation = (password: string, passwordValid: string) => {
	const regExp =
		/^(?=.*?\d)(?=.*?[a-zA-Z])(?=.*?[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])[a-zA-Z\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{7,14}$/;
	return regExp.test(password) && password === passwordValid;
};
