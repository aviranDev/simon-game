const Game = require('../../models/GameScore');
const User = require('../../models/User');

//Display user profile details
exports.saveUserScore = async (req, res) => {
	const scoredAlready = await Game.findOne({
		user_id: req.user._id,
	});
	if (scoredAlready) {
		return res.status(400).send('Score has been created already');
	}
	//1. GENERATE USER SCORE
	let payload = {
		score: req.body.score,
		user_id: req.user._id,
	};

	if (payload.score > 20) {
		return res.status(400).send('The score is above the limit');
	}

	const userScoreGame = await Game.create({
		...payload,
	});
	await userScoreGame.save();
	const scoreUserUpdated = {_id: req.user._id};
	await User.findOneAndUpdate(scoreUserUpdated, req.body, {new: true});

	if (payload.score === 20) {
		return res.status(200).send('Congratulations! You are the winner!');
	}
	//2. RESPONSE
	res.send(userScoreGame);
};
