var express = require('express');
var router = express.Router();
var User = require('../../sc/User');
var UserMongo = require('../../m/User');
var Log = require('../../sc/Log');
var config = require('../../../config');
var jwt = require('jsonwebtoken');



router.post('/', function(req, res, next) {
    if(!req.body || !req.body.email || !req.body.pw) {
        console.log('not containing credentials');
        return res.sendStatus(403);
    }

    var email = req.body.email;
    var pw = req.body.pw;

    if(true){
        UserMongo.canLogin(email, pw, function(err, user){
            if(err) {
                console.log(err);
                console.log('could not login');
                return res.sendStatus(403);
            }else {
                return res.json({
                    token: jwt.sign(user.id, config.jwt.secret, {expiresIn: config.jwt.expiresInSeconds}),
                    user: User.toMe(user)
                });
            }
        });
    }else{
        User.canLogin(email, pw, function(err, user){
            if(err) {
                console.log(err);
                console.log('could not login');
                return res.sendStatus(403);
            }else {
                return res.json({
                    token: jwt.sign(user.id, config.jwt.secret, {expiresIn: config.jwt.expiresInSeconds}),
                    user: User.toMe(user)
                });
            }
        });
    }
});

module.exports = router;
