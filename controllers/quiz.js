const express = require('express');
const quizzes = express.Router();
const Quiz = require('../models/quiz');
const seedData = require('../models/seedModel');

// index (quizzes list)
quizzes.get('/', (req, res) => {
	Quiz.find({}, (err, allQuizzes) => {
		let quizArray = [];
		for (i = 0; i < allQuizzes.length; i++) {
			let quizObject = {
				name: allQuizzes[i].name,
				image: allQuizzes[i].image,
				createdBy: allQuizzes[i].createdBy,
				createdAt: allQuizzes[i].created_at,
				id: allQuizzes[i]._id,
				count: allQuizzes[i].count
			};
			quizArray.push(quizObject);
		}
		if (err) {
			res.status(400).json({ error: err.message });
		}
		res.status(200).send(quizArray);
	});
});

// create quiz
quizzes.post('/', (req, res) => {
	// console.log('req.session below');
	// console.log(req.session); // comes back with: cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }

	// Check if current session exists before posting
	// if (req.session.currentUser) {
	// const cookies = parseCookies(req.headers.cookie);
	// const userObjectID = cookies.userid;
	// console.log(req.headers.userid);

	if (req.headers.userid) {
		const userObjectID = req.headers.userid;

		const updatedQuiz = req.body;
		Object.assign(updatedQuiz, { createdBy: userObjectID });

		Quiz.create(updatedQuiz, (err, createdQuiz) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send(createdQuiz);
			}
		});
	} else {
		res.status(400).send('Invalid session, try logging out and in again.');
	}
});

// update quiz count
quizzes.put('/:id', (req, res) => {
	Quiz.findByIdAndUpdate(
		req.params.id,
		{ $inc: { count: 1 } },
		(err, updatedCount) => {
			if (err) {
				res.status(400).json({ error: err.mesage });
			} else {
				res.status(200).send(updatedCount);
			}
		}
	);
});

// delete quiz
quizzes.delete('/:id', (req, res) => {
	// Check if current session exists before posting
	// if (req.session.currentUser) {
	if (req.headers.userid) {
		Quiz.findByIdAndRemove(req.params.id, (err, deletedQuiz) => {
			if (err) {
				res.status(400).json({ error: err.message });
			}
			res.status(200).json(deletedQuiz);
		});
	} else {
		res.status(400).send('Invalid session, try logging out and in again.');
	}
});

// seed quizzes
quizzes.get('/seed', (req, res) => {
	Quiz.create(seedData, (err, createdQuizzes) => {
		if (err) {
			res.status(400).json({ error: err.message });
		} else {
			res.send('Data successfully seeded');
		}
	});
});

// get individual quiz
quizzes.get('/:id', (req, res) => {
	Quiz.findById(req.params.id, (err, quizInfo) => {
		if (err) {
			res.status(400).json({ error: err.message });
		} else {
			res.json(quizInfo);
		}
	});
});

// Adapted from https://stackoverflow.com/questions/3393854/
// const parseCookies = cookies => {
// 	let cookiesObj = {};

// 	cookies.split(';').forEach(cookie => {
// 		let parts = cookie.split('=');
// 		cookiesObj[parts.shift().trim()] = decodeURI(parts.join('='));
// 	});

// 	return cookiesObj;
// };

module.exports = quizzes;
