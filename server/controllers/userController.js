import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/token.js';
import { checkCredentialFormatting } from '../utils/credentialFormatting.js';
import Review from '../models/reviewModel.js';
import bcrypt from 'bcrypt';

const authUser = asyncHandler(async (req, res) => {
	console.log(`POST AUTH_USER`);
	const { username, password } = req.body;
	const user = await User.findOne({ username: username });

	const passMatches = await user.matchPassword(password);
	if (user && passMatches) {
		res.json({
			_id: user._doc._id,
			username: user._doc.username,
			token: generateToken(user._id),
		});
		console.log(`${username} has successfully logged in`);
		res.status(201);
	} else {
		console.log(`${username} has failed to logged in`);
		res.status(401);
		throw new Error(`Invalid authentication`);
	}
});

const usernameExists = asyncHandler(async (req, res) => {
	console.log(`GET CHECK_USER_NAME_EXISTS`);
	const userExists = await User.exists({ username: req.params.username });
	res.json({ result: userExists });
	res.status(200);
});

const getUserById = asyncHandler(async (req, res) => {
	console.log(`GET_USER_BY_ID`);
	//uses the protect auth middleware to check jwt
	if (user._id === req.userid) {
		const user = await User.findById(req.user._id);

		if (user) {
			res.json({
				_id: user._id,
				username: user.username,
			});
			res.status(200);
		} else {
			res.status(404);
			throw new Error('User not found');
		}
	} else {
		res.status(401);
		throw new Error('Invalid authentication');
	}
});

/*
 * Checks if the username is already in database
 * if username is in database, throws error
 * if username or password do not match specifications, throws error
 * otherwise, creates new user and returns created
 */
const postUser = asyncHandler(async (req, res) => {
	console.log(`POST NEW_USER`);
	try {
		const { user } = req.body;
		const userExists = await User.exists({ username: user.username });
		if (
			userExists ||
			!checkCredentialFormatting(user.username, user.password)
		) {
			res.status(400);
			throw new Error('Invalid post user');
		} else {
			user.password = bcrypt.hashSync(user.password, 10);
			const created = await User.create(user);

			res.status(201);
			res.json({
				_id: created._id,
				username: created.username,
				token: generateToken(created._id),
			});
		}
	} catch (error) {
		if (error.message !== 'Invalid authentication') {
			console.log(error.message);
			res.status(400);
			error.message = 'Invalid post user';
		}
		throw new Error(error.message);
	}
});

/*
 * Checks if the id is already in database
 * if id is in database, throws error
 * if username or password do not match specifications, throws error
 * if request body user id is not equal to token validated id, throws error
 * otherwise, updates user and returns updated
 */
const putUser = asyncHandler(async (req, res) => {
	console.log(`PUT EXISTING_USER`);
	//uses the protect auth middleware to check jwt
	try {
		const userid = req.params.userid;
		const { oldpassword, user } = req.body;
		const dbUser = await User.findById(userid);
		const userExists = await User.exists({ username: user.username });
		const passMatches = await dbUser.matchPassword(oldpassword);
		if (
			!dbUser ||
			(userExists && user.username !== dbUser.username) ||
			!checkCredentialFormatting(user.username, user.password)
		) {
			res.status(400);
			throw new Error('Invalid put user');
		} else if (
			user._id !== req.user._id.toString() ||
			userid !== user._id ||
			!passMatches
		) {
			res.status(401);
			throw new Error('Invalid authentication');
		} else {
			user.password = bcrypt.hashSync(user.password, 10);
			const updated = await User.findByIdAndUpdate(
				user._id,
				{
					username: user.username,
					password: user.password,
				},
				{ new: true }
			);
			res.status(201);
			res.json({
				_id: updated._id,
				username: updated.username,
			});
		}
	} catch (error) {
		if (error.message !== 'Invalid authentication') {
			console.log(error.message);
			res.status(400);
			error.message = 'Invalid put user';
		}
		throw new Error(error.message);
	}
});

/*
 * Checks if the query user id is equal to the token validated id
 * if ids are not equal, throws an error
 * if ids are equal, deletes user and returns deleted
 *
 * abc
 */
const deleteUser = asyncHandler(async (req, res) => {
	console.log(`DELETE EXISTING_USER`);
	//uses the protect auth middleware to check jwt
	try {
		if (req.params.userid !== req.user._id.toString()) {
			res.status(401);
			throw new Error('Invalid authentication');
		} else {
			const deleted = await User.findByIdAndDelete(req.params.userid);
			const deletedReviews = await Review.deleteMany({
				author_id: req.params.userid,
			});
			res.status(200);
			res.json({
				_id: deleted._id,
				username: deleted.username,
			});
		}
	} catch (error) {
		if (error.message !== 'Invalid authentication') {
			res.status(400);
			error.message = 'Invalid delete user';
		}
		throw new Error(error.message);
	}
});

export { authUser, usernameExists, getUserById, postUser, putUser, deleteUser };
