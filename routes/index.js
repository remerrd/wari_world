var express = require('express');
var router = express.Router();

var newChoice = {
  title: req.body.title,
  desc: req.body.desc,
  options: req.body.options,
  paths: req.body.paths};


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
  
  
  
  res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;

