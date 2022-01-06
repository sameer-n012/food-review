import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	reviewListReducer,
	reviewDetailReducer,
} from './reducers/reviewReducers';
import {
	usernameExistsReducer,
	listUsernameReducer,
	userDetailReducer,
	currentUserReducer,
} from './reducers/userReducers';

const middleware = [thunk];
const reducers = combineReducers({
	reviewList: reviewListReducer,
	reviewDetail: reviewDetailReducer,
	usernameExists: usernameExistsReducer,
	listUsername: listUsernameReducer,
	currentUser: currentUserReducer,
	userDetail: userDetailReducer,
});

//TODO get initial state from local storage
const cuid =
	localStorage.getItem('cuid') && localStorage.getItem('cutoken')
		? localStorage.getItem('cuid')
		: null;

const cutoken =
	localStorage.getItem('cuid') && localStorage.getItem('cutoken')
		? localStorage.getItem('cutoken')
		: null;

const initialState = {
	//currentUser: { cu: { _id: cuid, token: cutoken }},
};

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
