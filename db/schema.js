var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/youcandoitdb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MONGO CONNECTION OPEN');
});

var listSchema = new mongoose.Schema({
  task: {type: String, required: true, index: {unique: true}}
})

var List = mongoose.model('List', listSchema);
module.exports = List;