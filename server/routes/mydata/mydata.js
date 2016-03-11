var express = require('express');
var router = express.Router();
var http = require('../../util/http');
var User = require('../../sc/User');
var Event = require('../../sc/Event');
var val = require('../../util/validator');

router.post('/photo', function(req, res){
    User.update(req.user.id, {picture:req.body.picture}, function(){
        res.send();
    });
});

router.put('/personal', function(req, res, next) {
    val.init();
    val.isEmail(req.body.email);
    val.isName(req.body.name);
    val.isPhone(req.body.tel);
    val.isPhone(req.body.mobil);
    val.isGender(req.body.gender);

    if(val.allValid()) {
        var uId = req.user.id;
        User.exists(req.body.email, uId, function (err) {
            if (err) {
                console.log(err);
            } else {
                var data = {
                    gender: req.body.gender,
                    name: req.body.name,
                    tel: req.body.tel,
                    mobil: req.body.mobil,
                    email: req.body.email
                };
                Log.info(req.user, Log.actions.USER_UPDATE, data);
                User.update(uId, data, function () {
                    res.send();
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
});

router.put('/availability', function(req, res, next) {
    User.update(req.user.id, {availability:req.body}, function(){
        res.send();
    });
});

router.get('/events', function(req, res){
    Event.findByUserId(req.user.id, function(err, events){
        res.send(events);
    });
});





module.exports = router;
