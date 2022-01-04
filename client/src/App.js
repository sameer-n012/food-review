import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './screens/Home.js';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

const App = () => {
	return (
		// <Router>
		// 	<main className='py-3'>
		// 		<Container>
		// 			<Route path='/' component={Home} exact />
		// 		</Container>
		// 	</main>
		// </Router>
		<div>
			<Home />
		</div>
	);
};

export default App;
