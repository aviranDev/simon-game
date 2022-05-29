require('dotenv').config();
const mongoose = require('mongoose');

mongoose
	.connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected To mongo'))
	.catch((err) => console.log('There is some error occured', err));
