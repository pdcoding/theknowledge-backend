const express = require('express');
const quizzes = express.Router();
const Quiz = require('../models/quiz');
const seedData = require('../models/seedModel');

// create
quizzes.post('/', (req, res) => {
  Quiz.create(req.body, (err, createdQuiz) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).send(createdQuiz);
  });
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
