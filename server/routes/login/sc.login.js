var express = require('express');
var router = express.Router();
var User = require('../../model/sc/User');
var UserMongo = require('../../model/sc/User');
var Log = require('../../model/sc/Log');
var config = require('../../../config');
var jwt = require('jsonwebtoken');



router.post('/', function(req, res, next) {
    if(!req.body || !req.body.email || !req.body.pw) {
        console.log('not containing credentials');
        return res.status(403).send();
    }

    var email = req.body.email;
    var pw = req.body.pw;

    User.canLogin(email, pw, function(err, user){
        if(err) {
            console.log(err);
            console.log('could not login');
            return res.status(403).send();
        }else{
            return res.json({
                token: jwt.sign(user.id, config.jwt.secret, {expiresIn: config.jwt.expiresInSeconds}),
                user: User.toMe(user)
            });
        }
    });
});

module.exports = router;
