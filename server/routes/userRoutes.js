import express from 'express';
import protect from '../utils/authenticationMiddleware.js';
import {
	authUser,
	usernameExists,
	getUserNameById,
	getUserById,
	postUser,
	putUser,
	deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/name/:userid').get(getUserNameById);
router.route('/:userid').get(protect, getUserById);
router.route('/exists/:username').get(usernameExists);
router.route('/auth').post(authUser);
router.route('/post').post(postUser);
router.route('/update').put(protect, putUser);
router.route('/delete/:userid').delete(protect, deleteUser);

export default router;
