const router = require('express').Router();
const authToken = require('../middlewares/authJWT');
const {
	signup,
	emailVerification,
	userProfile,
} = require('../controllers/users/signup');
const {signin} = require('../controllers/users/signin');

//signup
router.post('/signup', signup);

//verify email
router.get('/verify-email', emailVerification);

//signin
router.post('/signin', signin);

router.get('/user-profile', authToken, userProfile);

module.exports = router;
