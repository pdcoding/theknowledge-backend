const express = require('express');
const quizzes = express.Router();
const Quiz = require('../models/quiz');
<<<<<<< HEAD
const isUser = require('../controllers/auth');

// create
quizzes.post('/', (req, res) => {
	//1 get cookie session ID
	//2 check if session ID is in sessions database
	//3 if true, create quiz
	//4 if false, send error message


	// User.findOne({ email: req.body.email }, (err, foundUser) => {
	
	
	// if (req.headers.cookie) {
	// 	const cookies = parseCookies(req.headers.cookie);
	// 	console.log(cookies.sessionid);
	// } else {
	// 	console.log('no session yet');
	// }	


	// Quiz.create(req.body, (err, createdQuiz) => {
	// 	if (err) {
	// 		res.status(400).json({ error: err.message });
	// 	}
	// 	res.status(200).send(createdQuiz);
	// });
=======
const seedData = require('../models/seedModel');

// create
quizzes.post('/', (req, res) => {
  Quiz.create(req.body, (err, createdQuiz) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).send(createdQuiz);
  });
>>>>>>> 4767ce25e461de8efaa0ba5487ce14133c106132
});

quizzes.get('/', (req, res) => {
	//auth logic here
	// do an axios call to this route
	console.log(req.headers.cookie)
    console.log(req.session)
	console.log('test')

	res.send('test')
})

// delete
quizzes.delete('/:id', (req, res) => {
  Quiz.findByIdAndRemove(req.params.id, (err, deletedQuiz) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedQuiz);
  });
});

//seed
// quizzes.get('/seed', (req, res) => {
//   Quiz.create(seedData, (err, createdQuizzes) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else console.log('Successfully seeded data');
//     res.send('Data successfully seeded');
//   });
// });

module.exports = quizzes;
