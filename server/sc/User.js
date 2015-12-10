var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var User = EntityType.define({
    id: {type:'Text'},
    gender: {type:'Text'},
    name: {type:'Text'},
    tel: {type:'Text'},
    mobil: {type:'Text'},
    email: {type:'Text'},
    pw: {type:'Text'},
    notes: {type:'Text'},
    role: {type:'Text'},
    availability: {type: 'json'}
    //  'Structure<mo:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, tu:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, we:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>,  th:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, fr:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, sa:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, su:Structure<morning:Boolean,afternoon:Boolean,evening:Boolean>, >'}},
   // availability: {type: 'json', options: {jsonTypeDefinition:   'Structure<mo:Structure<morning:Boolean>'}},
   // test: {type:'json', options: {jsonTypeDefinition:   'Structure<street:String,city:String>'}   }
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

User.canLogin = function(email, pw, cb){
    //TODO use bcyrpt with salt
    console.log('find special person');
}
User.setPw = function(pw, cb){
    //TODO use bcyrpt with salt
    console.log('set pw');
}


module.exports = User;

