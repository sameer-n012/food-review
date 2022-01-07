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
