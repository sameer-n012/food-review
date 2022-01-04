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

const initialState = {};

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
