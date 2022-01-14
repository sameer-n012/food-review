import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SettingsDetails from '../components/SettingsDetails';

const View = () => {
	const { error: usererror, cu } = useSelector((state) => state.currentUser);

	return (
		<div>
			<Header title='Food Review' loggedIn={!!cu} />
			<Container className='p-2 mt-5 above-footer'>
				{!cu ? (
					<p className='text-center'>Sign in to view your settings</p>
				) : usererror ? (
					<p className='text-center'>Sorry something went wrong</p>
				) : (
					<SettingsDetails />
				)}
			</Container>
			<Footer />
		</div>
	);
};

View.propTypes = {};

export default View;
