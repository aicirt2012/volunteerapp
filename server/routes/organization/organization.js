var express = require('express');
var router = express.Router();
var Organization = require('../../sc/Organisation');
var User = require('../../sc/User');
var Event = require('../../sc/Event');
var val = require('../../util/validator');
var Log = require('../../sc/Log');

router.get('/', function(req, res) {
    Organization.findAll(function(err, organizations){
        res.json(organizations);
    });
});

router.get('/:id', function(req, res) {
    if(User.atLeastTeam(req.user.role )){
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
    if(User.atLeastOrganizer(req.user.role )){
        val.isName(req.body.name);
        val.isZip(req.body.zip);
        val.isCity(req.body.city);
        val.isStreet(req.body.street);
        val.isPhone(req.body.tel, true);
        val.isEmail(req.body.email);

        if(val.allValid()){
            val.reset();
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
                res.send();
            });
        }else{
            val.reset();
            res.sendStatus(400);
        }
    }else
        res.sendStatus(403);
});

router.put('/:id', function(req, res) {
    if(User.atLeastOrganizer(req.user.role )){
        val.isName(req.body.name);
        val.isZip(req.body.zip);
        val.isCity(req.body.city);
        val.isStreet(req.body.street);
        val.isPhone(req.body.tel, true);
        val.isEmail(req.body.email);

        if(val.allValid()){
            val.reset();
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
                res.send();
            });
        }else{
            val.reset();
            res.sendStatus(400);
        }
    }else
        res.sendStatus(403);
});

router.delete('/:id', function(req, res) {
    console.log('Organization deleted');
});

module.exports = router;
