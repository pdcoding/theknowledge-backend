const express = require('express');
const quizzes = express.Router();
const Quiz = require('../models/quiz');
const seedData = require('../models/seedModel');

//index (quizzes list)
quizzes.get('/', (req, res) => {
	Quiz.find({}, (err, allQuizzes) => {
		let quizArray = [];
		for (i=0; i<allQuizzes.length; i++) {
			let quizObject = {
				name: allQuizzes[i].name,
				caption: allQuizzes[i].caption,
				image: allQuizzes[i].image,
				createdBy: allQuizzes[i].createdBy,
				createdAt: allQuizzes[i].createdAt
			};
			quizArray.push(quizObject)
		}
	  if (err) {
		res.status(400).json({ error: err.message });
	  }
		res.status(200).send(quizArray);
	});
  });

// create
quizzes.post('/', (req, res) => {
  Quiz.create(req.body, (err, createdQuiz) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).send(createdQuiz);
  });
});

quizzes.get('/', (req, res) => {
  //auth logic here
  // do an axios call to this route
  console.log(req.headers.cookie);
  console.log(req.session);
  console.log('test');

  res.send('test');
});

// delete
quizzes.delete('/:id', (req, res) => {
  Quiz.findByIdAndRemove(req.params.id, (err, deletedQuiz) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedQuiz);
  });
});

//MAKE a route that pulls all quiz information from a specific quiz
//create a get route in the quiz controller that pulls all data from the
//json object of quiz information
//res.send to call all the info

//Quiz info pull
quizzes.get('/:id', (req, res) => {
  Quiz.findById(req.params.id, (err, quizInfo) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json(quizInfo);
    }
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
