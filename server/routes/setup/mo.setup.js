var express = require('express');
var router = express.Router();
var async = require('async');
var fs = require('fs');
var config = require('../../../config');
var mongoose = require('mongoose');
var OrganizationMongo = require('../../model/mo/Organization');
var UserMongo = require('../../model/mo/User');

router.post('/', function(req, res) {

    var asyncTasks = [];
    asyncTasks.push(function(cb){
        mongoose.connection.collections['events'].drop( function(err) {
            console.log('collection dropped');
            cb();
        });
    });
    asyncTasks.push(function(cb){
        mongoose.connection.collections['organizations'].drop( function(err) {
            console.log('collection dropped');
            cb();
        });
    });
    asyncTasks.push(function(cb){
        mongoose.connection.collections['users'].drop( function(err) {
            console.log('collection dropped');
            cb();
        });
    });
    asyncTasks.push(function(cb){
        var organizations = JSON.parse(fs.readFileSync(__dirname+ '/organization.list.json'));
        async.forEach(organizations, function(o, cb){
            OrganizationMongo.create({
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
    asyncTasks.push(function(cb) {
        var users = JSON.parse(fs.readFileSync(__dirname + '/user.list.json'));
        async.forEach(users, function (u, cb) {
            UserMongo.create({
                gender: u.gender,
                name: u.name,
                tel: u.tel,
                mobil: u.mobil,
                email: u.email,
                pw: UserMongo.hashPw(u.pw),
                notes: u.notes,
                role: u.role,
                availability: u.availability,
                picture: u.picture,
                conditionsofuse: true
            }, function () {
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
