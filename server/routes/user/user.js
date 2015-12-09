var express = require('express');
var router = express.Router();
var fs = require('fs');
var mailer = require('../../util/mailer');
var http = require('../../util/http');
var User = require('../../sc/User');

/** list all users */
router.get('/list', function(req, res, next) {

    User.findAll(function(err, users){
        for(var i=0; i<users.length; i++){
            console.log(JSON.stringify(users[i]));
            users[i].availability = JSON.parse(users[i].availability.replace("/\\/", ""));
        }
        res.json(users);
    });
    //res.json(JSON.parse(fs.readFileSync('server/routes/user/user.list.json')));
});

/** returns session user */
router.get('/me', function(req, res, next) {
    scuser.me(function(err, data){
        if(err)
            res.status(403).send();
        else
            res.json(data);
    });
});

/** create new user*/
router.post('/', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {
    res.json(JSON.parse(fs.readFileSync('server/routes/user/user.list.json'))[0]);
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




module.exports = router;
