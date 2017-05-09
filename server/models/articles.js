const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articlesSchema = Schema({
  _id,
  participant: { type: ObjectId, ref: 'Session.sid', select: false },
  survey: { type: ObjectId, ref: 'Survey', required: true },
  answers: [AnswerSchema]
}, { strict: 'throw' });


module.exports = mongoose.model('articles', articlesSchema);