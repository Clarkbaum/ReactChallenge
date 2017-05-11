const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const article = require('./controllers/articles.js');

require('./config/database.js')(config);


const app = express();
module.exports = app;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-headers', 'x-parse-application-id, x-parse-rest-api-key, Content-Type, Accept');

  //res.setHeader('Content-Type', 'application/json');
  next();
});

app.post('/articles', function(req, res){
  article.create(req, res)
})

app.put('/articles/:article', function(req, res){
  //the put will include the article id in the request.params
  article.update(req, res)
})

app.get('/articles', function(req, res){
  article.get(req, res)
})

app.delete('/articles/:article', function(req, res){
  //the delete will include the article id in the request.params
  article.delete(req, res)
})

app.listen('8000', function(){
  console.log('listening on port 8000');
})