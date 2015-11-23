var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/list', function(req, res, next) {
    res.json(JSON.parse(fs.readFileSync('routes/event.json')));
});

router.put('/', function(req, res, next) {
    console.log('update event');
    res.send();
});

router.post('/', function(req, res, next) {
    console.log('create event');

    res.send();
});





module.exports = router;
