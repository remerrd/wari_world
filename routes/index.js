var express = require('express');
var router = express.Router();

 var server_world = [];
 var first_choice = {
        title: "A New Land",
        desc: 
        `You open your eyes and find yourself at a crossroad of two dirt roads
        To the North you see a great mountain range with snow at the top of the peaks.
        To the East you see a forest filled with life with a mysterious aura.
        To the West you see a great Medieval Castle, with the farmland and homes along the path.
        To the South you see a coastline with a large boat in the distance`,
        options: ["North", "East", "West", "South"],
        paths: [0,0,0,0]
  }
  server_world.push(first_choice);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index', { title: 'public' });
});

router.get('/world', function(req, res) {
  console.log("In get world");
  res.send(server_world);
});

router.post('/world', function(req,res){
  console.log("In post world")
  console.log(req.body);
  var newChoice = {
    title: req.body.title,
    desc: req.body.desc,
    options: req.body.options,
    paths: req.body.paths};
  
  server_world[req.body.my_index].paths[req.body.my_path] = server_world.length;
  server_world.push(newChoice);
  
  res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;

