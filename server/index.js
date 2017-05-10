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
  console.log("req.body", req.body)
  article.create(req, res)
  //res.send("post /")
})

app.get('/', function(req, res){
  res.send("get /")
})

app.delete('/', function(req, res){
  res.send("delete /")
})

app.listen('8080', function(){
  console.log('listening on port 8080');
})