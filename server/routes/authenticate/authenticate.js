var express = require('express');
var router = express.Router();
var request = require('request');



router.get('/login', function(req, res, next) {
    request('http://www.google.com', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
        res.send('end');
    })
});

module.exports = router;
