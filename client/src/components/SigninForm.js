import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Stack, Button } from 'react-bootstrap';
import { authenticateUser } from '../actions/userActions';

const SigninForm = ({ txtColor }) => {
	//TODO use react useState and setState instead of object here
	let formState = {
		username: '',
		password: '',
	};

	const dispatch = useDispatch();

	const handleChange = (event) => {
		formState = { ...formState, [event.target.name]: event.target.value };
	};

	//TODO do signin form validation before logging in
	const login = () => {
		dispatch(
			authenticateUser({
				username: formState.username,
				password: formState.password,
			})
		);

		console.log(
			`logging in with username: ${formState.username}, and password: ${formState.password}`
		);

		window.location = '/';

		// const user = useSelector((state) => state.authenticateUser);
		// console.log(user);
		// const { cuid } = user;
	};

	return (
		<>
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
					onClick={() => login()}
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
