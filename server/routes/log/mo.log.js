var express = require('express');
var router = express.Router();
var Log = require('../../model/mo/Log');
var User = require('../../model/mo/User');


router.get('/', function(req, res) {
    if(!req.user.atLeastAdmin())
        return res.status(403).send();
    
    Log.find(function(err, logs){
        res.json(logs);
    });
});



module.exports = router;
