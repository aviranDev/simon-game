const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	score: {
		type: Number,
		default: 0,
		ref: 'User',
	},
});

const GameScore = mongoose.model('Game', gameSchema);

module.exports = GameScore;
