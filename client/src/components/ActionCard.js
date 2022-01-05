import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const ActionCard = () => {
	return (
		<Card className='action-card p-1 m-3 align-items-center justify-content-center'>
			<Button
				className='w-50 menu-btn m-2'
				variant='outline-dark'
				size='m'
				onClick={() => console.log('adding review')}
			>
				Add Review
			</Button>
			<Button
				className='w-50 menu-btn m-2'
				variant='outline-dark'
				size='m'
				disabled='true' //TODO do this maybe
				onClick={() => console.log('searching reviews')}
			>
				Search
			</Button>
		</Card>
	);
};

ActionCard.propTypes = {};

export default ActionCard;
