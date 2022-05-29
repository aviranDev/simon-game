const User = require('../../models/User');
const path = require('path');
//hash passwords
const bcrypt = require('bcryptjs');
//hash email token
var CryptoJS = require('crypto-js');

//Validation
const {validateSignup} = require('../../lib/userValidation');

//email sender details
const {transporter} = require('../../utils/emailSender');

/**
 * Signup
 */
exports.signup = async (req, res) => {
	//1. VALIDATE USER FORM FIELDS
	const {error} = validateSignup(req.body);
	if (error) {
		//bad request
		return res.status(400).send(error.details[0].message);
	}

	//2. FIND USER EXISTNCE by email address and duplicated nickname
	const user = await User.findOne({
		email: req.body.email,
	});
	if (user) {
		//bad request
		return res.status(400).send('User already registered');
	}

	//3. FIND USER EXISTNCE duplicated nickname
	const duplicatedNickname = await User.findOne({
		nickname: req.body.nickname,
	});
	if (duplicatedNickname) {
		//bad request
		return res.status(400).send('The nickname has been taken already.');
	}

	//4. GENERATE SALT AND ASSIGN IT FOR HASH USER PASSWORD
	const salt = bcrypt.genSaltSync(Number(process.env.SALT));
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	//5. GENERATE USER
	const newUser = new User({
		...req.body,
		password: hashPassword,
		emailToken: CryptoJS.lib.WordArray.random(16),
	});
	await newUser.save();

	//6. send verification mail to user
	const mailOptions = {
		from: ' "Verify your email" <test@gmail.com>',
		to: newUser.email,
		subject: 'Simon Game - verify your email',
		html: `<h2>${newUser.nickname}! thanks for registering on our site</h2>
      <h4>Please verify your mail to continue...</h4>
      <a href="${process.env.HOST}/users/verify-email?token=${newUser.emailToken}">Verify Your Email</a>`,
	};

	//7. sending mail
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			console.log(info, 'Verification email is sent to your email account');
		}
	});

	//8. SERVER RESPONSE
	res.status(201).send('User created successfully');
};

//email verification
exports.emailVerification = async (req, res) => {
	try {
		const token = req.query.token;
		const user = await User.findOne({emailToken: token});
		if (user) {
			user.verified = true;
			await user.save();
			res.sendFile(path.join(`${__dirname}/emailVerified.html`));
		}
	} catch (error) {
		console.log(error);
		res.status(401).send('email is not verified');
	}
};

exports.userProfile = async (req, res) => {
	//VALIDATE USER EXISTANCE BY ID
	const userProfile = await User.findOne({_id: req.user._id}).select(
		'-password'
	);
	if (!userProfile) {
		return res.status(404).send('The user is not exist.');
	}
	res.send(userProfile);
};
