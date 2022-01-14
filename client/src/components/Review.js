import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { formatDate } from '../resources/dateTools.js';
import StarRating from './StarRating.js';
import { getImage } from '../actions/appActions.js';
import { listReviewDetails } from '../actions/reviewActions.js';

const Review = ({ review }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error: imageerror, storedImageList } = useSelector(
		(state) => state.storedImages
	);

	const { cu } = useSelector((state) => state.currentUser);

	const imgInStoredImages = storedImageList.filter(
		(image) => image.name === review.image
	);

	useEffect(() => {
		if (
			review &&
			review.image &&
			!storedImageList.some((image) => image.name === review.image)
		) {
			dispatch(getImage(review.image));
		}
	}, [dispatch, review]);

	const viewReview = () => {
		if (!!cu) {
			if (!review.private || cu._id === review.author_id) {
				dispatch(
					listReviewDetails(review._id, cu.token, review.private)
				);
				navigate('/review');
			}
		} else {
			if (!review.private) {
				dispatch(listReviewDetails(review._id, '', review.private));
				navigate('/review');
			}
		}
	};

	return (
		<Card className='review border-black-2 p-0 m-3'>
			<Card.Img
				onClick={() => viewReview()}
				className='review-image cursor-clickable'
				variant='top'
				src={
					storedImageList.find((image) => image.name === review.image)
						? `${
								storedImageList.find(
									(image) => image.name === review.image
								).image
						  }`
						: `${process.env.PUBLIC_URL}/images/defaultImage.png`
				}
			/>
			<Card.Body
				onClick={() => viewReview()}
				className='cursor-clickable'
			>
				<Card.Title className='mb-2 overflow-text'>
					{review.restaurant}: {review.name}
				</Card.Title>
				<Card.Text className='small'>
					<StarRating
						rating={review.rating}
						reviewer={
							review.author_name ? review.author_name : 'Unknown'
						}
					/>
				</Card.Text>
			</Card.Body>
			<Card.Footer className='d-flex justify-content-between align-items-center'>
				<p className='small text-muted m-0'>
					Reviewed: {formatDate(review.lastDate)}
				</p>
			</Card.Footer>
		</Card>
	);
};

Review.propTypes = {
	review: PropTypes.object.isRequired,
};

export default Review;
