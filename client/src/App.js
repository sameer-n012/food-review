import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home.js';
import View from './screens/View.js';
import Signin from './screens/Signin.js';
import Edit from './screens/Edit.js';
import Settings from './screens/Settings.js';
import Search from './screens/Search.js';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} exact />
				<Route path='/home' element={<Home />} exact />
				<Route path='/review' element={<View />} exact />
				<Route path='/edit' element={<Edit />} exact />
				<Route path='/settings' element={<Settings />} exact />
				<Route path='/signin' element={<Signin />} exact />
				<Route path='/search' element={<Search />} exact />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
