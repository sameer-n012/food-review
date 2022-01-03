import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaEdit } from 'react-icons/fa';

const Review = ({ review, onDelete }) => {
	return (
		<div className='task'>
			<h3>
				{review.name} ({review.rest}): {review.rating}
				<span>
					<FaEdit />
					<FaTimes onClick={() => onDelete(review.id)} />
				</span>
			</h3>
			<p>{review.lastDate}</p>
		</div>
	);
};

Review.propTypes = {
	review: PropTypes.object.isRequired,
};

export default Review;
