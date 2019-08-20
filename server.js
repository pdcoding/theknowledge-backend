const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const PORT = 3003;
const MONGODB_URI = 'mongodb://localhost:27017/knowledge';

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

//middleware
app.use(
  session({ secret: 'pineapple', resave: false, saveUninitialized: false })
);
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
mongoose.connection.once('open', () => {
  console.log('Connected to mongoose...');
});

//User Controllers & routes
const userController = require('./controllers/users.js');
app.use('/users', userController);

//Sessions controller
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
  res.send(`Attention humans, we are observing you on PORT ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Attention all humans, we are observing you on PORT ${PORT}`);
});
