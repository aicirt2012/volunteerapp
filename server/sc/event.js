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
    console.log('find special person');

    //find Event .where(helpers .any("13lyldapgh0lt" = id))

    Event.find('helpers .any("13lyldapgh0lt" = id)', function(err, events){
        if(!err){
            cb(false, events)
        }else
            cb(new Error('User not found'), null);
    });
}



module.exports = Event;
