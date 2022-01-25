import axios from 'axios';

export const listUserReviews =
	(userid, usertoken, searchString) => async (dispatch) => {
		try {
			dispatch({ type: 'REVIEW_LIST_REQUEST' });
			const headers = { Authorization: `Bearer ${usertoken}` };
			const { data } = await axios.get(
				`/api/reviews/user/${userid}/${searchString}`,
				{
					headers: headers,
				}
			);
			dispatch({ type: 'REVIEW_LIST_SUCCESS', payload: data });
		} catch (error) {
			dispatch({ type: 'REVIEW_LIST_FAILURE', payload: error.message });
		}
	};

export const listExploreReviews = (limit, searchString) => async (dispatch) => {
	try {
		dispatch({ type: 'REVIEW_LIST_REQUEST' });
		const { data } = await axios.get(
			`/api/reviews/explore/${limit}/${searchString}`
		);
		dispatch({ type: 'REVIEW_LIST_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'REVIEW_LIST_FAILURE',
			payload: error.message,
		});
	}
};

export const listReviewDetails =
	(reviewid, usertoken, isPrivate) => async (dispatch) => {
		try {
			dispatch({ type: 'REVIEW_DETAIL_REQUEST' });
			if (isPrivate) {
				const headers = { Authorization: `Bearer ${usertoken}` };
				const { data } = await axios.get(`/api/reviews/${reviewid}`, {
					headers: headers,
				});
				dispatch({ type: 'REVIEW_DETAIL_SUCCESS', payload: data });
			} else {
				const { data } = await axios.get(
					`/api/reviews/public/${reviewid}`
				);
				dispatch({ type: 'REVIEW_DETAIL_SUCCESS', payload: data });
			}
		} catch (error) {
			dispatch({ type: 'REVIEW_DETAIL_FAILURE', payload: error.message });
		}
	};

export const postUserReview =
	(review, image, usertoken) => async (dispatch) => {
		try {
			dispatch({ type: 'POST_REVIEW_REQUEST' });
			const headers = { Authorization: `Bearer ${usertoken}` };
			//const body = { ...image };
			if (image) {
				console.log('posting review with image');
				const {
					data: { imgName },
				} = await axios.post(`/api/images/save`, image, {
					headers: headers,
				});
				console.log(imgName);
				review = { ...review, image: imgName };
			}
			console.log('posting review');
			console.log(review);
			const { data } = await axios.post(
				`/api/reviews/post`,
				{ review: review },
				{
					headers: headers,
				}
			);
			dispatch({ type: 'POST_REVIEW_SUCCESS', payload: data });
		} catch (error) {
			dispatch({ type: 'POST_REVIEW_FAILURE', payload: error.message });
		}
	};

export const updateUserReview =
	(id, review, image, usertoken) => async (dispatch) => {
		try {
			dispatch({ type: 'UPDATE_REVIEW_REQUEST' });
			const headers = { Authorization: `Bearer ${usertoken}` };
			//const body = { ...image };
			if (image) {
				console.log('updating review with image');
				const {
					data: { imgName },
				} = await axios.post(`/api/images/save`, image, {
					headers: headers,
				});
				console.log(imgName);
				review = { ...review, image: imgName };
			}
			console.log('updating review');
			console.log(review);
			const { data } = await axios.put(
				`/api/reviews/update/${id}`,
				{ review: review },
				{
					headers: headers,
				}
			);
			dispatch({ type: 'UPDATE_REVIEW_SUCCESS', payload: data });
		} catch (error) {
			dispatch({ type: 'UPDATE_REVIEW_FAILURE', payload: error.message });
		}
	};

export const deleteUserReview = (id, usertoken) => async (dispatch) => {
	try {
		dispatch({ type: 'DELETE_REVIEW_REQUEST' });
		const headers = { Authorization: `Bearer ${usertoken}` };
		const { data } = await axios.delete(`/api/reviews/delete/${id}`, {
			headers: headers,
		});
		dispatch({ type: 'DELETE_REVIEW_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'DELETE_REVIEW_FAILURE', payload: error.message });
	}
};

export const clearCurrentReview = () => async (dispatch) => {
	try {
		dispatch({ type: 'CLEAR_REVIEW_DETAIL_REQUEST' });
		dispatch({ type: 'CLEAR_REVIEW_DETAIL_SUCCESS' });
	} catch (error) {
		dispatch({
			type: 'CLEAR_REVIEW_DETAIL_FAILURE',
			payload: error.message,
		});
	}
};
