const checkCredentialFormatting = (username, password) => {
	const usernameRegex = '[0-9a-zA-z-_]{1,20}';
	const passwordRegex = '[0-9A-Za-z#-&(-+!-.<-@^_]{8,20}';

	if (username === null || password === null) {
		return false;
	}
	if (username.match(usernameRegex) != username) {
		return false;
	}
	if (password.match(passwordRegex) != password) {
		return false;
	}
	return true;
};

export { checkCredentialFormatting };
