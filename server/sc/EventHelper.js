var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var EventHelper = EntityType.define({
    id: {type:'String'},
    registered: {type:'String'},
    helper: {type:'String'}
}, 'eventhelper');



module.exports = EventHelper;
