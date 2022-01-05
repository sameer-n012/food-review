import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
	let token = null;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (error) {
			console.log(`Error: ${error.message}`);
			res.status(401);
			throw new Error('Invalid token authorization');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Invalid token authorization');
	}
});

export default protect;
