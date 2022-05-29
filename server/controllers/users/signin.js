const User = require('../../models/User');
//Validation
const {validateSignin} = require('../../lib/userValidation');
const bcrypt = require('bcryptjs');

/**
 * Signin
 */
exports.signin = async (req, res) => {
	//1. VALIDATE USER FORM FIELDS
	const {error} = validateSignin(req.body);
	if (error) {
		//Bad request
		return res.status(400).send(error.details[0].message);
	}

	//2. FIND USER EXISTNCE
	const user = await User.findOne({email: req.body.email});
	if (!user) {
		//Unauthorized
		return res.status(401).send('Invalid Email or Password');
	}

	//3. VERIFY EMAIL
	const emailVerified = await User.findOne({
		email: req.body.email,
		verified: true,
	});
	if (!emailVerified) {
		//Unauthorized
		return res
			.status(401)
			.send('Verification email is sent to your email account');
	}

	//4. VALIDATE USER PASSWORD
	const validPassword = await bcrypt.compareSync(
		req.body.password,
		user.password
	);
	if (!validPassword) {
		//Unauthorized
		return res.status(401).send('Invalid email or password');
	}

	//5. GENERATE JSON WEB TOKEN
	const token = user.generateAuthToken();

	//6. SERVER RESPONSE
	res.status(200).send({token});
};
