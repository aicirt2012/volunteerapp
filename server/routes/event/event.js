var express = require('express');
var router = express.Router();
var async = require('async');
var User = require('../../sc/User');
var Event = require('../../sc/Event');
var EventHelper = require('../../sc/EventHelper');
var mailer = require('../../util/mailer');
var SocioCortex = require('../../sc/SocioCortex');


router.get('/', function(req, res) {
    Event.findAll(function(err, events){
        res.json(events);
    });
});

router.put('/', function(req, res) {
    console.log('update event');
    res.send();
});

router.post('/', function(req, res) {
    Event.save({
        title: req.body.title,
        place: req.body.place,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        nrhelpers: req.body.nrhelpers,
        description: req.body.description,
        important: req.body.important
    }, function(){
        //TODO implened query to find users
        /*
        User.findAvailableUsers(startdate, starttime, endtime, endate, function(users){
            for(var i=0; i<users.length; i++){

            }
            mailer.send({to: '', subject: '', html: 'Hallo '});
        });*/
        res.send();
    });

});

router.get('/:id', function(req, res) {
    var eId = req.params.id;
    Event.findById(eId, function(err, event){
        if(err)
            res.status(500).send();
        else{
            var helpers = [];
            async.forEach(event.helpers, function(helper, cb){
                User.findById(helper.id, function(err, user){
                    helpers.push({
                        id: user.id,
                        name: user.name
                    });
                    cb();
                });
            }, function(err){
                event.helpers = helpers;
                res.json(event);
            });
        }
    });

});

router.post('/:eventId/helpers/:helperId', function(req, res) {
    var eventId = req.params.eventId;
    var helperId = req.params.helperId;
    Event.addAttributeValue(eventId, 'helpers', {id: helperId}, function(err){
        res.send();
    });
});

router.delete('/:eventId/helpers/:helperId', function(req, res) {
    var eventId = req.params.eventId;
    var helperId = req.params.helperId;
    Event.delAttributeValue(eventId, 'helpers', {id: helperId}, function(err){
        res.send();
    });
});







module.exports = router;
