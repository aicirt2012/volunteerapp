var express = require('express');
var router = express.Router();
var Organization = require('../../sc/Organisation');
var User = require('../../sc/User');



router.get('/', function(req, res, next) {
    Organization.findAll(function(err, organizations){
        res.json(organizations);
    });
});

router.get('/:id', function(req, res, next) {
    var oId = req.params.id;
    if(User.atLeastTeam(req.user.role )){
        Organization.findById(oId, function(err, organization){
            if(err)
                res.sendStatus(500);
            else
                res.json(organization);
        });
    }else
        res.sendStatus(403);
});


module.exports = router;
