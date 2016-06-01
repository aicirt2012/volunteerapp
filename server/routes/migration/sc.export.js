var express = require('express');
var router = express.Router();
var async = require('async');
var fs = require('fs');
var config = require('../../../config');
var SocioCortex = require('../../model/sc/SocioCortex');
var User = require('../../model/sc/User');
var Organization = require('../../model/sc/Organisation');
var Event = require('../../model/sc/Event');
var Log = require('../../model/sc/Log');
var mongoose = require('mongoose');



router.post('/', function(req, res, next) {
    var asyncTasks = [];

    asyncTasks.push(function(cb){
        Organization.findAll(function(err, o){
            fs.writeFileSync(__dirname + '/organization.list.json', JSON.stringify(o));
            cb();
        });
    });
    asyncTasks.push(function(cb){
        User.findAll(function(err, u){
            fs.writeFileSync(__dirname + '/user.list.json', JSON.stringify(u));
            cb();
        });
    });
    asyncTasks.push(function(cb){
        Event.findAll(function(err, e){
            fs.writeFileSync(__dirname + '/event.list.json', JSON.stringify(e));
            cb();
        });
    });
    asyncTasks.push(function(cb){
        Log.findAll(function(err, l){
            fs.writeFileSync(__dirname + '/log.list.json', JSON.stringify(l));
            cb();
        });
    });

    async.series(asyncTasks, function(err){
        res.json({success:true});
    });

});



module.exports = router;
