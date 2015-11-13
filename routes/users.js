var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/list', function(req, res, next) {
  res.json(JSON.parse(fs.readFileSync('routes/user.json')));
});

module.exports = router;
