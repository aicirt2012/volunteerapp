var express = require('express');
var router = express.Router();
var async = require('async');
var moment = require('moment');
var User = require('../../sc/User');
var Event = require('../../sc/Event');
var Log = require('../../sc/Log');
var mailer = require('../../util/mailer');


router.get('/', function(req, res) {
    Event.findAll(function(err, events){
        res.json(events);
    });
});

router.put('/:id', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
        Log.info(req.user, Log.actions.EVENT_UPDATE);
        var eId = req.params.id;
        var data = {
            title: req.body.title,
            place: req.body.place,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            nrhelpers: req.body.nrhelpers,
            description: req.body.description,
            important: req.body.important,
            organization: {id: req.body.organization}
        };

        Event.update(data, function(err){
            findEvent(eId, req.user, function(err, event){
                if(err)
                    res.sendStatus(500);
                else
                    res.json(event);
            });
        });
    }else
        res.sendStatus(403);
});

router.post('/:id/messsage', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
       // Log.info(req.user, Log.actions.EVENT_UPDATE);
        var eId = req.params.id;
        var data = {
            title: req.body.title,
            place: req.body.place,
        };


    }else
        res.sendStatus(403);
});

router.delete('/:id', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
        var eId = req.params.id;
        Event.delete(eId, function(err){
            if(err)
                res.sendStatus(500);
            else
                res.sendStatus(200);
        });
    }else
        res.sendStatus(403);
});

router.post('/', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
        var data = {
            title: req.body.title,
            place: req.body.place,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            nrhelpers: req.body.nrhelpers,
            description: req.body.description,
            important: req.body.important,
            organization: {id: req.body.organization}
        };
        Log.info(req.user, Log.actions.EVENT_CREATE, data);
        Event.save(data, function(){
            var start = new Date(req.body.startdate);
            var end = new Date(req.body.enddate);

            User.findAvailableUsers(start, end, function(err, users){
                for(var i=0; i<users.length; i++){
                    console.log('send email to'+users[i].email);
                    /*
                    mailer.send({
                        to: 'felix.michel@tum.de',
                        subject: 'Neues Event',
                        html: '<h3>Hallo Felix!</h3>' +
                        '<p> Es wurde ein Event erstellt, dass dich interessieren könnte.<p>' +
                        '<b>' + req.body.title + '</b>' +
                        '<p>Am ' + moment(start).format('DD.MM.YYYY') +' von ' + moment(start).format('HH:mm') + ' Uhr bis ' +moment(end).format('DD.MM.YYYY')+ ' '+ moment(end).format('HH:mm') + ' Uhr. <br>' +
                        'Ort: ' + req.body.place + '<br>'+
                        'Beschreibung: ' + req.body.description + '<br>'+
                        'Es werden ' + req.body.nrhelpers + ' Helfer benötigt.</p>' +
                        '<p>Viele Grüße, <br>'+
                        'dein VolunterApp Team</p>'
                    });*/
                }

            });
            res.send();
        });
    }else
        res.status(403);
});

router.get('/:id', function(req, res) {
    var eId = req.params.id;
    findEvent(eId, req.user, function(err, event){
        if(err)
            res.sendStatus(500);
        else
            res.json(event);
    });
});

function findEvent(eId, user, cb){
    Event.findWithHelperById(eId, function(err, event){
        if(err)
            cb(err, null);
        else{
            event.nrhelpersregistered = event.helpers.length;
            event.imregistered = false;
            for(var i=0; i< event.helpers.length; i++)
                if(event.helpers[i].id == user.id)
                    event.imregistered = true;

            if(User.isHelper(user.role))
                delete event.helpers;

            cb(false, event);
        }
    });
}

router.post('/:eventId/helpers/:helperId', function(req, res) {
    if(User.atLeastOrganizer(req.user.role ) || req.user.id == helperId){
        var eventId = req.params.eventId;
        var helperId = req.params.helperId;
        Event.isRegistered(eventId, helperId, function(err, isRegistered){
            if(!isRegistered) {
                Log.info(req.user, Log.actions.EVENT_REGISTER, {eventId: eventId, helperId: helperId});
                Event.addAttributeValue(eventId, 'helpers', {id: helperId}, function (err) {
                    if (err)
                        res.sendStatus(500);
                    else {
                        findEvent(eventId, req.user, function (err, event) {
                            if (err)
                                res.sendStatus(500);
                            else {
                                res.json(event);
                            }
                        });
                    }
                });
            }
        });
    }else
        res.sendStatus(403);

});

router.delete('/:eventId/helpers/:helperId', function(req, res) {
    if(User.atLeastOrganizer(req.user.role ) || req.user.id == helperId){
        var eventId = req.params.eventId;
        var helperId = req.params.helperId;
        Log.info(req.user, Log.actions.EVENT_UNREGISTER, {eventId: eventId, helperId: helperId});
        Event.delAttributeValue(eventId, 'helpers', {id: helperId}, function (err) {
            if (err)
                res.sendStatus(500);
            else
                findEvent(eventId, req.user, function (err, event) {
                    if (err)
                        res.sendStatus(500);
                    else {
                        res.json(event);
                    }
                });
        });
    }else
        res.sendStatus(403);
});
/*
router.post('/:eventId/message', function(req, res) {
    if(User.atLeastOrganizer(req.user.role ) || req.user.id == helperId){
        var eventId = req.params.eventId;
        //TODO implement send message


        /*
         mailer.send({
         to: 'felix.michel@tum.de',
         subject: 'Neues Event',
         html: '<h3>Hallo Felix!</h3>' +
         '<p> Es wurde ein Event erstellt, dass dich interessieren könnte.<p>' +
         '<b>' + req.body.title + '</b>' +
         '<p>Am ' + moment(start).format('DD.MM.YYYY') +' von ' + moment(start).format('HH:mm') + ' Uhr bis ' +moment(end).format('DD.MM.YYYY')+ ' '+ moment(end).format('HH:mm') + ' Uhr. <br>' +
         'Ort: ' + req.body.place + '<br>'+
         'Beschreibung: ' + req.body.description + '<br>'+
         'Es werden ' + req.body.nrhelpers + ' Helfer benötigt.</p>' +
         '<p>Viele Grüße, <br>'+
         'dein VolunterApp Team</p>'
         });

    }else
        res.sendStatus(403);
});
*/

router.get('/user/:id/', function(req, res){
    var uId = req.params.id;
    Event.findByUserId(uId, function(err, events){
        res.send(events);

    });
});


module.exports = router;
