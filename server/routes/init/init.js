var express = require('express');
var router = express.Router();
var http = require('../../util/http');


/** init system */
router.get('/', function(req, res, next) {
    http.post('/workspace', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }else{
            console.log(error);
            console.log(response.statusCode, response.statusMessage);
            res.send('err');
        }
    });
});


module.exports = router;
