import React from 'react';
import NavigationBar from './components/NavigationBar';
import Header from './components/Header';
import Reviews from './components/Reviews';
import { useState } from 'react';

const App = () => {
	const [reviews, setReviews] = useState([
		{
			id: 1,
			name: 'Burger',
			rest: 'Burger King',
			rating: 4.5,
			lastDate: '2021-10-10',
            private: true,
		},
		{
			id: 2,
			name: 'Fries',
			rest: "McDonald's",
			rating: 4,
			lastDate: '2021-12-04',
            private: false,
		},
		{
			id: 3,
			name: 'McFlurry',
			rest: "McDonald's",
			rating: 5,
			lastDate: '2021-12-04',
            private: true,
		},
		{
			id: 4,
			name: 'Burger',
			rest: "Wendy's",
			rating: 2,
			lastDate: '2021-05-19',
            private: true,
		},
		{
			id: 5,
			name: 'Fries',
			rest: "Wendy's",
			rating: 3,
			lastDate: '2021-05-19',
            private: false,
		},
	]);

	//delete review
	const deleteReview = (id) => {
		console.log('deleting ', id);
		setReviews(reviews.filter((review) => review.id !== id));
	};

	return (
		<div>
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
		</div>
	);
};

export default App;
