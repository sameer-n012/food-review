import e from 'express';
import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';

/*
 * Checks if the query user id == token validated id
 * if ids are equal, returns all reviews from the user id specified in query
 * if ids are not equal, returns only non-private reviews from the user id specified in query
 */
const getUserReviews = asyncHandler(async (req, res) => {
	console.log(`GET USER_REVIEWS`);
	if (req.user && req.user._id.toString() === req.params.userid) {
		const reviews = await Review.find({ author_id: req.params.userid });
		if (reviews) {
			res.status(200);
			res.json(reviews);
		} else {
			res.status(404);
			throw new Error('Review not found');
		}
	} else {
		const reviews = await Review.find({
			private: false,
			author_id: req.params.userid,
		});
		if (reviews) {
			res.status(200);
			res.json(reviews);
		} else {
			res.status(404);
			throw new Error('Review not found');
		}
	}
});

/*
 * Checks if the query review's author id == token validated id or the review is not private
 * if ids are equal, returns the review
 * if review is not private, returns the review
 * if ids are not equal and review is private, throws error
 */
const getReviewById = asyncHandler(async (req, res) => {
	console.log(`GET REVIEW_BY_ID`);

	const review = await Review.findById(req.params.reviewid);

	if (review) {
		if (
			req.user._id.toString() === review.author_id.toString() ||
			!review.private
		) {
			res.status(200);
			res.json(review);
		} else {
			res.status(401);
			throw new Error('Invalid authentication');
		}
	} else {
		res.status(404);
		throw new Error('Review not found');
	}
});

/*
 * Same as above without jwt authentication middleware
 */
const getPublicReviewById = asyncHandler(async (req, res) => {
	console.log(`GET REVIEW_BY_ID`);

	const review = await Review.findById(req.params.reviewid);

	if (review) {
		if (!review.private) {
			res.status(200);
			res.json(review);
		} else {
			res.status(401);
			throw new Error('Invalid authentication');
		}
	} else {
		res.status(404);
		throw new Error('Review not found');
	}
});

const getExploreReviews = asyncHandler(async (req, res) => {
	console.log(`GET EXPLORE_REVIEWS`);
	const limit = req.params.limit;
	const reviews = await Review.find({ private: false }).limit(limit);

	if (reviews) {
		res.status(200);
		res.json(reviews);
	} else {
		res.status(404);
		throw new Error('Reviews not found');
	}
});

/*
 * Checks if the request body review's author id == token validated id
 * if ids are not equal, throws error
 *
 * Checks if the request body review's username == username associated with request body review's author id
 * if usernames are not equal, throws error
 *
 * if ids and usernames are equal, posts review and returns posted
 */
const postUserReview = asyncHandler(async (req, res) => {
	console.log('POST USER_REVIEW');

	try {
		const { review } = req.body;
		const user = await User.findById(review.author_id).select('username');
		if (req.user._id.toString() !== review.author_id) {
			res.status(401);
			throw new Error('Invalid authentication');
		} else if (user.username !== review.author_name) {
			res.status(400);
			throw new Error('Invalid post review');
		} else {
			const created = await Review.create(review);
			res.status(201);
			res.json(created);
		}
	} catch (error) {
		if (error.message !== 'Invalid authentication') {
			res.status(400);
			error.message = 'Invalid post review';
		}
		throw new Error(error.message);
	}
});

/*
 * Checks if the database review's author id == token validated id
 * if ids are equal, updates review and returns updated
 * if ids are not equal, throws error
 */
const putUserReview = asyncHandler(async (req, res) => {
	console.log('PUT USER_REVIEW');

	try {
		const review_id = req.params.reviewid;
		const { review } = req.body;
		const dbReview = await Review.findById(review_id);
		if (dbReview.author_id.toString() !== req.user._id.toString()) {
			res.status(401);
			throw new Error('Invalid authentication');
		} else {
			//console.log(review);
			//console.log(review_id);
			const updated = await Review.findByIdAndUpdate(review_id, review, {
				new: true,
			});
			res.status(201);
			res.json(updated);
		}
	} catch (error) {
		if (error.message !== 'Invalid authentication') {
			res.status(400);
			error.message = 'Invalid put review';
		}
		throw new Error(error.message);
	}
});

/*
 * Checks if the query's author id == token validated id
 * if ids are equal deletes and returns deleted
 * if ids are not equal, throws error
 */
const deleteUserReview = asyncHandler(async (req, res) => {
	console.log('DELETE USER_REVIEW');
	try {
		const review_id = req.params.reviewid;
		//console.log(review_id);
		const dbReview = await Review.findById(review_id);
		if (dbReview.author_id.toString() !== req.user._id.toString()) {
			res.status(401);
			throw new Error('Invalid authentication');
		} else {
			const deleted = await Review.findByIdAndDelete(review_id);
			res.status(200);
			res.json(deleted);
		}
	} catch (error) {
		if (error.message !== 'Invalid authentication') {
			res.status(400);
			error.message = 'Invalid review delete';
		}
		throw new Error(error.message);
	}
});

export {
	postUserReview,
	putUserReview,
	deleteUserReview,
	getUserReviews,
	getReviewById,
	getPublicReviewById,
	getExploreReviews,
};
