import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaEdit, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import { formatDate } from '../resources/dateTools.js';
import StarRating from './StarRating.js';
import defaultImage from '../resources/defaultImage.png';

const Review = ({ review, onDelete }) => {
	return (
		<Card className='review p-0 m-3'>
			<Card.Img
				onClick={() => console.log('viewing ', review.id)}
				className='review-image cursor-clickable'
				variant='top'
				src={defaultImage}
			/>
			<Card.Body
				onClick={() => console.log('viewing ', review.id)}
				className='cursor-clickable'
			>
				<Card.Title className='mb-2'>
					{review.rest}: {review.name}
				</Card.Title>
				<Card.Text className='small'>
					<StarRating rating={review.rating} />
				</Card.Text>
			</Card.Body>
			<Card.Footer className='d-flex justify-content-between align-items-center'>
				<p className='small text-muted m-0'>
					Reviewed: {formatDate(review.lastDate)}
				</p>
				<div>
					{review.private ? (
						<FaRegEyeSlash
							className='me-3 align-text-top cursor-clickable'
							onClick={() =>
								console.log('unprivating ', review.id)
							}
						/>
					) : (
						<FaRegEye
							className='me-3 align-text-top cursor-clickable'
							onClick={() => console.log('privating ', review.id)}
						/>
					)}
					<FaEdit
						className='me-3 align-text-top cursor-clickable'
						onClick={() => console.log('editing ', review.id)}
					/>
					<FaTimes
						className='align-text-top cursor-clickable'
						onClick={() => onDelete(review.id)}
					/>
				</div>
			</Card.Footer>
		</Card>
	);
};

Review.propTypes = {
	review: PropTypes.object.isRequired,
};

export default Review;
