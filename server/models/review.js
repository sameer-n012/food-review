import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
	id: Number,
	name: String,
	restaurant: String,
	rating: Number,
	lastDate: {
		type: Date,
		default: new Date(),
	},
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
