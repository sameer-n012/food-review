import { reviews, users } from './seederData.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import Review from '../models/reviewModel.js';
import connectDB from './db.js';

dotenv.config();
connectDB();

//TODO rerun seeder when changing review model to update database
//TODO fix postman api calls when changing review model

const importData = async () => {
	try {
		await Review.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminId = createdUsers[0]._id;
		const sampleReviews = reviews.map((review, index) => {
			return {
				author_id: createdUsers[index % createdUsers.length],
				...review,
			};
		});
		await Review.insertMany(sampleReviews);

		console.log('Data Successfully Imported');
		process.exit();
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Review.deleteMany();
		await User.deleteMany();

		console.log('Data Successfully Deleted');
		process.exit();
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
