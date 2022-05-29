const Game = require('../../models/GameScore');
const User = require('../../models/User');

exports.updateScore = async (req, res) => {
	//2. VALIDATE USER'S PRODUCT
	const userScore = {_id: req.params.id, user_id: req.user._id};

	//2. FIND USER EXISTNCE AND UPDATED CHANGES
	const userDetails = await Game.findOneAndUpdate(userScore, req.body, {
		new: true,
	});
	await User.findOneAndUpdate({_id: req.user._id}, req.body, {
		new: true,
	});
	if (!userDetails) {
		return res.status(404).send("The user didn't save score yet");
	}

	if (req.body.score === 20) {
		return res.status(200).send('Congratulations! You are the winner!');
	}
	//3. RESPONSE
	res.send(userDetails);
};
