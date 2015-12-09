var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Event = EntityType.model({
    id: String,
    title: String,
    reqhelpers: Number,
    messagessend: String,
    appointments: String
}, 'event');



module.exports = Event;
