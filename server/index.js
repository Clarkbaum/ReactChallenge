const express = require('express');
var bodyParser = require('body-parser');


const app = express();
module.exports = app;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/', function(req, res){
  console.log("req.body", req.body)
  res.send("post /")
})

app.get('/', function(req, res){
  res.send("get /")
})

app.delete('/', function(req, res){
  res.send("delete /")
})

app.listen('3000', function(){
  console.log('listening on port 3000');
})