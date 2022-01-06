import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import Reviews from '../components/Reviews';
import SigninForm from '../components/SigninForm';

const Signin = () => {
	return (
		<>
			<Header
				title='Food Review'
				bgColor='indianred'
				txtColor='white'
				signin={false}
			/>
			<Container className='signin-container border-black-2 p-4'>
				<SigninForm txtColor='white' />
			</Container>
		</>
	);
};

export default Signin;
