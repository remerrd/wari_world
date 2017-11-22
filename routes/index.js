var express = require('express');
var router = express.Router();

//connect to the server
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wari-world');

//create the model
var choiceSchema = mongoose.Schema({
  title: String,
  desc: String,
  options: [String],
  paths: [Number]
})

var Choice = mongoose.model('Choice',choiceSchema);

//test connection
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
console.log('Connected');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index', { title: 'public' });
});

router.get('/world', function(req, res) {
  console.log("In get world");

  Choice.find(function(err,choiceList){
    if (err) return console.error(err);
    else{
      console.log(choiceList);
    }
  })
});

router.post('/world', function(req,res){
  console.log("In post world")
  //put choice in db

  var new_choice = new Choice(req.body);
  console.log(new_choice);

  new_choice.save(function(err,post){
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  })

  
  last_choice = req.body;
  
  res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;

