import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import Reviews from '../components/Reviews';
import { listUserReviews, deleteUserReview } from '../actions/reviewActions';

const Home = () => {
	const dispatch = useDispatch();

	const { cu } = useSelector((state) => state.authenticateUser);
	console.log(cu);

	useEffect(() => {
		if (cu._id) {
			dispatch(listUserReviews(cu._id));
		}
	}, [dispatch]);

	const reviewList = useSelector((state) => state.reviewList);
	//console.log(reviewList);
	const { reviews } = reviewList;

	//delete review
	// const deleteReview = (id) => {
	// 	console.log('deleting ', id);
	// 	setReviews(reviews.filter((review) => review.id !== id));
	// 	useEffect(() => {
	// 		dispatch(deleteUserReview());
	// 	}, [dispatch]);
	// };

	return (
		<>
			<Header title='Food Review' bgColor='indianred' txtColor='white' />
			<NavigationBar
				navs={[
					{ link: '/', text: 'My Reviews' },
					{ link: '/explore', text: 'Explore Reviews' },
				]}
			/>
			{!cu._id ? (
				<p className='text-center mt-5'>Sign in to see your reviews</p>
			) : reviews.length === 0 ? (
				<p className='text-center mt-5'>You have no reviews</p>
			) : (
				<Reviews reviews={reviews} onDelete={deleteUserReview()} />
			)}
		</>
	);
};

export default Home;
