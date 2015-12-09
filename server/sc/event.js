var express = require('express');
var http = require('../util/http');
var sociocortex = require('../sc/sociocortex');


var Event = sociocortex.model({
    id: String,
    title: String,
    reqhelpers: Number,
    messagessend: String,
    appointments: String
}, 'event');



module.exports = Event;
