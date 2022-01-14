import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SigninForm from '../components/SigninForm';

const Signin = () => {
	return (
		<>
			<Header title='Food Review' signin={false} />
			<Container className='signin-container border-black-2 p-4'>
				<SigninForm txtColor='white' />
			</Container>
			<Footer />
		</>
	);
};

export default Signin;
