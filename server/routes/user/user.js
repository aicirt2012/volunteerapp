var express = require('express');
var router = express.Router();
var mailer = require('../../util/mailer');
var http = require('../../util/http');
var User = require('../../sc/User');
var val = require('../../util/validator');
var Log = require('../../sc/Log');


router.get('/me', function(req, res) {
    res.json(User.toMe(req.user));
});


router.post('/', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
        val.isEmail(req.body.email);
        val.isName(req.body.name);
        val.isPhone(req.body.tel, false);
        val.isPhone(req.body.mobil, false);
        val.isRole(req.body.role);
        val.isGender(req.body.gender);

        if(val.allValid()){
            val.reset();
            User.exists(req.body.email, '', function (err) {
                if (err) {
                    console.log(err);
                } else {
                    var data = {
                        gender: req.body.gender,
                        name: req.body.name,
                        tel: req.body.tel,
                        mobil: req.body.mobil,
                        email: req.body.email,
                        pw: User.hashPw(req.body.pw),
                        notes: val.blacklist(req.body.notes, "<>;\"\'´"),
                        role: req.body.role,
                        availability: req.body.availability
                    };
                    Log.info(req.user, Log.actions.USER_CREATE, data);
                    User.save(data, function () {
                        res.send();
                    });
                }
            });
        }else{
            val.reset();
            res.sendStatus(400);
        }
    }else
        res.sendStatus(403);
});

router.get('/', function(req, res) {
    if(User.atLeastTeam(req.user.role )){
        User.findAll(function(err, users){
            res.json(users);
        });
    }else
        res.sendStatus(403);
});

router.get('/:id', function(req, res) {
    if(User.atLeastTeam(req.user.role )){
        var uId = req.params.id;
        User.findById(uId, function(err, user){
            if(err)
                res.sendStatus(500);
            else
                res.json(user);
        });
    }else
        res.sendStatus(403);
});

router.put('/:id', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
        val.isEmail(req.body.email);
        val.isName(req.body.name);
        val.isPhone(req.body.tel);
        val.isPhone(req.body.mobil);
        val.isRole(req.body.role);
        val.isGender(req.body.gender);

        if(val.allValid()){
            val.reset();
            var uId = req.params.id;
            var data = {
                gender: req.body.gender,
                name: req.body.name,
                tel: req.body.tel,
                mobil: req.body.mobil,
                email: req.body.email,
                notes: val.blacklist(req.body.notes, "<>;\"\'´"),
                role: req.body.role,
                availability: req.body.availability
            };
            Log.info(req.user, Log.actions.USER_UPDATE, data);
            User.exists(req.body.email, uId, function (err) {
                if (err) {
                } else {
                    User.update(uId, data, function () {
                        res.send();
                    });
                }
            });
       }else{
            val.reset();
           res.sendStatus(400);
        }
    }else
        res.sendStatus(403);
});

router.delete('/:id', function(req, res) {
    if(User.atLeastAdmin(req.user.role )){
        var uId = req.params.id;
        Log.info(req.user, Log.actions.USER_DELETE, {userId: uId});
        Event.findByUserId(uId, function(err, events){
            if(err) {
                console.log(err);
            }else{
                async.forEach(events, function(e, delUser){
                    Event.delAttributeValue(e.id, 'helpers', {id: uId}, function (err) {
                        cb();
                    });
                }, function(err){
                    res.sendStatus(500);
                    cb();
                });
                function delUser(){
                    User.delete(uId, function(err){
                        res.send();
                    });
                }
            }
        });
    }else
        res.sendStatus(403);
});

router.put('/:id/picture', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
        var uId = req.params.id;
        User.update( uId, {
            picture: req.body.picture
        }, function(){
            res.send();
        });
    }else
        res.sendStatus(403);
});


router.post('/:id/resetpw', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
        var uId = req.params.id;
        var plainPw = User.generatePw();
        var hashedPw = User.hashPw(plainPw);
        Log.info(req.user, Log.actions.USER_RESETPW, {userId: uId});
        User.findById(uId, function(err, user){
            if(err)
                res.sendStatus(500);
            else
                User.update( uId, {
                    pw: hashedPw
                }, function(){
                    mailer.send({
                        to: user.email,
                        subject: 'Ihr Passwort wurde zurückgesetzt!',
                        html: 'Hallo '+user.name + ';<br/>' +
                              'Ihr neues Passwort lautet: "'+plainPw+'"!<br\>' +
                              'Viele Grüße, <br\>' +
                              'Volunteer App Team'
                    });
                    res.send();
                });
        });
    }else
        res.sendStatus(403);

});


module.exports = router;
