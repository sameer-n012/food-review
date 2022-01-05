import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './screens/Home.js';
import View from './screens/View.js';
import Signin from './screens/Signin.js';
import Explore from './screens/Explore.js';
import Edit from './screens/Edit.js';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

const App = () => {
	return (
		<Router>
			<main className='py-3'>
				<Container>
					<Route path='/' component={Home} exact />
                    <Route path='/explore' component={Explore} exact/>
                    <Route path='/review/:id' component={View} exact/>
                    <Route path='/edit-review/:id' component={Edit} exact/>
                    <Route path='/signin' component={Signin}/>
				</Container>
			</main>
		</Router>
	);
};

export default App;
