import jwt from 'jsonwebtoken';

//TODO make jwt expire in short time and create refresh token system

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export default generateToken;
