const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articlesSchema = Schema({
  title: String,
  author: String,
  date: String,
  articalBody: String
}, { strict: 'throw' });


module.exports = mongoose.model('articles', articlesSchema);