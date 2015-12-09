var express = require('express');
var router = express.Router();
var Schema = require('../../sc/schema');
var User = require('../../sc/User');
var Organization = require('../../sc/Organisation');
var Event = require('../../sc/Event');
var config = require('../../../config');
var async = require('async');


router.post('/', function(req, res, next) {
    var asyncTasks = [];
    asyncTasks.push(function(cb){
        Schema.workspace.delete(config.sc.workspaceId, cb);
    });
    asyncTasks.push(function(cb){
        Schema.workspace.create(config.sc.workspaceId, cb);
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
    async.series(asyncTasks, function(err){
        res.json({success:true});
        cb();
    });

});

module.exports = router;
