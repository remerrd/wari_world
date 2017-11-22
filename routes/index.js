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
  var world;

  Choice.find(function(err,choiceList){
    if (err) return console.error(err);
    else{
      console.log(choiceList);
      world = choiceList;
    }
  })

  return res.json(world);
});

router.post('/world', function(req,res){
  console.log("In post world")
  //put choice in db
  

  var new_choice = new Choice({
    title: req.body.title,
    desc: req.body.desc,
    options: req.body.options,
    paths: req.body.paths,
  });
  console.log(new_choice);
  console.log("id: " + req.body.currentIndex);

  new_choice.save(function(err,post){
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  })
});


router.param('choice',function(req,res,next,id){
  var query = Choice.findById(id);
  query.exec(function(err,choice){
    if(err) {return next(err);}
    if(!choice){return next(new Error("can't find choice"))}
    req.choice = choice;
    return next();
  })
})

router.get('/world/:choice',function(req,res){
  res.json(req.choice);
})

router.delete('/world/:choice',function(req,res){
  console.log("Deleting Choice");

  deleteRec(req.choice);
  res.sendStatus(200);
})

var deleteRec = function(choice){
    for(let i = 0; i < choice.paths.length;i++){
      if (choice.path[i] != 0);
      {
        var id = choice.path[i];
        var query = Choice.findById(id);
        query.exec(function(err,next_choice){
          if(err) {return next(err);}
          if(!next_choice){return next(new Error("can't find choice"))}
          console.log("Rec Delete "+ id);
          deleteRec(next_choice);
        });
      }
    }
    choice.remove();
}

module.exports = router;

