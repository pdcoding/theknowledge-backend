const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3003;

app.get('/', (req, res) => {
  res.send(`Attention humans, we are observing you on PORT ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Attention all humans, we are observing you on PORT ${PORT}`);
});
