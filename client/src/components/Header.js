import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';

const Header = ({ title, loggedIn }) => {
	let navigate = useNavigate();

	const dispatch = useDispatch();

	const logoutSignin = () => {
		if (loggedIn) {
			dispatch(logoutUser());
		}

		navigate('/signin');
	};

	return (
		<Container className='m-0 p-4 header'>
			<h1 className='cursor-clickable'>
				<a onClick={() => navigate('/')} className='header-title-link'>
					{title}
				</a>
			</h1>
			{loggedIn ? (
				<Button
					className='btn m-2'
					variant='outline-light'
					size='m'
					onClick={() => {
						logoutSignin();
					}}
				>
					Log Out
				</Button>
			) : (
				<Button
					className='btn m-2'
					variant='outline-light'
					size='m'
					onClick={() => {
						logoutSignin();
					}}
				>
					Sign In
				</Button>
			)}
		</Container>
	);
};

Header.defaultProps = {
	signin: false,
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	signin: PropTypes.bool,
};

export default Header;
