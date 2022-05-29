const Joi = require('joi');

/**
 * VALIDATE USER REGISTRATION FORM FIELDS
 */
exports.validateSignup = (data) => {
	const schema = Joi.object({
		nickname: Joi.string().min(2).max(255).required().label('Nickname'),
		email: Joi.string().required().email({tlds: false}).label('Email'),
		password: Joi.string().min(6).max(150).required().label('Password'),
	});
	return schema.validate(data);
};

/**
 * VALIDATE USER LOGIN FORM FIELDS
 */
exports.validateSignin = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email({tlds: false}).label('Email'),
		password: Joi.string().required().label('Password'),
	});
	return schema.validate(data);
};
