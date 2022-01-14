const checkCredentialFormatting = (username, password) => {
	const usernameRegex = new RegExp('^[0-9a-zA-Z-_]{1,20}$');
	const passwordRegex = new RegExp('^[0-9A-Za-z#-&(-+!-.<-@^_-]{8,20}$');

	if (username === null || password === null) {
		return false;
	}
	if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
		return false;
	}
	return true;
};

export { checkCredentialFormatting };
