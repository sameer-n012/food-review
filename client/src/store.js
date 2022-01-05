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
	authenticateUserReducer,
	userDetailReducer,
} from './reducers/userReducers';

const middleware = [thunk];
const reducers = combineReducers({
	reviewList: reviewListReducer,
	reviewDetail: reviewDetailReducer,
	usernameExists: usernameExistsReducer,
	listUsername: listUsernameReducer,
	authenticateUser: authenticateUserReducer,
	userDetail: userDetailReducer,
});

const userLoggedIn = localStorage.getItem('currentUserId')
	? JSON.parse(localStorage.getItem('currentUserId'))
	: '61d52e3520e403af451fe0a1'; //TODO set id to null
const initialState = {
	authenticateUser: { cuid: userLoggedIn },
};

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
