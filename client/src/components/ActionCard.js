import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCurrentReview } from '../actions/reviewActions';

const ActionCard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const gotoAddReview = () => {
		console.log('adding a review');
		dispatch(clearCurrentReview());
		navigate('/edit');
	};

	return (
		<Card className='action-card border-black-2 p-1 m-3 align-items-center justify-content-center'>
			<Button
				className='w-50 menu-btn m-2'
				variant='outline-dark'
				size='m'
				onClick={() => gotoAddReview()}
			>
				Add Review
			</Button>
			<Button
				className='w-50 menu-btn m-2'
				variant='outline-dark'
				size='m'
				disabled={true} //TODO enable search button
				onClick={() => console.log('searching reviews')}
			>
				Search
			</Button>
		</Card>
	);
};

ActionCard.propTypes = {};

export default ActionCard;
