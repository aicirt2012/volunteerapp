var express = require('express');
var router = express.Router();
var async = require('async');
var User = require('../../sc/User');
var Event = require('../../sc/Event');
var EventHelper = require('../../sc/EventHelper');
var mailer = require('../../util/mailer');
var SocioCortex = require('../../sc/SocioCortex');

router.get('/attibutes', function(req, res) {
    /*
    SocioCortex.attribute.findByEntityAndAttributeName('1xpbrfl4uqcs5', 'helpers', function(err, events){
        console.log(events);
        res.json(events);
    });
    */

    SocioCortex.attribute.value.create('1xpbrfl4uqcs5', 'helpers', 'e0d0z60fjjyh', function(err){
        //onsole.log(events);
        res.json();
    });
});

router.get('/list', function(req, res) {
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
                if(helper && Object.keys(helper).length > 0)
                    User.findById(helper.helperid, function(err, user){
                        helpers.push({
                            id: user.id,
                            name: user.name,
                            date: helper.date
                        });
                        cb();
                    });
                else
                    cb();
            }, function(err){
                event.helpers = helpers;
                res.json(event);
            });
        }
    });

});

router.post('/:id/register', function(req, res) {
    var eventId = req.params.id;
    var helperId = req.body.helperId;
    console.log(eventId, helperId);
    Event.addAttributeValue(eventId, 'helpers', {helperid: helperId, date: new Date().toISOString()}, function(err){
        res.send();
    });
});

router.post('/:id/unregister', function(req, res) {
    console.log('unregister for event');
    res.send();
});







module.exports = router;
