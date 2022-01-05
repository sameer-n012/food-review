import axios from 'axios';

export const listUserReviews = (userid) => async (dispatch) => {
	try {
		dispatch({ type: 'REVIEW_LIST_REQUEST' });
		const { data } = await axios.get(`/api/reviews/user/${userid}`);
		dispatch({ type: 'REVIEW_LIST_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'REVIEW_LIST_FAILURE', payload: error.message });
	}
};

export const listExploreReviews = (limit) => async (dispatch) => {
	try {
		dispatch({ type: 'REVIEW_LIST_REQUEST' });
		const { data } = await axios.get(`/api/reviews/explore/${limit}`);
		dispatch({ type: 'REVIEW_LIST_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'REVIEW_LIST_FAILURE',
			payload: error.message,
		});
	}
};

export const listReviewDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'REVIEW_DETAIL_REQUEST' });
		const { data } = await axios.get(`/api/reviews/${id}`);
		dispatch({ type: 'REVIEW_DETAIL_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'REVIEW_DETAIL_FAILURE', payload: error.message });
	}
};

export const postUserReview = (review) => async (dispatch) => {
	try {
		dispatch({ type: 'POST_REVIEW_REQUEST' });
		const { data } = await axios.post(`/api/reviews/post`, review);
		dispatch({ type: 'POST_REVIEW_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'POST_REVIEW_FAILURE', payload: error.message });
	}
};

export const updateUserReview = (id, review) => async (dispatch) => {
	try {
		dispatch({ type: 'UPDATE_REVIEW_REQUEST' });
		const { data } = await axios.put(`/api/reviews/update/${id}`, review);
		dispatch({ type: 'UPDATE_REVIEW_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'UPDATE_REVIEW_FAILURE', payload: error.message });
	}
};

export const deleteUserReview = (id) => async (dispatch) => {
	try {
		dispatch({ type: 'DELETE_REVIEW_REQUEST' });
		const { data } = await axios.delete(`/api/reviews/delete/${id}`);
		dispatch({ type: 'DELETE_REVIEW_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'DELETE_REVIEW_FAILURE', payload: error.message });
	}
};
