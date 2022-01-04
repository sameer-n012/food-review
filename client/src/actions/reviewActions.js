import axios from 'axios';

export const listUserReviews = () => async (dispatch) => {
	try {
		dispatch({ type: 'USER_REVIEW_LIST_REQUEST' });
		const { data } = await axios.get('/api/my-reviews');
		dispatch({ type: 'USER_REVIEW_LIST_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'USER_REVIEW_LIST_FAILURE', payload: error.message });
	}
};

export const listExploreReviews = () => async (dispatch) => {
    try {
		dispatch({ type: 'EXPLORE_REVIEW_LIST_REQUEST' });
		const { data } = await axios.get('/api/explore-reviews');
		dispatch({ type: 'EXPLORE_REVIEW_LIST_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'EXPLORE_REVIEW_LIST_FAILURE', payload: error.message });
	}
}

export const listReviewDetails = () => async (dispatch) => {
    try {
		dispatch({ type: 'REVIEW_DETAIL_REQUEST' });
		const { data } = await axios.get(`/api/reviews/${id}`);
		dispatch({ type: 'REVIEW_DETAIL_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'REVIEW_DETAIL_FAILURE', payload: error.message });
	}
}
