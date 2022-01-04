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
			>
				Add Review
			</Button>
			<Button
				className='w-50 menu-btn m-2'
				variant='outline-dark'
				size='m'
			>
				Search
			</Button>
		</Card>
	);
};

ActionCard.propTypes = {};

export default ActionCard;
