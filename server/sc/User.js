var express = require('express');
var http = require('../util/http');
var bcrypt = require("bcrypt-nodejs");
var EntityType = require('../sc/EntityType');


var User = EntityType.define({
    gender: {type:'String'},
    name: {type:'String'},
    tel: {type:'String'},
    mobil: {type:'String'},
    email: {type:'String'},
    pw: {type:'String'},
    notes: {type:'String'},
    role: {type:'String'},
    availability: {type: 'json', options: {jsonTypeDefinition: 'Structure<mo:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, tu:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, we:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>,  th:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, fr:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, sa:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, su:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean> >'}},
    organization: {type: 'link', options:{entityType: {id:'organization'}} }
}, 'user');

User.genders = {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
}

User.roles = {
    HELPER: 'HELPER',
    TEAM: 'TEAM',
    ORGANIZER: 'ORGANIZER'
}

User.findAvailableUsers = function(availableOn, cb){
    console.log('find special person');
}

User.canLogin = function(email, plainPw, cb){
    User.find('email="'+email.toLowerCase()+'"', function(err, users){
        if(users && users.length == 1){
            var user = users[0];
            if(bcrypt.compareSync(plainPw, user.pw))
                cb(false, user);
             else
                cb(new Error('Invalid Pw'), null);
        }else
            cb(new Error('User not found'), null);
    });
}
User.setPw = function(pw, cb){
    //TODO use bcyrpt with salt
    console.log('set pw');
}

User.hashPw = function(plainPw){
    if (!plainPw) {
        // TODO: node crash vermeiden ???
    }
    return bcrypt.hashSync(plainPw, bcrypt.genSaltSync(10), null);
};

User.toMe = function(user){
    return {
        id: user.id,
        gender: user.gender,
        name: user.name,
        tel: user.tel,
        mobil: user.mobil,
        email: user.email,
        availability:  user.availability
    }
}


module.exports = User;

