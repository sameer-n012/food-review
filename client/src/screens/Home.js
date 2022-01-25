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
import { createSearchString } from '../resources/searchReviews';

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
			searchString = createSearchString(searchobj);
			console.log('new search string ', searchString);
		}

		if (navtab === 0 && cu && cu._id && cu.token) {
			dispatch(listUserReviews(cu._id, cu.token, searchString));
		} else if (navtab === 1) {
			dispatch(listExploreReviews(10, searchString));
		}
	}, [dispatch, cu, navtab]);

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
				) : (
					<Reviews reviews={reviews} />
				)}
			</Container>
			<Footer />
		</>
	);
};

export default Home;
