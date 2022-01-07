import React from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, reviewer, color, showAll }) => {
	let stars = [];
	const totalStars = showAll ? 5 : Math.ceil(rating);

	for (let i = 0; i < totalStars; i++) {
		stars.push(
			<span key={i} style={{ color: color }} className='mb-1'>
				{rating - i >= 1 ? (
					<FaStar className='align-text-top' />
				) : rating - i > 0 ? (
					<FaStarHalfAlt className='align-text-top' />
				) : (
					<FaRegStar className='align-text-top' />
				)}
			</span>
		);
	}

	return (
		<div className='star-rating-div'>
			{stars}
			<span>({rating})</span>
			<span>
				by{' '}
				{reviewer.length <= 15
					? reviewer
					: reviewer.substring(0, 12) + '...'}
			</span>
		</div>
	);
};

StarRating.defaultProps = {
	rating: 5,
	color: 'black',
	showAll: true,
	reviewer: 'Unknown',
};

StarRating.propTypes = {
	rating: PropTypes.number.isRequired,
	color: PropTypes.string,
	showAll: PropTypes.bool,
	reviewer: PropTypes.string,
};

export default StarRating;
