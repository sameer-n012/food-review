import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Stack, Button, Modal } from 'react-bootstrap';
import { authenticateUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const SigninForm = ({ txtColor }) => {
	let navigate = useNavigate();
	let errorClosed = false;

	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const { loading, error, cu } = useSelector((state) => state.currentUser);
	console.log(cu);

	//TODO use react useState and setState instead of object here
	let formState = {
		username: '',
		password: '',
	};

	const dispatch = useDispatch();

	useEffect(() => {
		console.log('went through useeffect');
		if (error) {
			handleShowModal();
		}
		if (cu && cu._id && cu.token) {
			navigate('/');
		}
	}, [cu, error, navigate]);

	const handleChange = (event) => {
		formState = { ...formState, [event.target.name]: event.target.value };
	};

	const login = () => {
		console.log(
			`logging in with username: ${formState.username}, and password: ${formState.password}`
		);

		//FIXME regex not working
		//for some reason user] passes regex check
		const usernameRegex = '[0-9a-zA-z-_]{1,20}';
		const passwordRegex = '[0-9A-Za-z#-&(-+!-.<-@^_-]{8,20}';

		if (
			formState.username.match(usernameRegex) != formState.username ||
			formState.password.match(passwordRegex) != formState.password
		) {
			console.log('login failed regex check');
			handleShowModal();
			return;
		}
		dispatch(
			authenticateUser({
				username: formState.username,
				password: formState.password,
			})
		);

		//FIXME remove call to handleShowModal
		//need to figure out how to only show on invalid attempt rather than always showing
		handleShowModal();

		// const user = useSelector((state) => state.authenticateUser);
		// console.log(user);
		// const { cuid } = user;
	};

	return (
		<>
			{error ? (
				<Modal show={showModal} onHide={handleCloseModal}>
					<Modal.Header closeButton>
						<Modal.Title>Invalid Credentials Entered</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Make Sure: </p>
						<small>
							* Your username is between 1-20 characters.
						</small>
						<br />
						<small>
							* Your password is between 8-20 characters.
						</small>
						<br />
						<small>
							* Your username contains only A-z, 0-9, _, or -.
						</small>
						<br />
						<small>
							* Your password contains only A-z, 0-9, !-+, ?, =,
							_, or -.
						</small>
					</Modal.Body>
				</Modal>
			) : (
				<></>
			)}
			<Form.Label htmlFor='signinUsername' style={{ color: txtColor }}>
				Username:
			</Form.Label>
			<Form.Control
				type='text'
				name='username'
				id='signinUsername'
				aria-describedby='singinUsernameHelpText'
				onChange={(e) => handleChange(e)}
			/>
			<Form.Text
				style={{ fontSize: '0.75rem', color: txtColor }}
				id='signinUsernameHelpText'
			>
				Your username must be between 1 and 20 characters and consist of
				0-9, A-z, and special symbols.
			</Form.Text>
			<br />
			<br />
			<Form.Label htmlFor='signinPassword' style={{ color: txtColor }}>
				Password:
			</Form.Label>
			<Form.Control
				type='password'
				name='password'
				className=''
				id='signinPassword'
				onChange={(e) => handleChange(e)}
				aria-describedby='singinPasswordHelpText'
			/>
			<Form.Text
				style={{
					fontSize: '0.75rem',
					color: txtColor,
				}}
				id='signinPasswordHelpText'
			>
				Your password must be between 8 and 20 characters and consist of
				0-9, A-z, and special symbols.
			</Form.Text>
			<br />
			<br />
			<Stack direction='horizontal' className='justify-content-around'>
				<Button
					className='btn m-2'
					variant='outline-light'
					size='m'
					value='submit'
					onClick={() => {
						login();
					}}
				>
					Log In
				</Button>
				<Button
					className='btn m-2'
					variant='outline-light'
					size='m'
					value='submit'
					disabled
					onClick={() => console.log('signing up')}
				>
					Sign Up
				</Button>
			</Stack>
		</>
	);
};

SigninForm.defaultProps = {
	txtColor: 'black',
};

SigninForm.propTypes = {
	txtColor: PropTypes.string,
};

export default SigninForm;
