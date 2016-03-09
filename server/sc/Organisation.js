var express = require('express');
var http = require('../util/http');
var EntityType = require('eentityType');


var Organization = EntityType.define({
    name: {type:'String'},
    zip: {type: 'String'},
    city: {type: 'String'},
    street: {type:'String'},
    tel: {type:'String'},
    email: {type:'String'}
}, 'organization');


module.exports = Organization;

