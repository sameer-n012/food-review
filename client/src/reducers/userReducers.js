export const currentUserReducer = (state = { cu: null }, action) => {
	switch (action.type) {
		case 'AUTHENTICATE_USER_REQUEST':
		case 'POST_USER_REQUEST':
			return { loading: true, error: null, cu: null };
		case 'AUTHENTICATE_USER_SUCCESS':
		case 'POST_USER_SUCCESS':
			console.log('in reducer cuid is: ', action.payload);
			return {
				loading: false,
				error: null,
				updaterror: null,
				cu: action.payload,
			};
		case 'AUTHENTICATE_USER_FAILURE':
		case 'POST_USER_FAILURE':
			return { loading: false, error: action.payload, cu: null };
		case 'PUT_USER_REQUEST':
			return { ...state, loading: true };
		case 'PUT_USER_SUCCESS':
			return {
				...state,
				loading: false,
				updateerror: null,
				cu: { ...state.cu, ...action.payload },
			};
		case 'PUT_USER_FAILURE':
			return {
				...state,
				loading: false,
				updateerror: action.payload,
			};
		case 'LOGOUT_USER_REQUEST':
		case 'DELETE_USER_REQUEST':
			return { ...state, loading: true };
		case 'LOGOUT_USER_SUCCESS':
		case 'DELETE_USER_SUCCESS':
			return { loading: false, error: null, updateerror: null, cu: null };
		case 'LOGOUT_USER_FAILURE':
		case 'DELETE_USER_FAILURE':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
