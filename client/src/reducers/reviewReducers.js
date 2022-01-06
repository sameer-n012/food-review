//TODO clean up review reducers
//TODO standardize review reducers
//QUESTION should post, put, and delete actions affect reviews state
//since app anyway calls to db on reload of reviews

export const reviewListReducer = (
	state = { loading: false, reviews: [] },
	action
) => {
	switch (action.type) {
		case 'REVIEW_LIST_REQUEST':
			return { loading: true, reviews: [] };
		case 'REVIEW_LIST_SUCCESS':
			return { loading: false, error: null, reviews: action.payload };
		case 'REVIEW_LIST_FAILURE':
			return { loading: false, error: action.payload, reviews: [] };
		case 'POST_REVIEW_REQUEST':
			return { loading: true, ...state };
		case 'POST_REVIEW_SUCCESS':
			return {
				loading: false,
				error: null,
				reviews: [...state.reviews, action.payload],
			};
		case 'POST_REVIEW_FAILURE':
			return { loading: false, error: action.payload, ...state };
		case 'UPDATE_REVIEW_REQUEST':
			return { loading: true, ...state };
		case 'UPDATE_REVIEW_SUCCESS':
			return {
				loading: false,
				error: null,
				reviews: state.reviews.map((review) =>
					action.payload._id === review._id ? action.payload : review
				),
			};
		case 'UPDATE_REVIEW_FAILURE':
			return { loading: false, error: action.payload, ...state };
		case 'DELETE_REVIEW_REQUEST':
			return { loading: true, ...state };
		case 'DELETE_REVIEW_SUCCESS':
			return {
				loading: false,
				error: null,
				reviews: state.reviews.filter(
					(review) => review._id !== action.payload._id
				),
			};
		case 'DELETE_REVIEW_FAILURE':
			return { loading: false, error: action.payload, ...state };
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
			return { loading: false, error: null, review: action.payload };
		case 'REVIEW_DETAIL_FAILURE':
			return { loading: false, error: action.payload, ...state };
		case 'POST_REVIEW_REQUEST':
			return { loading: true, ...state };
		case 'POST_REVIEW_SUCCESS':
			return { loading: false, error: null, review: action.payload };
		case 'POST_REVIEW_FAILURE':
			return { loading: false, error: action.payload, ...state };
		case 'UPDATE_REVIEW_REQUEST':
			return { loading: true, ...state };
		case 'UPDATE_REVIEW_SUCCESS':
			return { loading: false, error: null, review: action.payload };
		case 'UPDATE_REVIEW_FAILURE':
			return { loading: false, error: action.payload, ...state };
		case 'DELETE_REVIEW_REQUEST':
			return { loading: true, ...state };
		case 'DELETE_REVIEW_SUCCESS':
			return { loading: false, error: null, review: null };
		case 'DELETE_REVIEW_FAILURE':
			return { loading: false, error: action.payload, ...state };
		default:
			return state;
	}
};
