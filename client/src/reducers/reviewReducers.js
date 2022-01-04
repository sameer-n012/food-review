export const userReviewListReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case 'USER_REVIEW_LIST_REQUEST':
			return { loading: true, reviews: [] };
		case 'USER_REVIEW_LIST_SUCCESS':
			return { loading: false, reviews: action.payload };
		case 'USER_REVIEW_LIST_FAILURE':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const exploreReviewListReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case 'EXPLORE_REVIEW_LIST_REQUEST':
			return { loading: true, reviews: [] };
		case 'EXPLORE_REVIEW_LIST_SUCCESS':
			return { loading: false, reviews: action.payload };
		case 'EXPLORE_REVIEW_LIST_FAILURE':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const reviewDetailListReducer = (state = { review: {} }, action) => {
	switch (action.type) {
		case 'REVIEW_DETAIL_REQUEST':
			return { loading: true, ...state };
		case 'REVIEW_DETAIL_SUCCESS':
			return { loading: false, review: action.payload };
		case 'REVIEW_DETAIL_FAILURE':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
