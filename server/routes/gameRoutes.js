const router = require('express').Router();
//JWT token middleware
const authToken = require('../middlewares/authJWT');

const {saveUserScore} = require('../controllers/game/saveScore');
const {updateScore} = require('../controllers/game/updateScore');
const {displayTopTenScores} = require('../controllers/game/displayTopTen');
const {getFirstScore} = require('../controllers/game/getFirstScore');

//save user score
router.post('/save-user-score', authToken, saveUserScore);

//update user score
router.put('/update-user-score/:id', authToken, updateScore);

//Display top 10 user's score
router.get('/display-all-users-scores', authToken, displayTopTenScores);

router.get('/display-first-user-score', authToken, getFirstScore);

module.exports = router;
