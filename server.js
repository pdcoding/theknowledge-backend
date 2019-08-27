const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3003;
const MONGODB_URI =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/knowledge';
const MongoStore = require('connect-mongo')(session);

const whitelist = [
	'http://localhost:3000',
	'http://theknowledge.surge.sh',
	'https://theknowledge.surge.sh'
];
const corsOptions = {
	credentials: true,
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}
};

app.use(express.json());
app.use(cors(corsOptions));

// Mongoose connection
mongoose.connection.on('error', err => {
	console.log(err.message + ' is Mongod not running?');
});
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));
// Fix depreciation warnings
mongoose.set('useFindAndModify', false);

//DATABASE CONNECTION
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.once('open', () => {
	console.log('Connected to mongoose...');
});

//middleware
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: db })
		// cookie: { }
	})
);

// Controllers
const userController = require('./controllers/users.js');
app.use('/users', userController);
const quizController = require('./controllers/quiz');
app.use('/quizzes', quizController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
	res.send(`Attention humans, we are observing you on PORT ${PORT}`);
});

app.listen(PORT, () => {
	console.log(`Attention all humans, we are observing you on PORT ${PORT}`);
});
