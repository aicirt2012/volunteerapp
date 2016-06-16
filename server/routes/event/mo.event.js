var express = require('express');
var router = express.Router();
var async = require('async');
var moment = require('moment');
var User = require('../../model/mo/User');
var Event = require('../../model/mo/Event');
var Log = require('../../model/mo/Log');
var mailer = require('../../util/mailer');
var val = require('../../util/validator');
var mongoose = require('mongoose');


router.get('/', function (req, res) {
    Event.find(function (err, events) {
        res.json(events);
    });
});

router.put('/:id', function (req, res) {
    if(!req.user.atLeastOrganizer())
        return res.send(403);

    val.init();
    val.isTitle(req.body.title);
    val.isDate(req.body.startdate);
    val.isDate(req.body.enddate);
    val.isInt(JSON.stringify(req.body.nrhelpers), {min: 0});
    val.startBeforeEndDate(req.body.startdate, req.body.enddate);
    val.isSeriesEventFlag(req.body.isseries);
    val.isHighPriorityFlag(req.body.highpriority);

    if(!val.allValid())
        return res.sendStatus(400);

    var eId = req.params.id;
    var data = {
        title: req.body.title,
        place: !!req.body.place ? val.blacklist(req.body.place, "<>;\"\'´") : null,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        nrhelpers: req.body.nrhelpers,
        description: !!req.body.description ? val.blacklist(req.body.description, "<>;\"\'´") : null,
        organization: req.body.organization,
        isseries: req.body.isseries,
        highpriority: req.body.highpriority
    };
    Log.info(req.user, Log.actions.EVENT_UPDATE, data);

    Event.findById(eId, function(err, e){
        if(err)
            return res.sendStatus(500);

        e.title = data.title;
        e.place = data.place;
        e.startdate = data.startdate;
        e.enddate = data.enddate;
        e.nrhelpers = data.nrhelpers;
        e.description = data.description;
        e.organization = data.organization;
        e.isseries = data.isseries;
        console.log(JSON.stringify(e));
        e.save(function(err){

            Event.findByIdPopulated(eId, req.user, function (err, event) {
                if (err)
                    res.sendStatus(500);
                else {
                    for (var i = 0; i < event.helpers.length; i++) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            mailer.sendToUser(
                                event.helpers[i].email,
                                event.helpers[i].name,
                                event.title + ' wurde geändert',
                                '<p>Es gab Änderungen bezüglich eines Events. <br/>' +
                                'Das Event <b>' + event.title + '</b>' +
                                ' findet am ' + moment(event.startdate).format('DD.MM.YYYY') + ' von ' + moment(event.startdate).format('HH:mm') + ' Uhr bis ' + moment(event.enddate).format('DD.MM.YYYY') + ' ' + moment(event.enddate).format('HH:mm') + ' Uhr' +
                                ' statt.<br/></p>' +
                                'Um alle Informationen über das Event einzusehen klicken Sie auf folgenden Link: ' +
                                '<a href="http://volunteers.in.tum.de/#/event/' + event.id + '">http://volunteers.in.tum.de/#/event/' + event.id + '</a>'
                            );
                        }
                    }
                    res.json(event);
                }
            });

        });

    });


});

router.post('/:id/message', function (req, res) {
    if(!req.user.atLeastOrganizer())
        return res.status(403).send();

    var eId = req.params.id;
    var msg = req.body.message;

    Event.findByIdPopulated(eId, req.user, function (err, e) {
        if(err)
            return res.status(500).send();

        e.helpers.forEach(function(h){
            mailer.send({
                to: h.email,
                subject: e.title,
                text: msg
            });
        });

        Log.info(req.user, Log.actions.EVENT_SENDMESSAGE, {eventId: eId, message: msg});
        res.send();
    });
});


router.delete('/:id', function (req, res) {
    if(!req.user.atLeastOrganizer())
        return res.status(403).send();

    var eId = req.params.id;
    Event.findByIdPopulated(eId, req.user, function (err, e) {
        if(err)
            return res.status(500).send();
        e.helpers.forEach(function(h){
            mailer.sendToUser(
                h.email,
                h.name,
                e.title + ' wurde abgesagt',
                '<p>Das Event ' + '<b>' + e.title + '</b>' +
                ' am ' + moment(e.startdate).format('DD.MM.YYYY') + ' von ' + moment(e.startdate).format('HH:mm') + ' Uhr bis ' + moment(e.enddate).format('DD.MM.YYYY') + ' ' + moment(e.enddate).format('HH:mm') + ' Uhr' +
                ' wurde abgesagt und findet somit <u>nicht</u> statt.<br></p>'
            );
        });
        Event.findById(eId, function(err, e){
            if(err)
                return res.status(500).send();
            e.remove();
            Log.info(req.user, Log.actions.EVENT_DELETE, {eventId: eId});
            res.send();
        });
    });
});

router.post('/', function (req, res) {
    if(!req.user.atLeastOrganizer())
        return res.status(403).send();

    val.init();
    val.isTitle(req.body.title);
    val.isDate(req.body.startdate);
    val.isDate(req.body.enddate);
    val.isInt(JSON.stringify(req.body.nrhelpers), {min: 0});
    val.startBeforeEndDate(req.body.startdate, req.body.enddate);
    val.isSeriesEventFlag(req.body.isseries);
    val.isHighPriorityFlag(req.body.highpriority)

    if(!val.allValid())
        return res.status(400).send();

    var e = {
        title: req.body.title,
        place: req.body.place ? val.blacklist(req.body.place, "<>;\"\'´") : null,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        nrhelpers: req.body.nrhelpers,
        description: req.body.description ? val.blacklist(req.body.description, "<>;\"\'´") : null,
        organization: req.body.organization,
        isseries: req.body.isseries,
        highpriority: req.body.highpriority
    };
    Log.info(req.user, Log.actions.EVENT_CREATE, e);
    Event.create(e, function (err) {
        var start = new Date(e.startdate);
        var end = new Date(e.enddate);

        User.findAvailableUsers(start, end, function (err, users) {
            users.forEach(function(u){
                mailer.sendToUser(
                    u.email,
                    u.name,
                    'Neues Event: ' + e.title,
                    '<p> Es wurde ein Event erstellt, dass Sie interessieren könnte.</p>' +
                    '<b>' + req.body.title + '</b>' +
                    '<p>Am ' + moment(start).format('DD.MM.YYYY') + ' von ' + moment(start).format('HH:mm') + ' Uhr bis ' + moment(end).format('DD.MM.YYYY') + ' ' + moment(end).format('HH:mm') + ' Uhr. <br>' +
                    'Ort: ' + req.body.place + '<br>' +
                    'Beschreibung: ' + e.description + '<br>' +
                    'Es werden ' + e.nrhelpers + ' Helfer benötigt.<br></p>'
                );
            });
        });
        res.status(201).send();
    });


});


router.get('/:id', function (req, res) {
    Event.findByIdPopulated(req.params.id, req.user, function (err, event) {
        if(err)
            res.status(500).send();
        else
            res.send(event);
    });
});



router.post('/:eventId/helpers/:helperId', function (req, res) {
    var eventId = req.params.eventId;
    var helperId = req.params.helperId;

    if (!(req.user.atLeastOrganizer() || req.user.id == helperId))
        return res.status(403).send();

    Event.findById(eventId, function(err, e){
        if(err) throw err;
        if(e.helpers.indexOf(helperId) == -1) {
            e.helpers.push(helperId);
            e.save();
            Event.findByIdPopulated(eventId, req.user, function (err, event) {
                if (err)
                    res.sendStatus(500);
                else {
                    res.json(event);
                    sendRegistrationMail(event, helperId);
                }
            });
        }
    });

    function sendRegistrationMail(event, helperId) {
        User.findById(helperId, function (err, helper) {
            if (err) {

            } else {
                var body;
                if (req.user.id === helperId) {
                    body =
                        '<p>Sie haben sich für ein Event angemeldet:</p>' +
                        '<b>' + event.title + '</b>' +
                        '<p>Am ' + moment(event.startdate).format('DD.MM.YYYY') + ' von ' + moment(event.startdate).format('HH:mm') + ' Uhr bis ' + moment(event.enddate).format('DD.MM.YYYY') + ' ' + moment(event.enddate).format('HH:mm') + ' Uhr. <br>' +
                        'Ort: ' + event.place + '<br>' +
                        'Beschreibung: ' + event.description + '<br></p>';
                } else {
                    body =
                        '<p>Sie wurden für ein Event angemeldet:</p>' +
                        '<b>' + event.title + '</b>' +
                        '<p>Am ' + moment(event.startdate).format('DD.MM.YYYY') + ' von ' + moment(event.startdate).format('HH:mm') + ' Uhr bis ' + moment(event.enddate).format('DD.MM.YYYY') + ' ' + moment(event.enddate).format('HH:mm') + ' Uhr. <br>' +
                        'Ort: ' + event.place + '<br>' +
                        'Beschreibung: ' + event.description + '<br>' +
                        'Es werden ' + event.nrhelpers + ' Helfer benötigt.<br></p>';
                }

                mailer.sendToUser(
                    helper.email,
                    helper.name,
                    'Angemeldet für: ' + event.title,
                    body
                );
            }
        });
    }
});

router.delete('/:eventId/helpers/:helperId', function (req, res) {
    var eventId = req.params.eventId;
    var helperId = req.params.helperId;
    if(!(req.user.atLeastOrganizer() || req.user.id == helperId))
        return res.status(403).send();


    Event.findById(eventId, function(err, e) {
        if(err)
            return res.status(500).send()

        e.helpers.pull(helperId);
        e.save(function(){
            Log.info(req.user, Log.actions.EVENT_UNREGISTER, {eventId: eventId, helperId: helperId});
            Event.findByIdPopulated(eventId, req.user, function (err, event) {
                if(err)
                    res.status(500).send();
                else
                    res.json(event);
            });
        });
    });
});


router.get('/user/:id/', function (req, res) {
    Event.findByUserId(req.params.id, function (err, events) {
        if(err)
            return res.status(500).send();
        res.send(events);
    });
});


module.exports = router;
