import React from 'react';
import ReactDOM from 'react-dom';
//import './index0.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
