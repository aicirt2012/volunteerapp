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

    if(!val.allValid())
        res.sendStatus(400);

    var eId = req.params.id;
    var data = {
        title: req.body.title,
        place: !!req.body.place ? val.blacklist(req.body.place, "<>;\"\'´") : null,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        nrhelpers: req.body.nrhelpers,
        description: !!req.body.description ? val.blacklist(req.body.description, "<>;\"\'´") : null,
        organization: req.body.organization
    };
    Log.info(req.user, Log.actions.EVENT_UPDATE, data);

    Event.findById(eId, function(err, e){
        if (err)
            res.sendStatus(500);
        else {
            e.title = data.title;
            e.place = data.place;
            e.startdate = data.startdate;
            e.enddate = data.enddate;
            e.nrhelpers = data.nrhelpers;
            e.description = data.description;
            e.organization = data.organization;
            console.log(JSON.stringify(e));
            e.save(function(err){

                findEvent(eId, req.user, function (err, event) {
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
        }
    });


});

router.post('/:id/message', function (req, res) {
    var eId = req.params.id;
    var msg = req.body.message;
    if (req.user.atLeastOrganizer()) {
        Log.info(req.user, Log.actions.EVENT_SENDMESSAGE, {eventId: eId, message: msg});
        Event.findWithHelperById(eId, function (err, event) {
            if (err)
                res.sendStatus(500);
            else {
                for (var i = 0; i < event.helpers.length; i++) {
                    var h = event.helpers[i];
                    mailer.send({
                        to: h.email,
                        subject: event.title,
                        text: msg
                    });
                }
                res.send()
            }
        });
    } else
        res.sendStatus(403);
});

router.delete('/:id', function (req, res) {
    if (req.user.atLeastOrganizer()) {
        var eId = req.params.id;
        Event.findWithHelperById(eId, function (err, event) {
            for (var i = 0; i < event.helpers.length; i++) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    mailer.sendToUser(
                        event.helpers[i].email,
                        event.helpers[i].name,
                        event.title + ' wurde abgesagt',
                        '<p>Das Event ' + '<b>' + event.title + '</b>' +
                        ' am ' + moment(event.startdate).format('DD.MM.YYYY') + ' von ' + moment(event.startdate).format('HH:mm') + ' Uhr bis ' + moment(event.enddate).format('DD.MM.YYYY') + ' ' + moment(event.enddate).format('HH:mm') + ' Uhr' +
                        ' wurde abgesagt und findet somit <u>nicht</u> statt.<br></p>'
                    );
                }
            }
        });

        Log.info(req.user, Log.actions.EVENT_DELETE, {eventId: eId});
        Event.delete(eId, function (err) {
            if (err)
                res.sendStatus(500);
            else
                res.sendStatus(200);
        });
    } else
        res.sendStatus(403);
});

router.post('/', function (req, res) {
    if (req.user.atLeastOrganizer()) {
        val.init();
        val.isTitle(req.body.title);
        val.isDate(req.body.startdate);
        val.isDate(req.body.enddate);
        val.isInt(JSON.stringify(req.body.nrhelpers), {min: 0});
        val.startBeforeEndDate(req.body.startdate, req.body.enddate);

        if (val.allValid()) {
            var e = {
                title: req.body.title,
                place: req.body.place ? val.blacklist(req.body.place, "<>;\"\'´") : null,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                nrhelpers: req.body.nrhelpers,
                description: req.body.description ? val.blacklist(req.body.description, "<>;\"\'´") : null,
                organization: req.body.organization
            };
            Log.info(req.user, Log.actions.EVENT_CREATE, e);
            Event.create(e, function (err) {
                var start = new Date(e.startdate);
                var end = new Date(e.enddate);

                User.findAvailableUsers(start, end, function (err, users) {
                    for (var i = 0; i < users.length; i++) {
                        mailer.sendToUser(
                            users[i].email,
                            users[i].name,
                            'Neues Event: ' + e.title,
                            '<p> Es wurde ein Event erstellt, dass Sie interessieren könnte.</p>' +
                            '<b>' + req.body.title + '</b>' +
                            '<p>Am ' + moment(start).format('DD.MM.YYYY') + ' von ' + moment(start).format('HH:mm') + ' Uhr bis ' + moment(end).format('DD.MM.YYYY') + ' ' + moment(end).format('HH:mm') + ' Uhr. <br>' +
                            'Ort: ' + req.body.place + '<br>' +
                            'Beschreibung: ' + e.description + '<br>' +
                            'Es werden ' + e.nrhelpers + ' Helfer benötigt.<br></p>'
                        );
                    }

                });
                res.sendStatus(201);
            });
        } else {
            res.sendStatus(400);
        }
    } else
        res.sendStatus(403);
});

router.get('/:id', function (req, res) {
    var eId = req.params.id;
    findEvent(eId, req.user, function (err, event) {
        if (err)
            res.sendStatus(500);
        else
            res.send(event);
    });
});

function findEvent(eId, user, cb) {
    
    Event.findOne({_id: eId}).populate('organization').populate('helpers').exec(function(err, e) {
        if (err)
            cb(err, null);
        else {
            e = JSON.parse(JSON.stringify(e));
            e.nrhelpersregistered = e.helpers.length;
            e.imregistered = false;
            for (var i = 0; i < e.helpers.length; i++)
                if (e.helpers[i].id == user.id)
                    e.imregistered = true;

            if (user.isHelper())
                delete e.helpers;
            cb(false, e);
        }
    });
}

router.post('/:eventId/helpers/:helperId', function (req, res) {
    var eventId = req.params.eventId;
    var helperId = req.params.helperId;
    if (req.user.atLeastOrganizer() || req.user.id == helperId) {
        Event.findById(eventId, function(err, e){
            if(err) throw err;
            if(e.helpers.indexOf(helperId) == -1) {
                e.helpers.push(helperId);
                e.save();
                findEvent(eventId, req.user, function (err, event) {
                    if (err)
                        res.sendStatus(500);
                    else {
                        res.json(event);
                        sendRegistrationMail(event, helperId);
                    }
                });
            }
        });
    } else
        res.sendStatus(403);

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
    if (req.user.atLeastOrganizer() || req.user.id == helperId) {
        Log.info(req.user, Log.actions.EVENT_UNREGISTER, {eventId: eventId, helperId: helperId});


        Event.findById(eventId, function(err, e) {
            if (err)
                cb(err, null);
            else {
                e.helpers.remove(helperId);
                e.save(function(){
                    findEvent(eventId, req.user, function (err, event) {
                        if (err)
                            res.sendStatus(500);
                        else {
                            res.json(event);
                        }
                    });
                });
            }
        });

    } else
        res.sendStatus(403);
});

router.get('/user/:id/', function (req, res) {
    var uId = req.params.id;
    Event.findByUserId(uId, function (err, events) {
        res.send(events);

    });
});


module.exports = router;
