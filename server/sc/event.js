var express = require('express');
var http = require('../util/http');
var sociocortex = require('../sc/sociocortex');


var User = sociocortex.model({
    id: String,
    title: String,
    reqhelpers: Number,
    messagessend: String,
    appointments: String
}, 'event');

User.findAvailableUsers = function(availableOn, cb){
    console.log('find special person');
}

User.canLogin = function(email, pw, cb){
    //TODO use bcyrpt with salt
    console.log('find special person');
}
User.setPw = function(pw, cb){
    //TODO use bcyrpt with salt
    console.log('set pw');
}


module.exports = Person;

/**
 * Created by michelf on 09.12.2015.
 */
