var express = require('express');
var router = express.Router();
var mailer = require('../../util/mailer');
var http = require('../../util/http');
var User = require('../../sc/User');
var validator = require('../../util/validator');


router.get('/me', function(req, res) {
    res.json(User.toMe(req.user));
});


router.post('/', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
        //if(User.validates(req.body.gender, req.body.name, req.body.tel, req.body.mobil,req.body.email, req.body.notes, req.body.role)){
            User.exists(req.body.email, '', function (err) {
                if (err) {
                    console.log(err);
                } else {
                    User.save({
                        gender: req.body.gender,
                        name: req.body.name,
                        tel: req.body.tel,
                        mobil: req.body.mobil,
                        email: req.body.email,
                        pw: User.hashPw(req.body.pw),
                        notes: req.body.notes,
                        role: req.body.role,
                        availability: req.body.availability
                    }, function () {
                        res.send();
                    });
                }
            });
        //}else{
          //  res.sendStatus(500);
        //}
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
        validator.isEmail(req.body.email);
        validator.matches(req.body.name, /[a-zA-ZöüäßÜÖÄ ]*/);
        validator.isMobilePhone(req.body.tel, 'de-DE');
        validator.isMobilePhone(req.body.mobil, 'de-DE');
        validator.matches(req.body.role, /HELPER|TEAM|ORGANIZER|ADMIN/i);
        validator.matches(req.body.gender, /MALE|FEMALE/i);

        if(validator.allValid()){
            var uId = req.params.id;
            User.exists(req.body.email, uId, function (err) {
                if (err) {
                } else {
                    User.update(uId, {
                        gender: req.body.gender,
                        name: req.body.name,
                        tel: req.body.tel,
                        mobil: req.body.mobil,
                        email: req.body.email,
                        notes: validator.blacklist(req.body.notes, "<>;\"\'´"),
                        role: req.body.role,
                        availability: req.body.availability
                    }, function () {
                        res.send();
                    });
                }
            });
       }else{
           res.sendStatus(400);
        }
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
                        html: 'Hallo '+user.name + '<br/> Ihr neues Passwort lautet: "'+plainPw+'"!<br\> Viele Grüße, <br\>Volunteer App Team'
                    });
                    res.send();
                });
        });
    }else
        res.sendStatus(403);

});


module.exports = router;
