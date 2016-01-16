var express = require('express');
var router = express.Router();
var User = require('../../sc/User');
var Event = require('../../sc/Event');
var EventHelper = require('../../sc/EventHelper');
var mailer = require('../../util/mailer');

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
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        anzhelper: req.body.anzhelper,
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
        else
            res.json(event);
    });

});

router.post('/:id/register', function(req, res, next) {
    console.log('register for event');
    var eventId = req.params.id;
    var helperId = req.body.helperId;
    var eventId = req.body.eventId;

    EventHelper.save({
        helper: helperId,
        event: eventId,
        registered: new Date().toDateString()
    }, function(){
        res.send();
    });

});

router.post('/:id/unregister', function(req, res, next) {
    console.log('unregister for event');
    res.send();
});







module.exports = router;
