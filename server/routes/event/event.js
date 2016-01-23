var express = require('express');
var router = express.Router();
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
        else {
            /*EventHelper.findByEvent(eId, function (err, eventhelpers) {
                if (err)
                    res.status(500).send();
                else {
                    var helpers = "[";
                    //first element of json array
                    if(eventhelpers[0] !== null) {
                        helpers = helpers + "{id: " + eventhelpers[0].id
                            + ", name: " + eventhelpers[0].helper.name
                            + ", date: " + eventhelpers[0].registered + "}";
                    }

                    //following elements of json array, so they can be separated by comma
                    for(var i = 1; i < eventhelpers.length; i++) {
                        var help = eventhelpers[i];
                        helpers = helpers
                                + ",{id: "+ help.id
                                + ", name: "+ help.helper.name
                                + ", date: " + help.registered + "}";
                    }
                    helpers = helpers + ']';
                    event.helpers = helpers;
                }
            });*/
            event.helpers = [{name: 'Felix Michel', date: '20.01.2016'}, {name: 'Niklas', date: '21.01.2016'}, {name: 'Albert', date: '22.01.2016'}];
            res.json(event);
        }
    });

});

router.post('/:id/register', function(req, res) {
    var eventId = req.params.id;
    var helperId = req.body.helperId;
    console.log(eventId, helperId);

    SocioCortex.attribute.value.create(eventId, 'helpers', helperId, function(err){
        //onsole.log(events);
        res.send();
    });

});

router.post('/:id/unregister', function(req, res) {
    console.log('unregister for event');
    res.send();
});







module.exports = router;
