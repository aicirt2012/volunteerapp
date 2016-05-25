var express = require('express');
var router = express.Router();
var Log = require('../../model/mo/Log');
var User = require('../../model/mo/User');


router.get('/', function(req, res) {
    if(req.user.atLeastAdmin()){
        Log.find(function(err, logs){
            res.json(logs);
        });
    }else
        res.sendStatus(403);
});



module.exports = router;
