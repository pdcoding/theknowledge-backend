const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/users.js');

//index
users.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        if (err) {
          res.status(400).json({ error: err.message });
        }
        res.status(200).send(allUsers);
      });
    });

//Create
users.post('/', (req, res) => {
	User.findOne({ email: req.body.email  }, (err, foundUser) => {
		if (bcrypt.compareSync(req.body.password, foundUser.password)) {
			req.session.currentUser = foundUser;
			res.send('login correct');
		} else {
			res.send('wrong password');
		}
	});
});

// Delete
users.delete('/', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
});


module.exports = users;

