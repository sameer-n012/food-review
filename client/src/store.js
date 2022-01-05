import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	userReviewListReducer,
	exploreReviewListReducer,
	reviewDetailListReducer,
} from './reducers/reviewReducers';

const middleware = [thunk];
const reducers = combineReducers({
	userReviewListReducer,
	exploreReviewListReducer,
	reviewDetailListReducer,
});

const userLoggedIn = localStorage.getItem('currentUserId') ? JSON.parse(localStorage.getItem('currentUserId')) : null;
const initialState = {
    currentUserId = userLoggedIn,
};

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
