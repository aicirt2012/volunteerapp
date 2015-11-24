var express = require('express');
var router = express.Router();
var fs = require('fs');
var mailer = require('../../util/mailer');
var http = require('../../util/http');


/** list all users */
router.get('/list', function(req, res, next) {
    http.get('/users', function (err, response) {
        if (!err) {
            var list = [];
            response.body.forEach(function(u){
                list.push({
                    id: u.id,
                    name: u.name,
                    email: u.email
                });
            });
            res.json(list);
        }else{
            res.json('err');
        }
    });
    //res.json(JSON.parse(fs.readFileSync('server/routes/user/user.list.json')));
});

/** returns session user */
router.get('/me', function(req, res, next) {
    http.get('/users/me', function (err, response) {
        if (!err) {
            var u = response.body;
            res.json({
                id: u.id,
                name: u.name,
                email: u.email
            });
        }else{
            res.json('err');
        }
    });
});

/** create new user*/
router.post('/', function(req, res, next) {

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
