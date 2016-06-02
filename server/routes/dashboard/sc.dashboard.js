var express = require('express');
var router = express.Router();
var async = require('async');
var Log = require('../../model/sc/Log');
var User = require('../../model/sc/User');
var Event = require('../../model/sc/Event');
var Organisation = require('../../model/sc/Organisation');


router.get('/log', function(req, res) {
    if(User.atLeastAdmin(req.user.role)){
        Log.findAll(function(err, logs){
            res.json(logs);
        });
    }else
        res.sendStatus(403);
});

router.get('/eventreport', function(req, res) {
    if(!User.atLeastAdmin(req.user.role))
        return res.status(403).send();

    Event.find2('find(event).select({id:id, startdate:startdate, enddate:enddate, helpers:helpers.select({id:id, name:name}), organization: {name: organization.name, zip:organization.zip, street:organization.street, email:organization.email, tel:organization.tel}})',function(err, events){
        res.send(events);
    });
});


router.get('/overview', function(req, res) {
    if(!User.atLeastAdmin(req.user.role))
        return res.status(403).send();

    var result = {count:{}};
    var asyncTasks = [];
    asyncTasks.push(function(cb){
        User.find2('find(user).count()',function(err, ucount){
            result.count.user = ucount;
            cb();
        });
    });
    asyncTasks.push(function(cb){
        Event.find2('find(event).count()',function(err, ecount){
            result.count.event = ecount;
            cb();
        });
    });
    asyncTasks.push(function(cb){
        Organisation.find2('find(organization).count()',function(err, ocount){
            result.count.organisation = ocount;
            cb();
        });
    });
    async.series(asyncTasks, function(err){
        res.json(result);
    });


});



module.exports = router;
