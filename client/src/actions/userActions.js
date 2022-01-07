import axios from 'axios';

export const authenticateUser = (user) => async (dispatch) => {
	try {
		console.log('authenticating user: ');
		console.log(user);
		dispatch({ type: 'AUTHENTICATE_USER_REQUEST' });
		const { data } = await axios.post(`/api/users/auth`, user);
		dispatch({ type: 'AUTHENTICATE_USER_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'AUTHENTICATE_USER_FAILURE',
			payload: error.message,
		});
	}
};

export const logoutUser = () => async (dispatch) => {
	try {
		dispatch({ type: 'LOGOUT_USER_REQUEST' });
		dispatch({ type: 'LOGOUT_USER_SUCCESS', payload: { cu: null } });
	} catch (error) {
		dispatch({
			type: 'LOGOUT_USER_FAILURE',
			payload: error.message,
		});
	}
};

export const listUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'USER_DETAIL_REQUEST' });
		const { data } = await axios.get(`/api/users/${id}`);
		dispatch({ type: 'USER_DETAIL_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'USER_DETAIL_FAILURE', payload: error.message });
	}
};
