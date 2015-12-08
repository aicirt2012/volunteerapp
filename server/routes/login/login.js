var express = require('express');
var router = express.Router();



router.post('/', function(req, res, next) {
    return res.status(403).send();
    console.log(req.body);
    if(!req.body || !req.body.email || !req.body.pw)
        return res.status(403).send();

    var email = req.body.email;
    var pw = req.body.pw;
    var expiresInSeconds = 86400; //TODO change expire time

    //console.log(email+" "+pw);
    res.json({hallo:3});
/*
    User.login(email, pw, function(err, user){
        if(!user) err = new Error("no result");
        if(err) {
            return res.status(403).send();
        }else {
            return res.json({
                token: jwt.sign(user._id, config.secret, {expiresIn: expiresInSeconds}),
                userid: user._id
            });
        }
    });
*/

});

module.exports = router;
