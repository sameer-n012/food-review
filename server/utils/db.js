import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(
			process.env.MONGODB_CONNECTION_URL,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useCreateIndex: true,
			}
		);
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
};

export default connectDB;
