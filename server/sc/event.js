var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Event = EntityType.define({
    id: {type:'String'},
    title: {type:'String'},
    description: {type:'String'},
    nrhelpers: {type:'Number'},
    helpers: {type: 'user'},
    emails: {type:'String'},
    startdate: {type:'String'},
    enddate: {type:'String'}
}, 'event');



module.exports = Event;
