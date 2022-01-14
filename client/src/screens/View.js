import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';
import ViewDetails from '../components/ViewDetails';

const View = () => {
	const { error: reviewerror, review } = useSelector(
		(state) => state.reviewDetail
	);
	const { error: usererror, cu } = useSelector((state) => state.currentUser);

	return (
		<div>
			<Header title='Food Review' loggedIn={!!cu} />
			<Container className='p-2 mt-5 above-footer'>
				{usererror || reviewerror || !review ? (
					<p className='text-center mt-5'>
						Sorry something went wrong
					</p>
				) : (
					<ViewDetails review={review} cu={cu} />
				)}
			</Container>
			<Footer />
		</div>
	);
};

View.propTypes = {};

export default View;
