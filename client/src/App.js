import React from 'react';
import Header from './components/Header';
import Reviews from './components/Reviews';
import { useState } from 'react';
import { FaTasks } from 'react-icons/fa';

const App = () => {
	const [reviews, setReviews] = useState([
		{
			id: 1,
			name: 'Burger',
			rest: 'Burger King',
			rating: 4.5,
			lastDate: '10/10/2021',
		},
		{
			id: 2,
			name: 'Fries',
			rest: "McDonald's",
			rating: 4,
			lastDate: '12/4/2021',
		},
		{
			id: 3,
			name: 'McFlurry',
			rest: "McDonald's",
			rating: 5,
			lastDate: '12/4/2021',
		},
	]);

	//delete review
	const deleteReview = (id) => {
		//console.log('deleting', id)
		setReviews(reviews.filter((review) => review.id !== id));
	};

	return (
		<div className='container'>
			<Header />
			{reviews.length > 0 ? (
				<Reviews reviews={reviews} onDelete={deleteReview} />
			) : (
				'You have no reviews'
			)}
		</div>
	);
};

export default App;
