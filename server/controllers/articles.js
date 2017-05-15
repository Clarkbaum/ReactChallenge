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
  Article.findById(request.params.article).exec()
  .then((data) => {
    const doc = data;
    doc.title = request.body.title;
    doc.author = request.body.author;
    doc.date = request.body.date;
    doc.articalBody = request.body.articalBody;
    return doc.save();
  })
  .then((result) => {
    response.status(200).json(result);
  })
  .catch((err) => console.log("article.update error", err));
};

exports.delete = (request, response) => {
  Article.findById(request.params.article).exec()
  .then(doc => doc.remove())
  .then(doc => response.status(200).json(doc))
  .catch((err) => console.log("article.delete error", err));
};