import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home.js';
import View from './screens/View.js';
import Signin from './screens/Signin.js';
import Edit from './screens/Edit.js';
import Settings from './screens/Settings.js';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

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
			</Routes>
		</BrowserRouter>
	);
};

export default App;
