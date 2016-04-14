var express = require('express');
var router = express.Router();
var async = require('async');
var mailer = require('../../util/mailer');
var http = require('../../util/http');
var User = require('../../sc/User');
var val = require('../../util/validator');
var Log = require('../../sc/Log');
var Event = require('../../sc/Event');

router.get('/me', function (req, res) {
    res.json(User.toMe(req.user));
});

router.post('/', function (req, res) {
    if (User.atLeastOrganizer(req.user.role)) {
        val.init();
        val.isEmail(req.body.email);
        val.isName(req.body.name);
        val.isPhone(req.body.tel, false);
        val.isPhone(req.body.mobil, false);
        val.isGender(req.body.gender);
        val.isAvailability(req.body.availability);
        val.conditionsofuseIsTrue(req.body.conditionsofuse);

        if (val.allValid()) {
            User.exists(req.body.email, '', function (err) {
                if (err) {
                    // 409 == Conflict
                    res.sendStatus(409);
                } else {
                    var plainPw = User.generatePw();
                    var hashedPw = User.hashPw(plainPw);
                    if (req.body.notes)
                        var validatedNotes = val.blacklist(req.body.notes, "<>;\"\'´");
                    var data = {
                        gender: req.body.gender,
                        name: req.body.name,
                        tel: req.body.tel,
                        mobil: req.body.mobil,
                        email: req.body.email,
                        pw: hashedPw,
                        notes: validatedNotes,
                        role: User.roles.HELPER,
                        availability: req.body.availability,
                        conditionsofuse: req.body.conditionsofuse
                    };
                    Log.info(req.user, Log.actions.USER_CREATE, data);
                    User.save(data, function () {
                        mailer.send({
                            to: data.email,
                            subject: 'Willkommen bei der Volunteer App',
                            html: '<h3>Hallo ' + data.name + '!</h3>' +
                            '<p>Es wurde ein Volunteer App Account für Sie erstellt. <br/>' +
                            'Ihr Passwort lautet: "' + plainPw + '"!<br/>' +
                            'Melden Sie sich mit Ihrer Email Adresse und Ihrem Passwort über folgenden Link an: <br/>' +
                            '<a href="http://volunteers.in.tum.de">volunteers.in.tum.de</a></p>' +
                            '<p>Viele Grüße, <br/>' +
                            'Ihr Volunteer App Team</p>'
                        });
                        res.send();
                    });
                }
            });
        } else {
            res.sendStatus(400);
        }
    } else
        res.sendStatus(403);
});

router.get('/', function (req, res) {
    if (User.atLeastTeam(req.user.role)) {
        User.findAll(function (err, users) {
            res.json(users);
        });
    } else
        res.sendStatus(403);
});

router.get('/:id', function (req, res) {
    if (User.atLeastTeam(req.user.role)) {
        var uId = req.params.id;
        User.findById(uId, function (err, user) {
            if (err)
                res.sendStatus(500);
            else
                res.json(user);
        });
    } else
        res.sendStatus(403);
});

router.put('/:id', function (req, res) {
    if (User.atLeastOrganizer(req.user.role)) {
        val.init();
        val.isEmail(req.body.email);
        val.isName(req.body.name);
        val.isPhone(req.body.tel, false);
        val.isPhone(req.body.mobil, false);
        val.isGender(req.body.gender);
        val.isAvailability(req.body.availability);

        if (val.allValid()) {
            try {
                var uId = req.params.id;
                var data = {
                    gender: req.body.gender,
                    name: req.body.name,
                    tel: req.body.tel,
                    mobil: req.body.mobil,
                    email: req.body.email,
                    notes: req.body.notes ? val.blacklist(req.body.notes, "<>;\"\'´") : null,
                    availability: req.body.availability
                };
                Log.info(req.user, Log.actions.USER_UPDATE, data);
                User.exists(req.body.email, uId, function (err) {
                    if (err) {
                        res.sendStatus(409);
                    } else {
                        User.update(uId, data, function () {
                            console.log(JSON.stringify(arguments, null, 2));
                            res.send();
                        });
                    }
                });
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', function (req, res) {
    if (User.atLeastAdmin(req.user.role)) {
        var uId = req.params.id;
        Log.info(req.user, Log.actions.USER_DELETE, {userId: uId});
        Event.findByUserId(uId, function (err, events) {
            if (err) {
                console.log(err);
            } else {
                async.forEach(events, function (e, cb) {
                    Event.delAttributeValue(e.id, 'helpers', {id: uId}, function (err) {
                        cb();
                    });
                }, function (err) {
                    if (err)
                        res.sendStatus(500);
                    else
                        User.delete(uId, function (err) {
                            res.send();
                        });
                });
            }
        });
    } else
        res.sendStatus(403);
});

router.put('/:id/picture', function (req, res) {
    if (User.atLeastOrganizer(req.user.role)) {
        var uId = req.params.id;
        User.update(uId, {picture: req.body.picture}, function (err, updated) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send();
            }
        });
    } else
        res.sendStatus(403);
});

router.post('/:id/resetpw', function (req, res) {
    if (User.atLeastOrganizer(req.user.role)) {
        var uId = req.params.id;
        var plainPw = User.generatePw();
        var hashedPw = User.hashPw(plainPw);
        Log.info(req.user, Log.actions.USER_RESETPW, {userId: uId});
        User.findById(uId, function (err, user) {
            if (err)
                res.sendStatus(500);
            else
                User.update(uId, {
                    pw: hashedPw
                }, function () {
                    mailer.send({
                        to: user.email,
                        subject: 'Ihr Passwort wurde zurückgesetzt!',
                        html: '<h3>Hallo ' + user.name + '!</h3>' +
                        '<p>Ihr Passwort wurde erfolgreich zurück gesetzt. <br/>' +
                        'Ihr neues Passwort lautet: "' + plainPw + '"!<br/></p>' +
                        '<p>Viele Grüße, <br/>' +
                        'Ihr Volunteer App Team</p>'
                    });
                    res.send();
                });
        });
    } else
        res.sendStatus(403);

});

router.put('/:id/role', function (req, res) {
    if (User.atLeastOrganizer(req.user.role)) {
        val.init();
        val.isRole(req.body.role);

        if (val.allValid()) {
            var uId = req.params.id;
            var data = {role: req.body.role};
            Log.info(req.user, Log.actions.USER_ROLECHANGE, data);
            User.update(uId, data, function () {
                res.send();
            });
        } else {
            res.sendStatus(400);
        }
    } else
        res.sendStatus(403);
});


module.exports = router;
