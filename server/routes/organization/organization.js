var express = require('express');
var router = express.Router();
var Organization = require('../../sc/Organisation');



router.get('/list', function(req, res, next) {

    Organization.findAll(function(err, organizations){
        res.json(organizations);
    });


});

router.get('/:id', function(req, res, next) {
    var oId = req.params.id;
    Organization.findById(oId, function(err, organization){
        if(err)
            res.status(500).send();
        else
            res.json(organization);
    });
});


module.exports = router;
