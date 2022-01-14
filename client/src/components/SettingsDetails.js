import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	Container,
	Col,
	Row,
	Stack,
	Button,
	Form,
	Modal,
} from 'react-bootstrap';
import { deleteUser, updateUser } from '../actions/userActions';

const SettingsDetails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		loading,
		updateerror: error,
		cu,
	} = useSelector((state) => state.currentUser);

	const usernameRegex = new RegExp('^[0-9a-zA-Z-_]{1,20}$');
	const passwordRegex = new RegExp('^[0-9A-Za-z#-&(-+!-.<-@^_-]{8,20}$');

	const [formFields, setFormFields] = useState({
		username: cu.username,
		oldpassword: '',
		newpassword: '',
	});
	const handleEditFormFields = (event) => {
		setFormFields({
			...formFields,
			[event.target.name]: event.target.value,
		});
	};
	const handleClearFormFields = () => {
		setFormFields({
			username: cu.username,
			oldpassword: '',
			newpassword: '',
		});
	};

	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	useEffect(() => {
		console.log('went through useeffect');
		handleClearFormFields();
		if (error) {
			handleShowModal();
		}
	}, [cu, error, navigate]);

	const deleteU = () => {
		dispatch(deleteUser(cu._id, cu.token));
		navigate('/signin');
	};

	const updateU = () => {
		const { username, oldpassword, newpassword } = formFields;

		handleClearFormFields();

		if (oldpassword && newpassword && username) {
			if (
				!usernameRegex.test(username) ||
				!passwordRegex.test(oldpassword) ||
				!passwordRegex.test(newpassword)
			) {
				console.log('update failed regex check');
				handleShowModal();
				return;
			}

			dispatch(
				updateUser(
					formFields.oldpassword,
					{
						...cu,
						username: formFields.username,
						password: formFields.newpassword,
					},
					cu.token
				)
			);
		}
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
						If you are updating your account make sure:{' '}
					</p>
					<small>* Your old password is correct</small>
					<br />
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

			<h3 className='w-100' style={{ fontSize: '2.5rem' }}>
				{cu.username}
			</h3>
			<hr className=' mb-4 w-100 border-black-2'></hr>
			<div>
				<Container fluid className='d-flex'>
					<Col className=' w-50 d-flex flex-column justify-content-center'>
						<Row className='mb-4'>
							<Form.Label
								htmlFor='userUsername'
								className='editFormLabel'
							>
								Username:
							</Form.Label>
							<Form.Control
								type='text'
								name='username'
								id='userUsername'
								className='editFormField'
								value={formFields.username}
								onChange={(e) => handleEditFormFields(e)}
							/>
						</Row>
						<Row className='mb-4'>
							<Form.Label
								htmlFor='userOldPassword'
								className='editFormLabel'
							>
								Old Password:
							</Form.Label>
							<Form.Control
								type='password'
								name='oldpassword'
								id='userOldPassword'
								className='editFormField'
								value={formFields.oldpassword}
								onChange={(e) => handleEditFormFields(e)}
							/>
						</Row>
						<Row className='mb-4'>
							<Form.Label
								htmlFor='userNewPassword'
								className='editFormLabel'
							>
								New Password:
							</Form.Label>
							<Form.Control
								type='password'
								name='newpassword'
								id='userNewPassword'
								className='editFormField'
								value={formFields.newpassword}
								onChange={(e) => handleEditFormFields(e)}
							/>
						</Row>
					</Col>
					<Col className='d-flex justify-content-center'>
						<Row className='mb-4'>
							<Stack
								direction='vertical'
								className='justify-content-evenly align-items-center'
							>
								<Button
									className='btn m-2 mt-0'
									variant='outline-dark'
									size='m'
									value='submit'
									onClick={() => navigate('/')}
								>
									Back
								</Button>
								<Button
									className='btn m-2 mt-0'
									variant='outline-dark'
									size='m'
									value='submit'
									onClick={() => updateU()}
								>
									Update
								</Button>
								<Button
									className='btn m-2 mt-0'
									variant='outline-dark'
									size='m'
									value='submit'
									onClick={() => deleteU()}
								>
									Delete
								</Button>
							</Stack>
						</Row>
					</Col>
				</Container>
			</div>
		</>
	);
};

SettingsDetails.propTypes = {
	cu: PropTypes.object.isRequired,
};

export default SettingsDetails;
