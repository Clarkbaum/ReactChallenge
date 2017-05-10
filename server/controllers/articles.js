const Article = require('../models/articles.js');

exports.create = (request, response) => {
  // the current user is the default owner
  //const owners = request.body.owners || [request.session.user];
  console.log("controller request.body", request.body)
  const survey = Object.assign({}, request.body, { owners });
  Article.create(survey)
  .then(doc => response.status(201).json(doc))
  .catch((err) => console.log("article.create error", err));
};