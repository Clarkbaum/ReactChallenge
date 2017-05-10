const Article = require('../models/articles.js');

exports.create = (request, response) => {
  const article = Object.assign({}, request.body);
  Article.create(article)
  .then(result => response.status(201).json(result))
  .catch((err) => console.log("article.create error", err));
};

exports.get = (request, response) => {
  Article.find()
  .then(result => response.status(200).json(result))
  .catch((err) => console.log("article.get error", err));
};

exports.update = (request, response) => {
  console.log("article controller request.params", request.params)
  Article.findById(request.params.article).exec()
  .then((data) => {
    const doc = data;
    doc.title = request.body.title;
    doc.auther = request.body.auther;
    doc.date = request.body.date;
    doc.articalBody = request.body.articalBody;
    return doc.save();
  })
  .then((result) => {
    response.status(200).json(result);
  })
  .catch((err) => console.log("article.update error", err));
};