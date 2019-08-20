const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  name: String,
  caption: String,
  image: String,
  questions: [Object],
  results: [Object]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;