var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/YouCanDoItdb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MONGO CONNECTION OPEN');
});

var listSchema = new mongoose.Schema({
  task: {type: String, required: true, index: {unique: true}}
})

var dontSchema = new mongoose.Schema({
  task: {type: String, required: true, index: {unique: true}}
})

var Todo = mongoose.model('Todo', listSchema);
var Todont = mongoose.model('Todont', dontSchema);

module.exports = {Todo: Todo, Todont: Todont};