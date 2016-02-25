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
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    ERR: 'ERR'
}

Log.actions = {
    LOGIN: 'LOGIN',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGOUT: 'LOGOUT'
}

Log.debug = function(user, action, description){
    Log.log(user, Log.level.DEBUG, action, description);
}

Log.info = function(user, action, description){
    Log.log(user, Log.level.INFO, action, description);
}

Log.err = function(user, action, description){
    Log.log(user, Log.level.ERR, action, description);
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
    }, function(){});
}

module.exports = Log;

