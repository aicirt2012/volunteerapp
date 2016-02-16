var express = require('express');
var router = express.Router();
var async = require('async');
var User = require('../../sc/User');
var Event = require('../../sc/Event');
var mailer = require('../../util/mailer');


router.get('/', function(req, res) {
    console.log('get all Events');
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
        important: req.body.important,
        organization: req.body.organization
    }, function(){
        var start = new Date(req.body.startdate);
        var sDate = start.getDate() + '.' + start.getMonth()+1 + '.' + start.getFullYear();
        var sTime = start.getHours() + ':' + start.getMinutes();
        var end = new Date(req.body.enddate);
        var eTime = end.getHours() + ':' + end.getMinutes();
        mailer.send({
            to: 'felix.michel@tum.de',
            subject: 'Neues Event',
            html: '<h3>Hallo Felix!</h3>' +
            '<p> Es wurde ein Event erstellt, dass dich interessieren könnte.<p>' +
            '<b>' + req.body.title + '</b>' +
            '<p>Am ' + sDate +' von ' + sTime + ' Uhr bis ' + eTime + ' Uhr. <br>' +
            'Ort: ' + req.body.place + '<br>'+
            'Beschreibung: ' + req.body.description + '<br>'+
            'Es werden ' + req.body.nrhelpers + ' Helfer benötigt.</p>' +
            '<p>Viele Grüße, <br>'+
            'dein VolunterApp Team</p>'
        });
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
    console.log('get Events with id '+eId);
    Event.findById(eId, function(err, event){
        if(err)
            res.status(500).send();
        else{
            var helpers = [];
            async.forEach(event.helpers, function(helper, cb){
                User.findById(helper.id, function(err, user){
                    helpers.push({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        tel: user.tel
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
