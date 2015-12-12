var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Organization = EntityType.define({
    id: {type:'String'},
    name: {type:'String'},
    address: {type:'String'},
    tel: {type:'String'},
    email: {type:'String'}
}, 'organization');



module.exports = Organization;

