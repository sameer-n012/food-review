import axios from 'axios';

export const changeNavtab = (tabNumber) => async (dispatch) => {
	try {
		dispatch({ type: 'CHANGE_NAVTAB_REQUEST' });
		dispatch({ type: 'CHANGE_NAVTAB_SUCCESS', payload: tabNumber });
	} catch (error) {
		dispatch({
			type: 'CHANGE_NAVTAB_FAILURE',
			payload: error.message,
		});
	}
};

export const getImage = (imageName) => async (dispatch) => {
	try {
		dispatch({ type: 'GET_IMAGE_REQUEST' });
		const { headers, data } = await axios.get(`/api/images/${imageName}`);
		//console.log(data);
		dispatch({
			type: 'GET_IMAGE_SUCCESS',
			payload: {
				name: imageName,
				image: `data:${headers['content-type']};base64,${data}`,
			},
		});
	} catch (error) {
		dispatch({
			type: 'GET_IMAGE_FAILURE',
			payload: error.message,
		});
	}
};

export const saveImage = (image, usertoken) => async (dispatch) => {
	try {
		dispatch({ type: 'SAVE_IMAGE_REQUEST' });
		const headers = { Authorization: `Bearer ${usertoken}` };
		const body = {
			...image,
		};
		const { data } = await axios.post(`/api/images/save`, body, {
			headers: headers,
		});
		console.log(data);
		dispatch({
			type: 'SAVE_IMAGE_SUCCESS',
			payload: { imageName: data.imgName },
		});
	} catch (error) {
		dispatch({
			type: 'SAVE_IMAGE_FAILURE',
			payload: error.message,
		});
	}
};

export const clearImageList = () => async (dispatch) => {
	try {
		dispatch({ type: 'CLEAR_IMAGE_REQUEST' });
		dispatch({ type: 'CLEAR_IMAGE_SUCCESS' });
	} catch (error) {
		dispatch({
			type: 'CLEAR_IMAGE_FAILURE',
			payload: error.message,
		});
	}
};
