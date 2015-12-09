var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var Organization = EntityType.define({
    id: 'Text',
    name: 'Text',
    address: 'Text',
    tel: 'Text',
    email: 'Text'
}, 'organization');



module.exports = Organization;

