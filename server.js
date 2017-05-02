var express = require('express');
var bodyParser = require('body-parser');
var Todo = require('./db/schema.js');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.listen(2023, function() {
  console.log('LISTENING TO PORT NUMBER 2023');
});

app.get('/list', function(req, res) {
  Todo.find({}).exec(function(err, todos) {
    res.status(200).send(todos);
  })
});

app.post('/list', function(req, res) {
  Todo.findOne({task: req.body.task})
    .exec(function(err, todo) {
      if (!todo) {
        var newTodo = new Todo({
          task: req.body.task
        });
        newTodo.save(function(err, newTodo) {
          if (err) {
            res.status(500).send(err);
          }
          res.status(201).send(newTodo);
        })
      }
    });
});

app.delete('/list', function(req, res) {
  Todo.findOne({task: req.body.task})
    .remove()
    .exec(function(err, response) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(204).send(req.body.task);
    })
})