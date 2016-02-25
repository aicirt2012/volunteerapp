var express = require('express');
var router = express.Router();
var Log = require('../../sc/Log');


router.get('/', function(req, res) {
    console.log('get all Logs');
    Log.findAll(function(err, logs){
        res.json(logs);
    });
});



module.exports = router;
