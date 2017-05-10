const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser');

const app = express();
module.exports = app;
mongoose.Promise = Promise;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/react-challenge')
.then(() => console.log('Database connected'))
.catch(() => console.error('Database failed to connect'));


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