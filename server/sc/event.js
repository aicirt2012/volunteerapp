var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Event = EntityType.define({
    title: {type:'String'},
    description: {type:'String'},
    nrhelpers: {type:'Number'},
    helpers: {type: 'link',  options: {entityType: {id: 'user'}},  multiplicity: 'any'}, //TODO fix multiplicity not working
    emails: {type:'String'},
    startdate: {type:'Date'},
    enddate: {type:'Date'},
    organization: {type: 'link', options:{entityType: {id:'organization'}} }
}, 'event');


Event.findByUserId = function(userId){
    console.log('find special person');

    //find Event .where(helpers .any("13lyldapgh0lt" = id))
}



module.exports = Event;
