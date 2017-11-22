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
  paths: [String]
})

var Choice = mongoose.model('Choice',choiceSchema);

var world = 0;

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

router.get('/worldlist', function(req, res) {
  console.log("In get worldlist");

  Choice.find(function(err,choiceList){
    if (err) return console.error(err);
    else{
      console.log(choiceList);
      res.json(choiceList);
      world = choiceList;
    }
  })

  
});

router.get('/world', function(req, res) {
  console.log("In get world");

  Choice.find(function(err,choiceList){
    if (err) return console.error(err);
    else{
      //console.log(choiceList);
      res.json(choiceList[0]._id);
      world = choiceList;
    }
  })

  
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
  console.log("index: " + req.body.nextIndex);

  var id = req.body.currentIndex
  var index = req.body.nextIndex
  

  if (id != "0"){
    Choice.find({_id:id},function(err,me){
      if (err) return console.error(err);
      console.log("Updating...");
      var new_me = me;
      console.log(new_me);

      console.log(new_me[0].paths[index])
      new_me[0].paths[index] = new_choice._id;
      console.log(new_me[0].paths[index])

      Choice.updateOne({_id:id}, new_me[0], function(err, res){
        console.log("FINALLY!");
        console.log(res);
      })

    })
  }

  var new_choice = new Choice({
    title: "The Crossroad",
    desc: `You open your eyes and find yourself at a crossroad of two dirt roads
    To the North you see a great mountain range with snow at the top of the peaks.
    To the East you see a forest filled with life with a mysterious aura.
    To the West you see a great Medieval Castle, with the farmland and homes along the path.
    To the South you see a coastline with a large boat in the distance. Where would you like to go?`,
    options: ["north","east","south","west"],
    paths: ["0","0","0","0"],
  });

  new_choice.save(function(err,post){
    if (err) return console.error(err);
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


  var deleteRec = function(choice){
    console.log("CHOICE" + choice);
    for (let i = 0; i < choice.paths.length; i++){
      console.log(i);
      if (choice.paths[i] != "0"){
        var query = Choice.findById(id);
          query.exec(function(err,next_choice){
            if (err) return;
            if (!next_choice) return;
            deleteRec(next_choice);
            }); 
      }
    }	
  }

  deleteRec(req.choice);



  res.sendStatus(200);
})



module.exports = router;

