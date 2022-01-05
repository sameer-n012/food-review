import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import Reviews from '../components/Reviews';
import { listUserReviews, deleteUserReview } from '../actions/reviewActions';

const Home = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.authenticateUser);
	//console.log(user);
	const { cuid } = user;

	useEffect(() => {
		if (cuid) {
			dispatch(listUserReviews(cuid));
		}
	}, [dispatch]);

	const reviewList = useSelector((state) => state.reviewList);
	//console.log(reviewList);
	const { loading, error, reviews } = reviewList;

	// const [reviews, setReviews] = useState([
	// 	{
	// 		id: 1,
	// 		name: 'Burger',
	// 		rest: 'Burger King',
	// 		rating: 4.5,
	// 		lastDate: '2021-10-10',
	// 		author: 'user0',
	// 		private: true,
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Fries',
	// 		rest: "McDonald's",
	// 		rating: 4,
	// 		lastDate: '2021-12-04',
	// 		author: 'user1',
	// 		private: false,
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'McFlurry',
	// 		rest: "McDonald's",
	// 		rating: 5,
	// 		lastDate: '2021-12-04',
	// 		author: 'userwithareallylongname',
	// 		private: true,
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'Burger',
	// 		rest: "Wendy's",
	// 		rating: 2,
	// 		lastDate: '2021-05-19',
	// 		author: 'user1',
	// 		private: true,
	// 	},
	// 	{
	// 		id: 5,
	// 		name: 'Fries',
	// 		rest: "Wendy's",
	// 		rating: 3,
	// 		lastDate: '2021-05-19',
	// 		author: 'user3',
	// 		private: false,
	// 	},
	// ]);

	//delete review
	const deleteReview = (id) => {
		console.log('deleting ', id);
		//setReviews(reviews.filter((review) => review.id !== id));
		// useEffect(() => {
		//     dispatch(deleteUserReview());
		// }, [dispatch])
	};

	return (
		<>
			<Header title='Food Review' bgColor='indianred' txtColor='white' />
			<NavigationBar
				navs={[
					{ link: '/my-reviews', text: 'My Reviews' },
					{ link: '/explore-reviews', text: 'Explore Reviews' },
				]}
			/>
			{!cuid ? (
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
