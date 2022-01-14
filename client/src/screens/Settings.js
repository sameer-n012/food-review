import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import SettingsDetails from '../components/SettingsDetails';

const View = () => {
	const { error: usererror, cu } = useSelector((state) => state.currentUser);

	return (
		<div>
			<Header title='Food Review' loggedIn={!!cu} />
			<Container className='p-2 mt-5'>
				{!cu ? (
					<p className='text-center'>Sign in to view your settings</p>
				) : usererror ? (
					<p className='text-center'>Sorry something went wrong</p>
				) : (
					<SettingsDetails />
				)}
			</Container>
		</div>
	);
};

View.propTypes = {};

export default View;
