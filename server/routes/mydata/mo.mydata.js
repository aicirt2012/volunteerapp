var express = require('express');
var router = express.Router();
var http = require('../../util/http');
var User = require('../../model/mo/User');
var Event = require('../../model/mo/Event');
var val = require('../../util/validator');
var Log = require('../../model/mo/Log');

router.post('/photo', function(req, res){
    User.findById(req.user.id, function(err, u){
        u.picture = req.body.picture;
        u.save(function(){
            res.send();
        });
    });
});

router.put('/personal', function(req, res) {
    val.init();
    val.isEmail(req.body.email);
    val.isName(req.body.name);
    val.isPhone(req.body.tel, false);
    val.isPhone(req.body.mobil, false);
    val.isGender(req.body.gender);

    if(!val.allValid())
        return res.status(400).send();

    var uId = req.user.id;
    User.findById(uId, function(err, u){
        if(err) throw err;
        u.gender = req.body.gender;
        u.name = req.body.name;
        u.tel = req.body.tel;
        u.mobil = req.body.mobil;
        u.email = req.body.email;
        u.save(function(err){
            if(err)
                return res.status(409).send();
            Log.info(req.user, Log.actions.USER_UPDATE, u);
            res.send();
        });
    });
});

router.put('/availability', function(req, res) {
    val.init();
   // val.isAvailability(req.body.availability);
    //TODO check validator

    User.findById(req.user.id, function(err, u){
        u.availability = req.body;
        u.save(function(err){
            if(err)
                return res.status(500).send();
            res.send();
        });
    });
});

router.get('/events', function(req, res){
    Event.findByUserId(req.user.id, function(err, events){
        res.send(events);
    });
});





module.exports = router;
