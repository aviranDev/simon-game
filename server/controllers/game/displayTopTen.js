const Game = require('../../models/GameScore');
const User = require('../../models/User');

exports.displayTopTenScores = async (req, res) => {
	const allUScores = await User.find({score: {$gt: 0}})
		.sort({score: -1})
		.limit(10);

	res.send(allUScores);
};
