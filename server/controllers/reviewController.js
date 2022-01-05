import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';

const getUserReviews = asyncHandler(async (req, res) => {
	console.log(`GET USER_REVIEWS`);
	//let reviews = [];
	// if (req.params.userid === req.params.cuserid) {
	const reviews = await Review.find({ author_id: req.params.userid });
	// } else {
	// 	reviews = await Review.find({
	// 		author_id: req.params.userid,
	// 		private: false,
	// 	});
	// }
	if (reviews) {
		res.json(reviews);
		res.status(200);
	} else {
		res.status(404);
		throw new Error('Review not found');
	}
});

const getReviewById = asyncHandler(async (req, res) => {
	console.log(`GET REVIEW_BY_ID`);
	const review = await Review.findById(req.params.reviewid);

	if (review) {
		// if (
		// 	review.private &&
		// 	review.author_id.toString() !== req.params.userid
		// ) {
		// 	res.status(403);
		// 	throw new Error('Access Forbidden');
		// } else {
		res.json(review);
		res.status(200);
		//}
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
		// if (
		// 	review.private &&
		// 	review.author_id.toString() !== req.params.userid
		// ) {
		// 	res.status(403);
		// 	throw new Error('Access Forbidden');
		// } else {
		res.json(reviews);
		res.status(200);
		//}
	} else {
		res.status(404);
		throw new Error('Reviews not found');
	}
});

const postUserReview = asyncHandler(async (req, res) => {
	console.log('POST USER_REVIEW');
	try {
		const { review } = req.body;
		const created = await Review.create(review);
		res.json(created);
		res.status(201);
	} catch (error) {
		res.status(400);
		throw new Error('Invalid review post');
	}
});

const putUserReview = asyncHandler(async (req, res) => {
	console.log('PUT USER_REVIEW');
	try {
		const review_id = req.params.reviewid;
		const { review } = req.body;
		const updated = await Review.findByIdAndUpdate(review_id, review, {
			new: true,
		});
		res.json(updated);
		res.status(201);
	} catch (error) {
		res.status(400);
		throw new Error('Invalid review put');
	}
});

const deleteUserReview = asyncHandler(async (req, res) => {
	console.log('DELETE USER_REVIEW');
	try {
		const review_id = req.params.reviewid;
		const deleted = await Review.deleteMany({ _id: review_id });
		res.json(deleted);
		res.status(200);
	} catch (error) {
		res.status(400);
		throw new Error('Invalid review delete');
	}
});

export {
	postUserReview,
	putUserReview,
	deleteUserReview,
	getUserReviews,
	getReviewById,
	getExploreReviews,
};
