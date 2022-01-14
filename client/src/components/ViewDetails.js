import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserReview } from '../actions/reviewActions';
import { Container, Col, Row, Stack, Button, Image } from 'react-bootstrap';
import { formatDate } from '../resources/dateTools';

const ViewDetails = ({ review, cu }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { error: imageerror, storedImageList } = useSelector(
		(state) => state.storedImages
	);

	const deleteReview = () => {
		console.log('deleting review: ', review._id);
		dispatch(deleteUserReview(review._id, cu.token));
		navigate('/');
	};

	return (
		<>
			<h3 className='w-100' style={{ fontSize: '2.5rem' }}>
				{review.name}
			</h3>
			<p
				className='w-100'
				style={{ fontSize: '1.2rem', fontStyle: 'italic' }}
			>
				Reviewed by {review.author_name} on{' '}
				{formatDate(review.lastDate)} at {review.restaurant}
			</p>
			<hr className=' mb-4 w-100 border-black-2'></hr>

			<Container fluid className='d-flex'>
				<Col className='d-flex flex-column justify-content-center'>
					<Row className='mb-4'>
						<p style={{ fontSize: '1.5rem' }}>
							Rating: {review.rating}
						</p>
					</Row>
					<Row className='mb-4'>
						<p style={{ fontSize: '1.5rem' }}>
							Notes: {review.notes ? review.notes : 'None'}
						</p>
					</Row>
					<Row className='mb-4'>
						<p style={{ fontSize: '1.5rem' }}>
							Private: {review.private ? 'Yes' : 'No'}
						</p>
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
								onClick={() => navigate('/')}
							>
								Back
							</Button>
							{cu && cu._id === review.author_id ? (
								<>
									<Button
										className='btn m-2 mt-0'
										variant='outline-dark'
										size='m'
										value='submit'
										onClick={() => navigate('/edit')}
									>
										Edit
									</Button>
									<Button
										className='btn m-2 mt-0'
										variant='outline-dark'
										size='m'
										value='submit'
										onClick={() => deleteReview()}
									>
										Delete
									</Button>
								</>
							) : (
								<></>
							)}
						</Stack>
					</Row>
				</Col>
				<Col>
					<Row className='mb-4'>
						<Image
							src={
								storedImageList.find(
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
								width: '25rem',
								height: '25rem',
								objectFit: 'contain',
								marginLeft: 'auto',
								marginRight: 'auto',
							}}
						/>
					</Row>
				</Col>
			</Container>
		</>
	);
};

ViewDetails.propTypes = {
	review: PropTypes.object.isRequired,
	cu: PropTypes.object,
};

export default ViewDetails;
