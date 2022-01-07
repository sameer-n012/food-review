import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home.js';
import View from './screens/View.js';
import Signin from './screens/Signin.js';
import Explore from './screens/Explore.js';
import Edit from './screens/Edit.js';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

//TODO add routes as screens created
//TODO delete explore route
//will be combined with home?
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} exact />
				<Route path='/home' element={<Home />} exact />
				{/* <Route path='/explore' element={<Explore />} exact />
				<Route path='/review/:id' element={<View />} exact />
                <Route path='/edit-review/:id' element={<Edit />} exact /> */}
				<Route path='/signin' element={<Signin />} exact />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
