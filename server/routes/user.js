var express = require('express');
var router = express.Router();
var fs = require('fs');
var mailer = require('../util/mailer');

router.get('/list', function(req, res, next) {
    res.json(JSON.parse(fs.readFileSync('routes/user.json')));
});

router.get('/me', function(req, res, next) {
    console.log('me user');
    res.send();
});

router.put('/', function(req, res, next) {
    console.log('update user');
    res.send();
});

router.get('/test2', function(req, res, next) {
    mailer.send({
        to: 'felix.michel@tum.de',
        subject: 'Hello ?',
        text: 'Hello world ?',
        html: '<b>Hello world ?</b>'
    },function(error, info){
        if(error)
            return console.log(error);
        console.log('Message sent: ' + info.response);
    });
    res.send();
});

module.exports = router;
