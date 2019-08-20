const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3003;
const cors = require('cors');

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

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send(`Attention humans, we are observing you on PORT ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Attention all humans, we are observing you on PORT ${PORT}`);
});
