var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('../../util/http');
var User = require('../../sc/User');




router.put('/personal', function(req, res, next) {
    var data =  {
        gender: req.body.gender,
        name: req.body.name,
        tel: req.body.tel,
        mobil: req.body.mobil,
        email: req.body.email
    };
    console.log(data);
    User.update(req.user.id, data);
    res.send();
});

router.post('/photo', function(req, res, next) {
    console.log(req.body);
});


router.put('/availability', function(req, res, next) {
    User.update(req.user.id, {availability:req.body});
    res.send();
});





module.exports = router;
