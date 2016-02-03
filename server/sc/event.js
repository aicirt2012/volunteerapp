var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Event = EntityType.define({
    title: {type:'String'},
    description: {type:'String'},
    nrhelpers: {type:'Number'},
    helpers: {type: 'link',  options: {entityType: {id: 'user'}},  multiplicity: 'any'},
    emails: {type:'String'},
    startdate: {type:'Date'},
    enddate: {type:'Date'},
    organization: {type: 'link', options:{entityType: {id:'organization'}} }
}, 'event');


Event.findByUserId = function(userId, cb){
    Event.find('helpers .any("'+userId+'" = id)', function(err, events){
        if(!err){
            cb(false, events)
        }else
            cb(new Error('No Events for User found'), null);
    });
}



module.exports = Event;
