var express = require('express');
var router = express.Router();
var fs = require('fs');
var mailer = require('../../util/mailer');
var http = require('../../util/http');
var User = require('../../sc/User');


router.get('/list', function(req, res, next) {
    User.findAll(function(err, users){
        res.json(users);
    });
});


router.get('/me', function(req, res, next) {
    if(!req.user)
        res.status(403).send();
    else
        res.json(User.toMe(req.user));
});


router.post('/', function(req, res, next) {
    User.save({
        gender: req.body.gender,
        name: req.body.name,
        tel: req.body.tel,
        mobil: req.body.mobil,
        email: req.body.email,
        pw: req.body.pw,
        notes: req.body.notes,
        role: req.body.role,
        availability: req.body.availability
    }, function(){
        res.send();
    });
});

router.get('/:id', function(req, res, next) {
    var uId = req.params.id;
    User.findById(uId, function(err, user){
        if(err)
            res.status(500).send();
        else
            res.json(user);
    });
});

/** update user */
router.put('/:id', function(req, res, next) {
    console.log('update user');
    res.send();
});

/** reset userpw */
router.put('/resetpw', function(req, res, next) {
    console.log('update user');
    res.send();
});

router.get('/sendmailtest', function(req, res, next) {
    mailer.send({
        to: 'felix.michel@tum.de',
        subject: 'Hello ✔',
        text: 'Hello world ✔',
        html: '<b>Hello world ✔</b>'
    },function(error, info){
        if(error)
            return console.log(error);
        console.log('Message sent: ' + info.response);
    });
    res.send();
});


router.get('/available', function(req, res, next) {
    User.find( 'availability.fr.afternoon', function(err, users){
        res.json(users)
    });
});




module.exports = router;
