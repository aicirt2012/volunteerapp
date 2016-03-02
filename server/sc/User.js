var express = require('express');
var moment = require('moment');
var http = require('../util/http');
var bcrypt = require("bcrypt-nodejs");
var generator = require('generate-password');
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
    organization: {type: 'link', options:{entityType: {id:'organization'}},
    picture: {type:'String'} }
}, 'user');

User.genders = {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
}

User.roles = {
    HELPER: 'HELPER',
    TEAM: 'TEAM',
    ORGANIZER: 'ORGANIZER',
    ADMIN: 'ADMIN'
}

User.isAdmin = function(role){
    return role && role == User.roles.ADMIN;
}
User.isOrganizer = function(role){
    return role && role == User.roles.ORGANIZER;
}
User.isTeam = function(role){
    return role && role == User.roles.TEAM;
}
User.isHelper = function(role){
    return role && role == User.roles.HELPER;
}

User.atLeastAdmin = function(role){
    return role && role == User.roles.ADMIN;
}

User.atLeastOrganizer = function(role){
    return User.atLeastAdmin(role)||
           role && role == User.roles.ORGANIZER ;
}

User.atLeastTeam = function(role){
    return User.atLeastOrganizer(role) ||
           role && role == User.roles.TEAM;
}

User.atLeastHelper= function(role){
    return User.atLeastTeam(role) ||
           role && role == User.roles.HELPER;
}

User.findAvailableUsers = function(start, end, cb){
    var matches = [];
    do{
        matches['availability.'+dayOfWeekLabel(start)+'.'+timeSlotLabel(start)]=true;
        start = new Date(start.getTime()+3600*1000);
    }while(start.getTime() < end.getTime())

    matches = Object.keys(matches);

    //find user.where(availability.mo.morning or availability.mo.afternoon)
    query = '';
    for(var i=0; i<matches.length; i++){
        query += matches[i];
        if(i<matches.length-1)
            query += ' or ';
    }

    User.find(query, function(err, users){
        if(!err){
            console.log(JSON.stringify(users));
            cb(false, users);
        }else
            cb(new Error('User not found'), null);
    });

    function timeSlotLabel(date){
        //morning: 00:00 -> 11:59
        //afternoon: 12:00 -> 17:59
        //evening: 18:00 -> 23:59
        var hour = moment(date).format('H');
        if(hour<12)
            return 'morning';
        if(hour<18)
            return 'afternoon';
        else
            return 'evening';
    }

    function dayOfWeekLabel(date){
        var dayOfWeek = parseInt(moment(date).format('e'));
        switch(dayOfWeek){
            case(0): return 'mo';
            case(1): return 'tu';
            case(2): return 'we';
            case(3): return 'th';
            case(4): return 'fr';
            case(5): return 'sa';
            case(6): return 'su';
        }
    }
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

User.hashPw = function(plainPw){
    if(!plainPw)
        console.error('Empty password can not be hashed!');
    return bcrypt.hashSync(plainPw, bcrypt.genSaltSync(10), null);
}

User.generatePw = function(){
    return generator.generate({
        length: 8,
        numbers: true
    });
}

User.exists = function(email, uId, cb){
    User.find('email="'+email.toLowerCase()+'"', function(err, users){
        if(users && users.length == 1){
            var user = users[0];
            if(uId == user.id)
                return cb(false);
            else
                return cb(new Error('email already exists'));
        }else
            return cb(false);
    });
}

User.toMe = function(user){
    return {
        id: user.id,
        gender: user.gender,
        name: user.name,
        tel: user.tel,
        mobil: user.mobil,
        email: user.email,
        role: user.role,
        availability: user.availability,
        picture: user.picture
    }
}


module.exports = User;

