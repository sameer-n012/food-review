import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/*
 * Authorization Middleware:
 * Checks if the bearer token provided in the request header is valid
 * If the token is valid, adds the corresponding user to the request
 */
const protect = asyncHandler(async (req, res, next) => {
	let token = null;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById(decoded.id).select('_id');
			if (user) {
				req.user = user;
			} else {
				throw new Error();
			}
			next();
		} catch (error) {
			console.log(`Error: ${error.message}`);
			res.status(401);
			throw new Error('Invalid authentication');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Invalid authentication');
	}
});

export default protect;
