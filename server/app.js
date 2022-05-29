//setup
const express = require('express');
const app = express();

//parser JSON bodies
app.use(express.json());

//import MongoDb
require('./db/db');

//security applied to an API
const cors = require('cors');
app.use(cors());

//morgan logger
const morgan = require('morgan');
app.use(morgan('dev'));

//user routes
const userRouter = require('./routes/userRoutes');
app.use('/api/users', userRouter);

//game routes
const gameRoutes = require('./routes/gameRoutes');
app.use('/api/game', gameRoutes);

//binds and listen the connections on the specidied host and port
const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on port${port}`));
