const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//User schema
const UserSchema = new mongoose.Schema({
	nickname: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 255,
	},
	email: {
		type: String,
		minlength: 6,
		maxlength: 100,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		minlength: 6,
		maxlength: 150,
		required: true,
	},
	score: {
		type: Number,
		default: 0,
	},

	verified: {
		type: Boolean,
		default: false,
		required: true,
	},
	emailToken: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

//Generate JWT
UserSchema.methods.generateAuthToken = function () {
	return jwt.sign({_id: this._id}, process.env.PRIVET_KEY);
};

//The User Model provider
const User = mongoose.model('User', UserSchema);

module.exports = User;
