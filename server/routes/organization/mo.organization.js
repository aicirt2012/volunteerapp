var express = require('express');
var router = express.Router();
var async = require('async');
var Organization = require('../../model/mo/Organization');
var User = require('../../model/mo/User');
var Event = require('../../model/mo/Event');
var val = require('../../util/validator');
var Log = require('../../model/mo/Log');

router.get('/', function(req, res) {
    Organization.findAll(function(err, organizations){
        res.json(organizations);
    });
});

router.get('/:id', function(req, res) {
    if(req.user.atLeastTeam()){
        var oId = req.params.id;
        Organization.findById(oId, function(err, organization){
            if(err)
                res.sendStatus(500);
            else
                res.json(organization);
        });
    }else
        res.sendStatus(403);
});

router.post('/', function(req, res) {
    if(req.user.atLeastOrganizer()){
        val.init();
        val.isOrgaName(req.body.name);
        val.isZip(req.body.zip);
        val.isCity(req.body.city);
        val.isStreet(req.body.street);
        val.isPhone(req.body.tel, true);
        val.isEmail(req.body.email);

        if(val.allValid()){
            var org = {
                name: req.body.name,
                zip: req.body.zip,
                city: req.body.city,
                street: req.body.street,
                tel: req.body.tel,
                email: req.body.email
            };
            Log.info(req.user, Log.actions.ORGANIZATION_CREATE, org);
            Organization.save(org, function () {
                res.sendStatus(201);
            });
        }else{
            res.sendStatus(400);
        }
    }else
        res.sendStatus(403);
});

router.put('/:id', function(req, res) {
    if(req.user.atLeastOrganizer()){
        val.init();
        val.isOrgaName(req.body.name);
        val.isZip(req.body.zip);
        val.isCity(req.body.city);
        val.isStreet(req.body.street);
        val.isPhone(req.body.tel, true);
        val.isEmail(req.body.email);

        if(val.allValid()){
            var org = {
                name: req.body.name,
                zip: req.body.zip,
                city: req.body.city,
                street: req.body.street,
                tel: req.body.tel,
                email: req.body.email
            };
            Log.info(req.user, Log.actions.ORGANIZATION_UPDATE, org);
            Organization.update(req.params.id, org, function () {
                res.sendStatus(200);
            });
        }else{
            res.sendStatus(400);
        }
    }else
        res.sendStatus(403);
});

router.delete('/:id', function(req, res) {
    if(req.user.atLeastAdmin()){
        var oId = req.params.id;
        Log.info(req.user, Log.actions.ORGANIZATION_DELETE, {organizationId: oId});
        Event.findByOrganizationId(oId, function(err, events){
            if(err) {
                console.log(err);
            }else{
                async.forEach(events, function(e, cb){
                    Event.delete(e.id, function(err){
                        cb();
                    });
                }, function(err){
                    if(err)
                        res.sendStatus(500);
                    else
                        Organization.delete(oId, function(err){
                            res.send();
                        });
                });
            }
        });
    }else
        res.sendStatus(403);
});

module.exports = router;
