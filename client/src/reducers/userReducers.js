//TODO clean up user reducers
//TODO standardize user reducers

export const currentUserReducer = (state = { cu: null }, action) => {
	switch (action.type) {
		case 'AUTHENTICATE_USER_REQUEST':
			return { loading: true, ...state };
		case 'AUTHENTICATE_USER_SUCCESS':
			console.log('in reducer cuid is: ', action.payload);
			localStorage.setItem('cuid', action.payload._id); //QUESTION should cuid and/or jwt be stored in local storage
			localStorage.setItem('cutoken', action.payload.token);
			return { loading: false, error: null, cu: action.payload };
		case 'AUTHENTICATE_USER_FAILURE':
			return { loading: false, error: action.payload, cu: null };
		case 'LOGOUT_USER_REQUEST':
			return { loading: true, ...state };
		case 'LOGOUT_USER_SUCCESS':
			return { loading: false, cu: null };
		case 'LOGOUT_USER_FAILURE':
			return { loading: false, ...state };
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
