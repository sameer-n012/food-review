import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { clearImageList } from '../actions/appActions';
import { FaCog } from 'react-icons/fa';
import { clearCurrentReview } from '../actions/reviewActions';

const Header = ({ title, loggedIn }) => {
	let navigate = useNavigate();

	const dispatch = useDispatch();

	const logoutSignin = () => {
		if (loggedIn) {
			dispatch(clearCurrentReview());
			dispatch(clearImageList());
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
			<Container className='me-0 ms-0 float-right d-flex justify-content-end w-50'>
				{loggedIn ? (
					<>
						<Button
							className='btn m-2'
							variant='outline-light'
							size='m'
							style={{ width: '3rem' }}
							onClick={() => {
								navigate('/settings');
							}}
						>
							<FaCog />
						</Button>
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
					</>
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
