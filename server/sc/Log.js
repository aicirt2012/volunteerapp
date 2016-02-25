var express = require('express');
var EntityType = require('../sc/EntityType');


var Log = EntityType.define({
    username: {type:'String'},
    useremail: {type: 'String'},
    userid: {type: 'String'},
    userrole:  {type: 'String'},
    date: {type: 'Date'},
    level: {type: 'String'},
    action: {type:'String'},
    description: {type:'String'}
}, 'log');

Log.level = {
    INFO: 'INFO',
    ERR: 'ERR'
}

Log.actions = {
    LOGIN: 'LOGIN',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGOUT: 'LOGOUT'
}

Log.log = function(user, level, action, description){
    Log.save({
        username: user.name,
        useremail: user.email,
        userid: user.id,
        userrole:  user.role,
        date: new Date().toISOString(),
        level: level,
        action: action,
        description: description
    });
}

module.exports = Log;

