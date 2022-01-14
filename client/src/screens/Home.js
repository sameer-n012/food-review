import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';
import Reviews from '../components/Reviews';
import { Container } from 'react-bootstrap';
import {
	listUserReviews,
	deleteUserReview,
	listExploreReviews,
} from '../actions/reviewActions';

const Home = () => {
	const dispatch = useDispatch();

	const { error: usererror, cu } = useSelector((state) => state.currentUser);
	const { navtab } = useSelector((state) => state.navbar);
	const { reviews, error: reviewerror } = useSelector(
		(state) => state.reviewList
	);
	const { searchobj } = useSelector((state) => state.searchObject);

	useEffect(() => {
		let searchString = 'none';
		if (searchobj) {
			//TODO convert search object to search string
		}

		if (navtab === 0 && cu && cu._id && cu.token) {
			dispatch(listUserReviews(cu._id, cu.token, searchString));
		} else if (navtab === 1) {
			dispatch(listExploreReviews(10, searchString));
		}
	}, [dispatch, cu, navtab]);

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
			<Header title='Food Review' loggedIn={!!cu} />
			<NavigationBar
				navs={[
					{ link: '/', text: 'My Reviews' },
					{ link: '/explore', text: 'Explore Reviews' },
				]}
			/>
			<Container className='p-2 mt-5 above-footer'>
				{usererror || reviewerror ? (
					<p className='text-center'>Sorry something went wrong</p>
				) : !cu && navtab === 0 ? (
					<p className='text-center'>Sign in to see your reviews</p>
				) : reviews.length === 0 ? (
					<p className='text-center'>You have no reviews</p>
				) : (
					<Reviews reviews={reviews} onDelete={deleteUserReview()} />
				)}
			</Container>
			<Footer />
		</>
	);
};

export default Home;
