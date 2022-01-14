import express from 'express';
import { getImage, postImage } from '../controllers/imageController.js';
import protect from '../utils/authenticationMiddleware.js';

const router = express.Router();

router.route('/:filename').get(getImage);
router.route('/save').post(protect, postImage);

export default router;
