const Article = require('../models/articles.js');

exports.create = (request, response) => {
  // the current user is the default owner
  //const owners = request.body.owners || [request.session.user];
  console.log("controller request.body", request.body)
  const article = Object.assign({}, request.body);
  Article.create(article)
  .then(doc => response.status(201).json(doc))
  .catch((err) => console.log("article.create error", err));
};