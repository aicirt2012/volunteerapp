var express = require('express');
var http = require('../util/http');
var sociocortex = require('../sc/sociocortex');


var User = sociocortex.model({
    id: 'Text',
    gender: 'Text',
    name: 'Text',
    tel: 'Text',
    mobil: 'Text',
    email: 'Text',
    pw: 'Text',
    notes: 'Text',
    role: 'Text',
    availability: 'Text'
}, 'user');

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


module.exports = User;

