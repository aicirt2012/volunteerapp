var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var EventHelper = EntityType.define({
    registered: {type:'Date'},
    helper: {type: 'link', options:{entityType: {id:'user'}} },
    event: {type: 'link', options:{entityType: {id:'event'}} }
}, 'eventhelper');



module.exports = EventHelper;
