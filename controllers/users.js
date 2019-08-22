const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

// create
users.post('/', (req, res) => {
	console.log('SESSION ID BELOW');
	if (req.headers.cookie) {
		const cookies = parseCookies(req.headers.cookie);
		console.log(cookies.sessionid);
	} else {
		console.log('no session yet');
	}

	req.body.password = bcrypt.hashSync(
		req.body.password,
		bcrypt.genSaltSync(10)
	);
	User.create(req.body, (err, createdUser) => {
		res.redirect('/');
	});
});

module.exports = users;

// Adapted from https://stackoverflow.com/questions/3393854/
const parseCookies = cookies => {
	let cookiesObj = {};

	cookies.split(';').forEach(cookie => {
		let parts = cookie.split('=');
		cookiesObj[parts.shift().trim()] = decodeURI(parts.join('='));
	});

	return cookiesObj;
};
