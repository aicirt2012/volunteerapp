var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Organization = EntityType.define({
    id: {type:'Text'},
    name: {type:'Text'},
    address: {type:'Text'},
    tel: {type:'Text'},
    email: {type:'Text'}
}, 'organization');



module.exports = Organization;

