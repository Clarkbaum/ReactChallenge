const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const article = require('./controllers/articles.js');

require('./config/database.js')(config);


const app = express();
module.exports = app;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/', function(req, res){
  article.create(req, res)
})

app.put('/:article', function(req, res){
  //the put will include the article id in the request.params
  article.update(req, res)
})

app.get('/', function(req, res){
  article.get(req, res)
})

app.delete('/:article', function(req, res){
  //the delete will include the article id in the request.params
  article.delete(req, res)
})

app.listen('8080', function(){
  console.log('listening on port 8080');
})