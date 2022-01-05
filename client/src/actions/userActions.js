import axios from 'axios';

export const checkUsernameExists = (username) => async (dispatch) => {
	try {
		dispatch({ type: 'CHECK_USERNAME_EXISTS_REQUEST' });
		const { data } = await axios.get(`/api/users/exists/${username}`);
		dispatch({ type: 'CHECK_USERNAME_EXISTS_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'CHECK_USERNAME_EXISTS_FAILURE',
			payload: error.message,
		});
	}
};

export const authenticateUser = (user) => async (dispatch) => {
	try {
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

export const listUsername = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'USER_NAME_LIST_REQUEST' });
		const { data } = await axios.get(`/api/users/name/${id}`);
		dispatch({ type: 'USER_NAME_LIST_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'USER_NAME_LIST_FAILURE',
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
