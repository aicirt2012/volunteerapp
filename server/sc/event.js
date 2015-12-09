var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Event = EntityType.define({
    id: 'Text',
    title: 'Text',
    reqhelpers: 'Number',
    messagessend: 'Text',
    appointments: 'Text'
}, 'scevent');



module.exports = Event;
