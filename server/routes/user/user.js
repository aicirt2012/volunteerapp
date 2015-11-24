var express = require('express');
var router = express.Router();
var fs = require('fs');
var mailer = require('../../util/mailer');
var request = require('request');
var config = require('../../../config')

/** list all users */
router.get('/list', function(req, res, next) {
    res.json(JSON.parse(fs.readFileSync('server/routes/user/user.list.json')));
});

/** returns session user */
router.get('/me', function(req, res, next) {
    console.log('me user');
    res.send();
});

/** update user */
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


router.get('/test3', function(req, res, next) {

    request(config.apiurl+'/users', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(JSON.parse(body));
        }else{
            res.send('err');
        }
    });
});

/** create new user*/
router.get('/test4', function(req, res, next) {


    var auth = new Buffer(config.sc.user + ':' + config.sc.pass).toString('base64');
    var req = {
        url: 'http://vmmatthes21.informatik.tu-muenchen.de/api/0.1/users',
        headers: {
            'Authorization': 'Basic ' + auth,
            'Content-Type': 'application/json'
        }
    };
     console.log('request prepared', JSON.stringify(req));
    request(req, function (error, response, body) {
        console.log(error);
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(JSON.parse(body));
        }else{
            res.send('err');
        }
    });

});

module.exports = router;
