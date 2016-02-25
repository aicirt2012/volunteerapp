var express = require('express');
var EntityType = require('../sc/EntityType');


var Log = EntityType.define({
    username: {type:'String'},
    useremail: {type: 'String'},
    userid: {type: 'String'},
    userrole:  {type: 'String'},
    date: {type: 'Date'},
    action: {type:'String'},
    description: {type:'String'}
}, 'log');


module.exports = Log;

