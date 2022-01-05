import express from 'express';
import {
	getUserReviews,
	getReviewById,
	postUserReview,
	putUserReview,
	deleteUserReview,
	getExploreReviews,
} from '../controllers/reviewController.js';

const router = express.Router();

//router.route('/user/:userid/cu=:cuserid').get(getUserReviews);
//router.route('/:reviewid/cu=:cuserid').get(getReviewById);
router.route('/user/:userid').get(getUserReviews);
router.route('/:reviewid').get(getReviewById);
router.route('/explore/:limit').get(getExploreReviews);
router.post('/post', postUserReview);
router.put('/update/:reviewid', putUserReview);
router.delete('/delete/:reviewid', deleteUserReview);

export default router;
