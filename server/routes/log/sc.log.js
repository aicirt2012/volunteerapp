var express = require('express');
var router = express.Router();
var Log = require('../../model/sc/Log');
var User = require('../../model/sc/User');


router.get('/', function(req, res) {
    if(User.atLeastAdmin(req.user.role)){
        Log.findAll(function(err, logs){
            res.json(logs);
        });
    }else
        res.sendStatus(403);
});



module.exports = router;
