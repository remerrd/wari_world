var express = require('express');
var router = express.Router();

var last_choice = {};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index', { title: 'public' });
});

router.get('/world', function(req, res) {
  console.log("In get world");
  res.send(last_choice);
});

router.post('/world', function(req,res){
  console.log("In post world")
  console.log(req.body);
  
  last_choice = req.body;
  
  res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;

