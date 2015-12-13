var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('../../util/http');
var User = require('../../sc/User');




router.put('/personal', function(req, res, next) {

    res.send();
});


router.put('/availability', function(req, res, next) {
    User.update(req.user.id, {availability:req.body});

    res.send();
});





module.exports = router;
