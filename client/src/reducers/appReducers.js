export const navbarReducer = (state = { navtab: 0 }, action) => {
	switch (action.type) {
		case 'CHANGE_NAVTAB_REQUEST':
			return { loading: true, ...state };
		case 'CHANGE_NAVTAB_SUCCESS':
			return { loading: false, navtab: action.payload };
		case 'CHANGE_NAVTAB_FAILURE':
			return { loading: false, navtab: 0 };
		default:
			return state;
	}
};

export const storedImageReducer = (
	state = {
		storedImageList: [{ name: 'defaultImage.png', image: null }],
	},
	action
) => {
	switch (action.type) {
		case 'GET_IMAGE_REQUEST':
			return { loading: true, ...state };
		case 'GET_IMAGE_SUCCESS':
			return {
				loading: false,
				error: null,
				storedImageList: [
					...state.storedImageList,
					{
						name: action.payload.name,
						image: action.payload.image,
					},
				],
			};
		case 'GET_IMAGE_FAILURE':
			return { loading: false, error: action.payload, ...state };
		case 'CLEAR_IMAGE_REQUEST':
			return { loading: true, ...state };
		case 'CLEAR_IMAGE_SUCCESS':
			return {
				loading: false,
				error: null,
				storedImageList: [
					{
						name: 'defaultImage.png',
						image: null,
					},
				],
			};
		case 'CLEAR_IMAGE_FAILURE':
			return { loading: false, error: action.payload, ...state };
		default:
			return state;
	}
};
