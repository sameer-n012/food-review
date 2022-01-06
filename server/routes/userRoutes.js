import express from 'express';
import protect from '../utils/authenticationMiddleware.js';
import {
	authUser,
	usernameExists,
	getUserNameById,
	getUserById,
} from '../controllers/userController.js';

//TODO add delete, put, and post user routes

const router = express.Router();

router.route('/name/:userid').get(getUserNameById);
router.route('/:userid').get(protect, getUserById);
router.route('/exists/:username').get(usernameExists);
router.post('/auth', authUser);

export default router;
