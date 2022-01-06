//TODO delete unnecessary user reducers
//TODO clean up user reducers
//TODO standardize user reducers

export const usernameExistsReducer = (
	state = { loading: false, exists: false },
	action
) => {
	switch (action.type) {
		case 'CHECK_USERNAME_EXISTS_REQUEST':
			return { loading: true, ...state };
		case 'CHECK_USERNAME_EXISTS_SUCCESS':
			return { loading: false, exists: action.payload };
		case 'CHECK_USERNAME_EXISTS_FAILURE':
			return { loading: false, exists: action.payload };
		default:
			return state;
	}
};

export const currentUserReducer = (state = {}, action) => {
	switch (action.type) {
		case 'AUTHENTICATE_USER_REQUEST':
			return { loading: true, ...state };
		case 'AUTHENTICATE_USER_SUCCESS':
			console.log('in reducer cuid is: ', action.payload);
			localStorage.setItem('cuid', action.payload._id); //QUESTION should cuid and/or jwt be stored in local storage
			localStorage.setItem('cutoken', action.payload.token);
			return {
				loading: false,
				cu: action.payload,
			};
		case 'AUTHENTICATE_USER_FAILURE':
			return { loading: false, cu: null };
		default:
			return state;
	}
};

export const userDetailReducer = (
	state = { loading: false, user: {} },
	action
) => {
	switch (action.type) {
		case 'USER_DETAIL_REQUEST':
			return { loading: true, ...state };
		case 'USER_DETAIL_SUCCESS':
			return { loading: false, user: action.payload };
		case 'USER_DETAIL_FAILURE':
			return { loading: false, user: action.payload };
		default:
			return state;
	}
};

export const listUsernameReducer = (
	state = { loading: false, username: null },
	action
) => {
	switch (action.type) {
		case 'USER_NAME_LIST_REQUEST':
			return { loading: true, ...state };
		case 'USER_NAME_LIST_SUCCESS':
			return { loading: false, username: action.payload.username };
		case 'USER_NAME_LIST_FAILURE':
			return { loading: false, username: action.payload };
		default:
			return state;
	}
};
