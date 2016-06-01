var express = require('express');
var router = express.Router();
var async = require('async');
var Organization = require('../../model/mo/Organization');
var User = require('../../model/mo/User');
var Event = require('../../model/mo/Event');
var val = require('../../util/validator');
var Log = require('../../model/mo/Log');

router.get('/', function(req, res) {
    Organization.find(function(err, organizations){
        res.json(organizations);
    });
});

router.get('/:id', function(req, res) {
    if(!req.user.atLeastTeam())
        return res.status(403).send();

    Organization.findById(req.params.id, function(err, o){
        if(err)
            return res.status(500).send();
        res.json(o);
    });
});

router.post('/', function(req, res) {
    if(!req.user.atLeastOrganizer())
        return res.status(403).send();

    val.init();
    val.isOrgaName(req.body.name);
    val.isZip(req.body.zip);
    val.isCity(req.body.city);
    val.isStreet(req.body.street);
    val.isPhone(req.body.tel, true);
    val.isEmail(req.body.email);

    if(!val.allValid())
        return res.status(400).send();

    Organization.create({
        name: req.body.name,
        zip: req.body.zip,
        city: req.body.city,
        street: req.body.street,
        tel: req.body.tel,
        email: req.body.email
    }, function (o) {
        Log.info(req.user, Log.actions.ORGANIZATION_CREATE, o);
        res.status(201).send();
    });

});

router.put('/:id', function(req, res) {
    if(!req.user.atLeastOrganizer())
        return res.status(403).send();

    val.init();
    val.isOrgaName(req.body.name);
    val.isZip(req.body.zip);
    val.isCity(req.body.city);
    val.isStreet(req.body.street);
    val.isPhone(req.body.tel, true);
    val.isEmail(req.body.email);

    if(!val.allValid())
        return res.status(400).send();

    Organization.findById(req.params.id, function(err, o){
        o.name = req.body.name;
        o.zip = req.body.zip;
        o.city = req.body.city;
        o.street = req.body.street;
        o.tel = req.body.tel;
        o.email = req.body.email;
        o.save(function(err){
            if(err)
                return res.status(500).send();
            Log.info(req.user, Log.actions.ORGANIZATION_UPDATE, o);
            res.send();
        });
    });

});

router.delete('/:id', function(req, res) {
    if(!req.user.atLeastAdmin())
        return res.status(403).send();

    var oId = req.params.id;
    Log.info(req.user, Log.actions.ORGANIZATION_DELETE, {organizationId: oId});
    Event.findByOrganizationId(oId, function(err, events){
        if(err)
            return res.status(500).send();

        async.forEach(events, function(e, cb){
            e.remove(function(err){
                cb();
            });

        }, function(err){
            if(err)
                return res.status(500).send();

            Organization.findById(oId, function(err, o){
                o.remove(function(err){
                    res.send();
                });
            });
        });

    });
});

module.exports = router;
