var express = require('express');
var bodyParser = require('body-parser');
var List = require('./db/schema.js');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.listen(2023, function() {
  console.log('LISTENING TO PORT NUMBER 2023');
});