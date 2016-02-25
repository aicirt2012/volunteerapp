var express = require('express');
var async = require('async');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');
var User = require('../sc/User');


var Event = EntityType.define({
    title: {type:'String'},
    description: {type:'String'},
    nrhelpers: {type:'Number'},
    helpers: {type: 'link',  options: {entityType: {id: 'user'}},  multiplicity: 'any'},
    emails: {type:'String'},
    startdate: {type:'String'},
    enddate: {type:'String'},
    organization: {type: 'link', options:{entityType: {id:'organization'}}, multiplicity: 'exactlyOne' }
}, 'event');


Event.findByUserId = function(userId, cb){
    Event.find('helpers .any("'+userId+'" = id)', function(err, events){
        if(!err){
            cb(false, events)
        }else
            cb(new Error('No Events for User found'), null);
    });
}


Event.findWithHelperById = function(eventId, cb){
    Event.findById(eventId, function(err, event){
        if(err)
            cb(err, null);
        else{
            var helpers = [];
            async.forEach(event.helpers, function(helper, cb){
                User.findById(helper.id, function(err, user){
                    helpers.push({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        tel: user.tel
                    });
                    cb();
                });
            }, function(err){

                event.helpers = helpers;

                cb(false, event);
            });
        }
    });

}



module.exports = Event;
