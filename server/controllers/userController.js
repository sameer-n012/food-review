import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/token.js';

//TODO implement postUser (create new user)
//TODO implement putUser (update user details)
//TODO implement deleteUser (delete userDetails)
//QUESTION should user reviews be deleted when user is deleted
// ^ probably yes

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
		throw new Error(`Invalid Authentication`);
	}
});

const usernameExists = asyncHandler(async (req, res) => {
	console.log(`GET CHECK_USER_NAME_EXISTS`);
	const userExists = await User.exists({ username: req.params.username });
	res.json({ result: userExists });
	res.status(200);
});

//TODO delete getUserNameById
//will contain username in review model
const getUserNameById = asyncHandler(async (req, res) => {
	console.log(`GET USER_NAME_BY_ID`);
	const user = await User.findById(req.params.userid).select('username');

	if (user) {
		res.json(user);
		res.status(200);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

const getUserById = asyncHandler(async (req, res) => {
	console.log(`GET_USER_BY_ID`);
	const user = await User.findById(req.params.userid);

	if (user) {
		res.json(user);
		res.status(200);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export { authUser, usernameExists, getUserNameById, getUserById };
