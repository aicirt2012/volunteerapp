var express = require('express');
var router = express.Router();
var async = require('async');
var fs = require('fs');
var config = require('../../../config');
var SocioCortex = require('../../sc/SocioCortex');
var User = require('../../sc/User');
var Organization = require('../../sc/Organisation');
var Event = require('../../sc/Event');

router.post('/', function(req, res, next) {
    var asyncTasks = [];

    // Create Schema
    asyncTasks.push(function(cb){
        SocioCortex.workspace.delete(config.sc.workspaceId, cb);
    });
    asyncTasks.push(function(cb){
        SocioCortex.workspace.create(config.sc.workspaceId, cb);
    });
    asyncTasks.push(function(cb){
        Organization.schema.create(cb);
    });
    asyncTasks.push(function(cb){
        User.schema.create(cb);
    });
    asyncTasks.push(function(cb){
        Event.schema.create(cb);
    });


    // Initialize with Testdata
    asyncTasks.push(function(cb){
        var users = JSON.parse(fs.readFileSync(__dirname + '/user.list.json'));
        async.forEach(users, function(u, cb){
            User.save({
                gender: u.gender,
                name: u.name,
                tel: u.tel,
                mobil: u.mobil,
                email: u.email,
                pw: User.hashPw(u.pw),
                notes: u.notes,
                role: u.role,
                availability: u.availability
            }, function(){
                cb();
            });
        }, function(err){
            cb();
        });

    });
    asyncTasks.push(function(cb){
        var organizations = JSON.parse(fs.readFileSync(__dirname+ '/organization.list.json'));
        async.forEach(organizations, function(o, cb){
            Organization.save({
                id: o.id,
                name: o.name,
                zip: o.zip,
                city: o.city,
                street: o.street,
                tel: o.tel,
                email: o.email
            }, function(){
                cb();
            });
        }, function(err){
            cb();
        });
    });
    asyncTasks.push(function(cb){
        var events = JSON.parse(fs.readFileSync(__dirname + '/event.list.json'));
        async.forEach(events, function(e, cb){
            Event.save({
                title: e.title,
                place: e.place,
                startdate: e.startdate,
                enddate: e.enddate,
                nrhelpers: e.nrhelpers,
               // helpers: {},
                description: e.description,
                important: e.important
            }, function(){
                cb();
            });
        }, function(err){
            cb();
        });
    });
    async.series(asyncTasks, function(err){
        res.json({success:true});
    });



});


module.exports = router;
