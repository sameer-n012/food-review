import express from 'express';
import { getReviews, createReview } from '../controllers/reviewsController.js';

const router = express.Router();

//http://localhost:5000/reviews
router.get('/', getReviews);
router.post('/', createReview);

export default router;
