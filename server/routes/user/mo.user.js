var express = require('express');
var router = express.Router();
var async = require('async');
var mailer = require('../../util/mailer');
var http = require('../../util/http');
var User = require('../../model/mo/User');
var val = require('../../util/validator');
var Log = require('../../model/mo/Log');
var Event = require('../../model/mo/Event');

router.get('/me', function (req, res) {
    res.json(req.user.toMe());
});

router.post('/', function (req, res) {
    if (req.user.atLeastOrganizer()) {
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
                        email: req.body.email.toLowerCase(),
                        pw: hashedPw,
                        notes: validatedNotes,
                        role: User.roles.HELPER,
                        availability: req.body.availability,
                        conditionsofuse: req.body.conditionsofuse
                    };
                    Log.info(req.user, Log.actions.USER_CREATE, data);
                    User.create(data, function () {
                        mailer.sendToUser(
                            data.email,
                            data.name,
                            'Willkommen bei der Volunteer App',
                            '<p>Es wurde ein Volunteer App Account für Sie erstellt. <br/>' +
                            'Ihr Passwort lautet: ' + plainPw + '<br/>' +
                            'Melden Sie sich mit Ihrer Email Adresse und Ihrem Passwort über folgenden Link an: <br/>' +
                            '<a href="http://volunteers.in.tum.de">volunteers.in.tum.de</a></p>'
                        );
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
    if(!req.user.atLeastTeam())
        return res.sendStatus(403);

    User.find(function (err, users) {
        res.json(users);
    });
});

router.get('/:id', function (req, res) {
    if(!req.user.atLeastTeam())
        return res.status(403).send();

    User.findById(req.params.id, function (err, user) {
        if (err)
            res.status(500).send();
        else
            res.json(user);
    });
});

router.put('/:id', function (req, res) {
    if(!req.user.atLeastOrganizer())
        return res.status(403).send();

    val.init();
    val.isEmail(req.body.email);
    val.isName(req.body.name);
    val.isPhone(req.body.tel, false);
    val.isPhone(req.body.mobil, false);
    val.isGender(req.body.gender);
    val.isAvailability(req.body.availability);

    if(!val.allValid())
        return res.status(400).send();


    var uId = req.params.id;
    var data = {
        gender: req.body.gender,
        name: req.body.name,
        tel: req.body.tel,
        mobil: req.body.mobil,
        email: req.body.email.toLowerCase(),
        notes: req.body.notes ? val.blacklist(req.body.notes, "<>;\"\'´") : null,
        availability: req.body.availability
    };

    User.findById(uId, function(err, u){
        u.gender = data.gender;
        u.name = data.name;
        u.tel = data.tel;
        u.mobil = data.mobil;
        u.email = data.email;
        u.notes = data.notes;
        u.availability = data.availability;
        u.save(function(err){
            if(err)
                return res.status(500).send();
                //TODO check if email cause error
            Log.info(req.user, Log.actions.USER_UPDATE, data);
            res.send();
        });
    });


});

router.delete('/:id', function (req, res) {
    if (req.user.atLeastAdmin()) {
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
    if (req.user.atLeastOrganizer()) {
        User.findById(req.params.id, function (err, u){
            if (err) {
                res.status(500).send(err);
            } else {
                u.picture = req.body.picture;
                u.save(function () {
                    res.send();
                });
            }
        });
    } else
        res.sendStatus(403);
});

router.post('/:id/resetpw', function (req, res) {
    if (req.user.atLeastOrganizer()) {
        var uId = req.params.id;
        var plainPw = User.generatePw();
        var hashedPw = User.hashPw(plainPw);
        User.findById(uId, function (err, u) {
            if (err)
                res.sendStatus(500);
            else
                u.pw = hashedPw;
                u.save(function (err) {
                    Log.info(req.user, Log.actions.USER_RESETPW, {userId: uId});
                    mailer.sendToUser(u.email, u.name,
                        'Ihr Passwort wurde zurückgesetzt!',
                        '<p>Ihr Passwort wurde erfolgreich zurück gesetzt. <br/>' +
                        'Ihr neues Passwort lautet: ' + plainPw + '<br/></p>'
                    );
                    res.send();
                });
        });
    } else
        res.sendStatus(403);

});

router.put('/:id/role', function (req, res, next) {
    if(!req.user.atLeastOrganizer()){ res.sendStatus(403); return;}

    User.findById(req.params.id, function(err, u) {
        console.log(err, u);
        u.role = req.body.role;

        //u.validateSync([]);
        //res.sendStatus(400);

        u.save(function(err){
            //Log.info(req.user, Log.actions.USER_ROLECHANGE, u);
            console.log(err);
            res.send();
        });
    });

});


module.exports = router;
