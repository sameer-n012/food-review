import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	reviewListReducer,
	reviewDetailReducer,
} from './reducers/reviewReducers';
import { currentUserReducer } from './reducers/userReducers';
import {
	navbarReducer,
	storedImageReducer,
	searchObjectReducer,
} from './reducers/appReducers';

const middleware = [thunk];
const reducers = combineReducers({
	navbar: navbarReducer,
	reviewList: reviewListReducer,
	reviewDetail: reviewDetailReducer,
	currentUser: currentUserReducer,
	storedImages: storedImageReducer,
	searchObject: searchObjectReducer,
});

const initialState = {};

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
