const Article = require('../models/articles.js');

exports.create = (request, response) => {
  const article = Object.assign({}, request.body);
  Article.create(article)
  .then(art => response.status(201).json(art))
  .catch((err) => console.log("article.create error", err));
};

exports.get = (request, response) => {
  Article.find()
  .then(art => response.status(200).json(art))
  .catch((err) => console.log("article.get error", err));
};
