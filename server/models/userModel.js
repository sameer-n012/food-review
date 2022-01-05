import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (passEntered) {
	return await bcrypt.compare(passEntered, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
