var express = require('express');
var http = require('../util/http');
var sociocortex = require('../sc/sociocortex');


var Organization = sociocortex.model({
    id: 'Text',
    name: 'Text',
    address: 'Text',
    tel: 'Text',
    email: 'Text'
}, 'organization');



module.exports = Organization;

