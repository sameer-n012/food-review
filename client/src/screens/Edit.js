import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditForm from '../components/EditForm';

const Edit = () => {
	const { error: usererror, cu } = useSelector((state) => state.currentUser);
	const { error: reviewerror, review } = useSelector(
		(state) => state.reviewDetail
	);

	return (
		<div>
			<Header title='Food Review' loggedIn={!!cu} />
			<Container className='p-2 mt-5 above-footer'>
				{usererror || reviewerror ? (
					<p className='text-center mt-5'>
						Sorry something went wrong
					</p>
				) : !cu ? (
					<p className='text-center mt-5'>Sign in to edit a review</p>
				) : !!review ? (
					<EditForm
						isAdding={false}
						review={review}
						currentUser={cu}
					/>
				) : (
					<EditForm isAdding={true} currentUser={cu} />
				)}
			</Container>
			<Footer />
		</div>
	);
};

export default Edit;
