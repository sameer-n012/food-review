import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
	{
		author: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		restaurant: {
			type: String,
			requried: true,
		},
		lastDate: {
			type: Date,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		private: {
			type: Boolean,
			required: true,
		},
		notes: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
