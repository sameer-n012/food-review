import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FaTimes, FaEdit, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import { formatDate } from '../resources/dateTools.js';
import StarRating from './StarRating.js';
import { listUsername } from '../actions/userActions.js';

const Review = ({ review, onDelete }) => {
	return (
		<Card className='review border-black-2 p-0 m-3'>
			<Card.Img
				onClick={() => console.log('viewing ', review._id)}
				className='review-image cursor-clickable'
				variant='top'
				src={review.image ? review.image : '/images/defaultImage.png'}
			/>
			<Card.Body
				onClick={() => console.log('viewing ', review._id)}
				className='cursor-clickable'
			>
				<Card.Title className='mb-2'>
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
				<div>
					{review.private ? ( //NOTE maybe remove options to private, edit, delete from footer?
						<FaRegEyeSlash
							className='me-3 align-text-top cursor-clickable'
							onClick={() =>
								console.log('unprivating ', review._id)
							}
						/>
					) : (
						<FaRegEye
							className='me-3 align-text-top cursor-clickable'
							onClick={() =>
								console.log('privating ', review._id)
							}
						/>
					)}
					<FaEdit
						className='me-3 align-text-top cursor-clickable'
						onClick={() => console.log('editing ', review._id)}
					/>
					<FaTimes
						className='align-text-top cursor-clickable'
						onClick={() => console.log('deleting ', review._id)}
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
