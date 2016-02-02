var express = require('express');
var router = express.Router();
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
    User.update(req.user.id, data, function(){
        res.send();
    });

});

router.post('/photo', function(req, res, next) {
    console.log(req.body);
});


router.put('/availability', function(req, res, next) {
    User.update(req.user.id, {availability:req.body}, function(){
        res.send();
    });
});





module.exports = router;
