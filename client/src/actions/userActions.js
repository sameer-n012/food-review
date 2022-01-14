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

export const createUser = (user) => async (dispatch) => {
	try {
		console.log('creating user: ');
		const body = { user: user };
		console.log(body);
		dispatch({ type: 'POST_USER_REQUEST' });
		const { data } = await axios.post(`/api/users/post`, body);
		dispatch({ type: 'POST_USER_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'POST_USER_FAILURE',
			payload: error.message,
		});
	}
};

export const deleteUser = (userid, usertoken) => async (dispatch) => {
	try {
		console.log('deleting user: ');
		const headers = { Authorization: `Bearer ${usertoken}` };
		dispatch({ type: 'DELETE_USER_REQUEST' });
		const { data } = await axios.delete(`/api/users/delete/${userid}`, {
			headers: headers,
		});
		dispatch({ type: 'DELETE_USER_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'DELETE_USER_FAILURE',
			payload: error.message,
		});
	}
};

export const updateUser =
	(oldpassword, user, usertoken) => async (dispatch) => {
		try {
			console.log('updating user: ');
			const body = { oldpassword: oldpassword, user: user };
			const headers = { Authorization: `Bearer ${usertoken}` };
			console.log(body);
			dispatch({ type: 'PUT_USER_REQUEST' });
			const { data } = await axios.put(
				`/api/users/update/${user._id}`,
				body,
				{
					headers: headers,
				}
			);
			dispatch({ type: 'PUT_USER_SUCCESS', payload: data });
		} catch (error) {
			dispatch({
				type: 'PUT_USER_FAILURE',
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
