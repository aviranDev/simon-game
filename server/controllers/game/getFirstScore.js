const Game = require('../../models/GameScore');

exports.getFirstScore = async (req, res) => {
	const firsUserScore = await Game.findOne({
		user_id: req.user._id,
	});

	if (!firsUserScore) {
		return res.status(401).send("There is no user's score yet");
	}

	res.send(firsUserScore);
};
