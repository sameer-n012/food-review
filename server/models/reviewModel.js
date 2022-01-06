import mongoose from 'mongoose';
//TODO add the username in review model
//so no unneeded api calls
//will need to reseed database

const reviewSchema = mongoose.Schema(
	{
		author_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
		restaurant: {
			type: String,
			requried: true,
		},
		lastDate: {
			type: String,
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
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
