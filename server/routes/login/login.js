var express = require('express');
var router = express.Router();
var User = require('../../sc/User');
var config = require('../../../config');
var jwt = require('jsonwebtoken');



router.post('/', function(req, res, next) {
    if(!req.body || !req.body.email || !req.body.pw)
        return res.status(403).send();

    var email = req.body.email;
    var pw = req.body.pw;

    User.canLogin(email, pw, function(err, users){
        if(err || users.length != 1)
            return res.status(403).send();
        else
            var user = users[0];
            return res.json({
                token: jwt.sign(user.id, config.jwt.secret, {expiresIn: config.jwt.expiresInSeconds}),
                userid: user.id
            });
    });
});

module.exports = router;
