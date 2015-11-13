var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.send(JSON.parse(fs.readFileSync('routes/user.json')));
});

module.exports = router;
