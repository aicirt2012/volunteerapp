var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Event = EntityType.define({
    id: {type:'String'},
    title: {type:'String'},
    reqhelpers: {type:'Number'},
    messagessend: {type:'String'},
    appointments: {type:'String'}
}, 'event');



module.exports = Event;
