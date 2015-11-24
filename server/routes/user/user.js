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
    http.get('/users/me', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }else{
            res.send('err');
        }
    });
});

/** update user */
router.put('/', function(req, res, next) {
    console.log('update user');
    res.send();
});


router.get('/test2', function(req, res, next) {
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



/** create new user*/
router.get('/test4', function(req, res, next) {
    http.get('/users', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }else{
            res.send('err');
        }
    });

});

module.exports = router;
