import React, { useState } from 'react';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import Reviews from '../components/Reviews';

const Home = () => {
	const [reviews, setReviews] = useState([
		{
			id: 1,
			name: 'Burger',
			rest: 'Burger King',
			rating: 4.5,
			lastDate: '2021-10-10',
			author: 'user0',
			private: true,
		},
		{
			id: 2,
			name: 'Fries',
			rest: "McDonald's",
			rating: 4,
			lastDate: '2021-12-04',
			author: 'user1',
			private: false,
		},
		{
			id: 3,
			name: 'McFlurry',
			rest: "McDonald's",
			rating: 5,
			lastDate: '2021-12-04',
			author: 'userwithareallylongname',
			private: true,
		},
		{
			id: 4,
			name: 'Burger',
			rest: "Wendy's",
			rating: 2,
			lastDate: '2021-05-19',
			author: 'user1',
			private: true,
		},
		{
			id: 5,
			name: 'Fries',
			rest: "Wendy's",
			rating: 3,
			lastDate: '2021-05-19',
			author: 'user3',
			private: false,
		},
	]);

	//delete review
	const deleteReview = (id) => {
		console.log('deleting ', id);
		setReviews(reviews.filter((review) => review.id !== id));
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
			{/* {reviews.length === 0 ? (
				'You have no reviews'
			) : (
				<Reviews reviews={reviews} onDelete={deleteReview} />
			)} */}
			<Reviews reviews={reviews} onDelete={deleteReview} />
		</>
	);
};

export default Home;
