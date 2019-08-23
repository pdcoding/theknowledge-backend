const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema(
	{
		name: String,
		caption: String,
		image: String,
		createdBy: String,
		questions: [Object],
		results: [Object]
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
	}
);

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
