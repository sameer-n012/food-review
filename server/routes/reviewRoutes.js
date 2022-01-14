import express from 'express';
import protect from '../utils/authenticationMiddleware.js';
import {
	getUserReviews,
	getReviewById,
	getPublicReviewById,
	postUserReview,
	putUserReview,
	deleteUserReview,
	getExploreReviews,
} from '../controllers/reviewController.js';

const router = express.Router();

router.route('/user/:userid').get(protect, getUserReviews);
router.route('/public/:reviewid').get(getPublicReviewById);
router.route('/:reviewid').get(protect, getReviewById);
router.route('/explore/:limit').get(getExploreReviews);
router.route('/post').post(protect, postUserReview);
router.route('/update/:reviewid').put(protect, putUserReview);
router.route('/delete/:reviewid').delete(protect, deleteUserReview);

export default router;
