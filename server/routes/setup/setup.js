var express = require('express');
var router = express.Router();
var async = require('async');
var config = require('../../../config');
var SocioCortex = require('../../sc/SocioCortex');
var User = require('../../sc/User');
var Organization = require('../../sc/Organisation');
var Event = require('../../sc/Event');


router.get('/schema', function(req, res, next) {
    var asyncTasks = [];
    asyncTasks.push(function(cb){
        SocioCortex.workspace.delete(config.sc.workspaceId, cb);
    });
    asyncTasks.push(function(cb){
        SocioCortex.workspace.create(config.sc.workspaceId, cb);
    });
    asyncTasks.push(function(cb){
        User.schema.create(cb);
    });
    asyncTasks.push(function(cb){
        Organization.schema.create(cb);
    });
    asyncTasks.push(function(cb){
        Event.schema.create(cb);
    });

    asyncTasks.push(function(cb){
        User.save({
            gender: 'Text',
            name: 'Text',
            tel: 'Text',
            mobil: 'Text',
            email: 'Text',
            pw: 'Text',
            notes: 'Text',
            role: 'Text',
            availability: 'Text'
        }, function(){
            cb();
        });
    });
    asyncTasks.push(function(cb){
        User.save({
            gender: 'Text',
            name: 'Text',
            tel: 'Text',
            mobil: 'Text',
            email: 'Text',
            pw: 'Text',
            notes: 'Text',
            role: 'Text',
            availability: 'Text'
        }, function(){
            cb();
        });
    });
    async.series(asyncTasks, function(err){
        res.json({success:true});
    });



});

module.exports = router;
