import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { deleteUserReview } from '../actions/reviewActions';
import Header from '../components/Header';
import { Container, Col, Row } from 'react-bootstrap';
import ViewDetails from '../components/ViewDetails';

const View = () => {
	const { error: reviewerror, review } = useSelector(
		(state) => state.reviewDetail
	);
	const { error: usererror, cu } = useSelector((state) => state.currentUser);

	return (
		<div>
			<Header title='Food Review' loggedIn={!!cu} />
			<Container className='p-2 mt-5'>
				{usererror || reviewerror || !review ? (
					<p className='text-center mt-5'>
						Sorry something went wrong
					</p>
				) : (
					<ViewDetails review={review} cu={cu} />
				)}
			</Container>
		</div>
	);
};

View.propTypes = {};

export default View;
