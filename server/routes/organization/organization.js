var express = require('express');
var router = express.Router();
var Organization = require('../../sc/Organisation');



router.get('/list', function(req, res, next) {

    Organization.findAll(function(err, organizations){
        res.json(organizations);
    });


});


module.exports = router;
