var express = require('express');
var router = express.Router();
var http = require('../../util/http');
var User = require('../../sc/User');


router.get('/me', function(req, res) {
    res.json(User.toMe(req.user));
});


router.post('/', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
        User.exists(req.body.email, '', function(err){
            if(err) {
                console.log(err);
            }else{
                User.save({
                    gender: req.body.gender,
                    name: req.body.name,
                    tel: req.body.tel,
                    mobil: req.body.mobil,
                    email: req.body.email,
                    pw: "userpw",
                    notes: req.body.notes,
                    role: req.body.role,
                    availability: req.body.availability
                }, function () {
                    res.send();
                });
            }
        });
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
        var uId = req.params.id;
        User.exists(req.body.email, uId, function(err){
            if(err) {
                console.log(err);
            }else{
                console.log('here');
                User.update( uId, {
                    gender: req.body.gender,
                    name: req.body.name,
                    tel: req.body.tel,
                    mobil: req.body.mobil,
                    email: req.body.email,
                    notes: req.body.notes,
                    role: req.body.role,
                    availability: req.body.availability
                }, function(){
                    res.send();
                });
            }
        });
    }else
        res.sendStatus(403);
});


router.put('/resetpw', function(req, res) {
    User.save({
        pw: req.body.pw
    }, function(){
        res.send();
    });
});



module.exports = router;
