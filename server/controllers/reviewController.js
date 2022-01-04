import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';

const getUserReviews = asyncHandler(async (req, res) => {
	const reviews = await Review.find({});
	res.json(reviews);
});

const getReviewById = asyncHandler(async (req, res) => {
	const review = await Review.findById(req.params.id);
	if (review) {
		res.json(review);
	} else {
		res.status(404);
		throw new Error('Review not found');
	}
});
