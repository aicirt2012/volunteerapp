var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Event = EntityType.define({
    title: {type:'String'},
    description: {type:'String'},
    nrhelpers: {type:'Number'},
    helpers: {type: 'json',  options: {jsonTypeDefinition: 'Structure<helperid:String, date: Date>'}, multiplicity: 'many' },
    emails: {type:'String'},
    startdate: {type:'Date'},
    enddate: {type:'Date'},
    organization: {type: 'link', options:{entityType: {id:'organization'}} }
}, 'event');



module.exports = Event;
