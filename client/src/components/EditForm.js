import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getToday, formatDate } from '../resources/dateTools';
import {
	Form,
	Button,
	Stack,
	Container,
	Col,
	Row,
	Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getImage } from '../actions/appActions';
import { saveImage } from '../actions/appActions';
import { updateUserReview, postUserReview } from '../actions/reviewActions';

const EditForm = ({ isAdding, review, currentUser }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formFields, setFormFields] = useState({
		author_id: currentUser._id,
		author_name: currentUser.username,
		name: review.name,
		restaurant: review.restaurant,
		rating: review.rating,
		private: review.private,
		notes: review.notes,
		lastDate: formatDate(getToday()),
		image: review.image ? review.image : null,
	});
	const handleEditFormFields = (event) => {
		setFormFields({
			...formFields,
			[event.target.name]: event.target.value,
		});
	};

	const [imageFile, setImageFile] = useState({
		imageName: '',
		imageURI: '',
	});
	const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			console.log(e.target.files[0].name);
			let reader = new FileReader();
			reader.onload = (ev) => {
				setFormFields({
					...formFields,
					image: e.target.files[0].name,
				});
				setImageFile({
					imageName: e.target.files[0].name,
					imageURI: ev.target.result,
				});
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const { error: imageerror, storedImageList } = useSelector(
		(state) => state.storedImages
	);

	const updateReview = () => {
		if (formFields.name && formFields.restaurant && formFields.rating) {
			if (!imageFile || !imageFile.imageName || !imageFile) {
				dispatch(
					updateUserReview(
						review._id,
						{
							...formFields,
							lastDate: getToday(),
						},
						null,
						currentUser.token
					)
				);
			} else {
				dispatch(
					updateUserReview(
						review._id,
						{
							...formFields,
							lastDate: getToday(),
						},
						{
							...imageFile,
						},
						currentUser.token
					)
				);
			}
		}
		navigate('/review');
	};

	const createReview = () => {
		if (!imageFile || !imageFile.imageName || !imageFile) {
			dispatch(
				postUserReview(
					{
						...formFields,
					},
					null,
					currentUser.token
				)
			);
		} else {
			dispatch(
				postUserReview(
					{
						...formFields,
					},
					{
						...imageFile,
					},
					currentUser.token
				)
			);
		}
		navigate('/review');
	};

	useEffect(() => {
		if (
			review &&
			review.image &&
			!storedImageList.some((image) => image.name === review.image)
		) {
			dispatch(getImage(review.image));
		}
	}, [dispatch, review]);

	return (
		<Container fluid className='d-flex'>
			<Col className=''>
				<Row className='mb-4'>
					<Form.Label
						htmlFor='reviewAuthorName'
						className='editFormLabel'
					>
						Author Username:
					</Form.Label>
					<Form.Control
						type='text'
						name='authorName'
						id='reviewAuthorName'
						className='editFormField'
						read-only='true'
						readOnly
						defaultValue={formFields.author_name}
					/>
				</Row>
				<Row className='mb-4'>
					<Form.Label
						htmlFor='reviewLastDate'
						className='editFormLabel'
					>
						Reviewed On:
					</Form.Label>
					<Form.Control
						type='text'
						name='lastdate'
						id='reviewLastDate'
						className='editFormField'
						read-only='true'
						readOnly
						defaultValue={formFields.lastDate}
					/>
				</Row>
				<Row className='mb-4'>
					<Form.Label htmlFor='reviewName' className='editFormLabel'>
						Food Name:
					</Form.Label>
					<Form.Control
						type='text'
						name='name'
						id='reviewName'
						className='editFormField'
						value={formFields.name}
						onChange={(e) => handleEditFormFields(e)}
					/>
				</Row>
				<Row className='mb-4'>
					<Form.Label
						htmlFor='reviewRestaurant'
						className='editFormLabel'
					>
						Restaurant:
					</Form.Label>
					<Form.Control
						type='text'
						name='restaurant'
						id='reviewRestaurant'
						className='editFormField'
						value={formFields.restaurant}
						onChange={(e) => handleEditFormFields(e)}
					/>
				</Row>
				<Row className='mb-4'>
					<Container className='d-flex editFormField'>
						<Container className='d-flex align-items-center'>
							<Form.Label
								htmlFor='reviewRating'
								style={{ width: '5rem' }}
								className='editFormLabel ms-0 me-0 mb-0'
							>
								Rating:
							</Form.Label>
							<Form.Control
								type='number'
								name='rating'
								min='0'
								max='5'
								step='0.5'
								id='reviewRating'
								style={{ width: '5rem' }}
								className='editFormField ms-0 me-0'
								value={formFields.rating}
								onChange={(e) => handleEditFormFields(e)}
							/>
						</Container>
						<Container className='d-flex align-items-center'>
							<Form.Label
								htmlFor='reviewPrivate'
								style={{ width: '5rem' }}
								className='editFormLabel ms-0 me-0 mb-0'
							>
								Private:
							</Form.Label>
							<Form.Check
								type='checkbox'
								name='private'
								id='reviewPrivate'
								style={{ width: '5rem' }}
								className='editFormField ms-0 me-0'
								value={formFields.private}
								onChange={(e) => handleEditFormFields(e)}
							/>
						</Container>
					</Container>
				</Row>
				<Row className='mb-4'>
					<Form.Label htmlFor='reviewNotes' className='editFormLabel'>
						Notes:
					</Form.Label>
					<Form.Control
						type='text'
						name='notes'
						id='reviewNotes'
						className='editFormField'
						value={formFields.notes}
						onChange={(e) => handleEditFormFields(e)}
					/>
				</Row>
			</Col>
			<Col className=''>
				<Row className='mb-4'>
					<Form.Label htmlFor='reviewImage' className='editFormLabel'>
						Image:
					</Form.Label>
					<Form.Control
						type='file'
						accept='.jpg,.jpeg'
						name='image'
						id='reviewImage'
						className='editFormField'
						onChange={(e) => handleImageChange(e)}
					/>
				</Row>
				<Row className='mb-4'>
					<Form.Label className='editFormLabel'>
						Current Image:
					</Form.Label>
					<Image
						src={
							imageFile && imageFile.imageURI
								? imageFile.imageURI
								: storedImageList.find(
										(image) => image.name === review.image
								  )
								? `${
										storedImageList.find(
											(image) =>
												image.name === review.image
										).image
								  }`
								: `${process.env.PUBLIC_URL}/images/defaultImage.png`
						}
						style={{
							width: '20rem',
							height: '20rem',
							objectFit: 'contain',
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					/>
				</Row>
				<Row className='mb-4'>
					<Stack
						direction='horizontal'
						className='justify-content-evenly align-items-center'
					>
						<Button
							className='btn m-2 mt-0'
							variant='outline-dark'
							size='m'
							value='submit'
							onClick={() => navigate('/review')}
						>
							Cancel
						</Button>
						{isAdding ? (
							<Button
								className='btn m-2 mt-0'
								variant='outline-dark'
								size='m'
								value='submit'
								onClick={() => createReview()}
							>
								Create
							</Button>
						) : (
							<Button
								className='btn m-2 mt-0'
								variant='outline-dark'
								size='m'
								value='submit'
								onClick={() => updateReview()}
							>
								Update
							</Button>
						)}
					</Stack>
				</Row>
			</Col>
		</Container>
	);
};

EditForm.defaultProps = {
	review: {
		author_id: '',
		author_name: '',
		name: '',
		image: '',
		restaurant: '',
		lastDate: getToday(),
		rating: 0,
		private: true,
		notes: '',
	},
	currentUser: {
		_id: '',
		username: '',
	},
};

EditForm.propTypes = {
	review: PropTypes.object,
	currentUser: PropTypes.object.isRequired,
};

export default EditForm;
