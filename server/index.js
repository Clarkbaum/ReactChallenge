const express = require('express');
var bodyParser = require('body-parser');


const app = express();
module.exports = app;

app.post('/', function(req, res){

})

app.get('/', function(req, res){
  res.send("get /")
})

app.post('/', function(req, res){

})

app.listen('3000', function(){
  console.log('listening on port 3000');
})