import express from 'express';
import { getReviews, getReviewById } from '../controllers/reviewController.js';

const router = express.Router();

router.route('/').get(getReviews);
router.route('/:id').get(getReviewById);

export default router;
