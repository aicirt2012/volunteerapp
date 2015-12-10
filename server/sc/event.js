var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Event = EntityType.define({
    id: {type:'Text'},
    title: {type:'Text'},
    reqhelpers: {type:'Number'},
    messagessend: {type:'Text'},
    appointments: {type:'Text'}
}, 'event');



module.exports = Event;
