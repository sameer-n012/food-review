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
