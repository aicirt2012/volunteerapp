var express = require('express');
var http = require('../util/http');
var sociocortex = require('../sc/sociocortex');


var Organization = sociocortex.model({
    id: String,
    name: String,
    address: String,
    tel: String,
    email: String
}, 'organization');



module.exports = Organization;

