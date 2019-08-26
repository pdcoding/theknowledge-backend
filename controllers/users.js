const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

// create
users.post('/', (req, res) => {
	// Check if user already exists
	User.find({ email: req.body.email }, (error, result) => {
		// console.log(error);
		// console.log(result);

		if (result.length > 0) {
			res.send('user email already exists');
		} else {
			req.body.password = bcrypt.hashSync(
				req.body.password,
				bcrypt.genSaltSync(10)
			);
			User.create(req.body, (err, createdUser) => {
				res.redirect('/');
			});
		}
	});
});

// Get Display Name
users.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, userInfo) => {
		if (err || userInfo === null) {
			res.send('The Knowledge');
		} else {
			res.send(userInfo.displayName);
		}
	});
});

module.exports = users;
