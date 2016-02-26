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
    LOGOUT: 'LOGOUT',
    EVENT_CREATE: 'EVENT_CREATE',
    EVENT_UPDATE: 'EVENT_UPDATE',
    EVENT_DELETE: 'EVENT_DELETE',
    EVENT_REGISTER: 'EVENT_REGISTER',
    EVENT_UNREGISTER: 'EVENT_UNREGISTER'
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
    console.log(JSON.stringify({
        username: user? user.name : 'N.A.',
        useremail: user? user.email : 'N.A.',
        userid: user? user.id : 'N.A.',
        userrole:  user? user.role : 'N.A.',
        date: new Date().toISOString(),
        level: level,
        action: action,
        description: description? description : 'N.A'
    }));
    Log.save({
        username: user? user.name : 'N.A.',
        useremail: user? user.email : 'N.A.',
        userid: user? user.id : 'N.A.',
        userrole:  user? user.role : 'N.A.',
        date: new Date().toISOString(),
        level: level,
        action: action,
        description: description
    }, function(){});
}

module.exports = Log;

