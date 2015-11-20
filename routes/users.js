var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');

router.get('/list', function(req, res, next) {
    res.json(JSON.parse(fs.readFileSync('routes/user.json')));
});

router.put('/', function(req, res, next) {
    console.log('update user');
    res.send();
});

router.get('/test2', function(req, res, next) {

    console.log('send controller');
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        debug: true,
        auth: {
            user: 'muc.refugees',
            pass: 'FD37hZJL8z3eyBUbBcho'
        }
    });

    var mailOptions = {
        from: 'Refugee <muc.refugees@gmail.com>',
        to: 'felix-bw@gmx.de>',
        subject: 'Hello ?',
        text: 'Hello world ?',
        html: '<b>Hello world ?</b>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    res.send();

});




module.exports = router;
