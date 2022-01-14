import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Stack, Button, Modal } from 'react-bootstrap';
import { authenticateUser, createUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const SigninForm = ({ txtColor }) => {
	let navigate = useNavigate();

	const usernameRegex = new RegExp('^[0-9a-zA-Z-_]{1,20}$');
	const passwordRegex = new RegExp('^[0-9A-Za-z#-&(-+!-.<-@^_-]{8,20}$');

	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const [formFields, setFormFields] = useState({
		username: '',
		password: '',
	});
	const handleEditFormFields = (event) =>
		setFormFields({
			...formFields,
			[event.target.name]: event.target.value,
		});
	const handleClearFormFields = () => {
		setFormFields({ username: '', password: '' });
	};

	const { loading, error, cu } = useSelector((state) => state.currentUser);
	// console.log(cu);

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

	const signup = () => {
		const { username, password } = formFields;
		console.log(
			`signing up with username: ${username}, and password: ${password}`
		);

		handleClearFormFields();

		if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
			console.log('login failed regex check');
			handleShowModal();
			return;
		}

		dispatch(
			createUser({
				username: username,
				password: password,
			})
		);
	};

	const login = () => {
		const { username, password } = formFields;
		console.log(
			`logging in with username: ${username}, and password: ${password}`
		);

		handleClearFormFields();

		if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
			console.log('login failed regex check');
			handleShowModal();
			return;
		}
		dispatch(
			authenticateUser({
				username: username,
				password: password,
			})
		);
	};

	return (
		<>
			<Modal
				show={showModal}
				className='failure-alert'
				onHide={handleCloseModal}
			>
				<Modal.Header className='bg-secondary text-light' closeButton>
					<Modal.Title>Invalid Credentials Entered</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p className='mt-3 mb-1'>
						If you are logging in make sure:{' '}
					</p>
					<small>* Your username and password are correct</small>
					<br />
					<p className='mt-3 mb-1'>
						If you are signing up make sure:{' '}
					</p>
					<small>* Your username is between 1-20 characters.</small>
					<br />
					<small>* Your password is between 8-20 characters.</small>
					<br />
					<small>
						* Your username contains only A-z, 0-9, _, or -.
					</small>
					<br />
					<small>
						* Your password contains only A-z, 0-9, !-+, ?, =, _, or
						-.
					</small>
					<p className='mt-3 mb-1'></p>
				</Modal.Body>
			</Modal>

			<Form.Label htmlFor='signinUsername' style={{ color: txtColor }}>
				Username:
			</Form.Label>
			<Form.Control
				type='text'
				name='username'
				id='signinUsername'
				value={formFields.username}
				aria-describedby='singinUsernameHelpText'
				onChange={(e) => handleEditFormFields(e)}
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
				value={formFields.password}
				onChange={(e) => handleEditFormFields(e)}
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
					onClick={() => signup()}
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
