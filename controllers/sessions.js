const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

users.post('/', (req, res) => {
	User.findOne({ email: req.body.email }, (err, foundUser) => {
		if (foundUser) {
			if (bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.currentUser = foundUser;
				res.cookie('sessionid', req.session.id, {});
				res.cookie('user', foundUser.email);
				res.send('logged in');
			}
		} else {
			res.status(200);
			res.send('wrong username or password');
		}
	});
});

// Delete
users.delete('/', (req, res) => {
	req.session.destroy(() => {
		// res.redirect('/');
	});
	res.clearCookie('user');
	res.clearCookie('sessionid');
	res.send('logout successful');
});

module.exports = users;
