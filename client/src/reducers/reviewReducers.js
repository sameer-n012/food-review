export const reviewListReducer = (
	state = { loading: false, reviews: [] },
	action
) => {
	switch (action.type) {
		case 'REVIEW_LIST_REQUEST':
			return { loading: true, reviews: [] };
		case 'REVIEW_LIST_SUCCESS':
			return { loading: false, reviews: action.payload };
		case 'REVIEW_LIST_FAILURE':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const reviewDetailReducer = (
	state = { loading: false, review: {} },
	action
) => {
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
