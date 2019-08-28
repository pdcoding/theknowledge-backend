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
				res.cookie('userid', String(foundUser._id));
				res.send('logged in');
				console.log(res);
			}
		} else {
			res.status(200);
			res.send('wrong username or password');
			console.log(res);
		}
	});
});

// Delete
users.delete('/', (req, res) => {
	req.session.destroy(() => {});
	res.clearCookie('user');
	res.clearCookie('sessionid');
	res.clearCookie('userid');
	res.send('logout successful');
});

module.exports = users;
