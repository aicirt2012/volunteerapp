var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");

var Roles = {
    HELPER: 'HELPER',
    TEAM: 'TEAM',
    ORGANIZER: 'ORGANIZER',
    ADMIN: 'ADMIN'
}

var Genders = {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
}

var userSchema = new mongoose.Schema({
    gender: {type: String, enum: [Genders.MALE, Genders.FEMALE]},
    name: String,
    tel: String,
    mobil: String,
    email: {type: String, unique : true},
    pw: String,
    notes: String,
    role: {type: String, enum: [Roles.HELPER, Roles.TEAM, Roles.ORGANIZER, Roles.ADMIN]},
    availability: {
        mo:{
            morning:Boolean,
            afternoon:Boolean,
            evening:Boolean
        },
        tu:{
            morning:Boolean,
            afternoon:Boolean,
            evening:Boolean
        },
        we:{
            morning:Boolean,
            afternoon:Boolean,
            evening:Boolean
        },
        th:{
            morning:Boolean,
            afternoon:Boolean,
            evening:Boolean
        },
        fr:{
            morning:Boolean,
            afternoon:Boolean,
            evening:Boolean
        },
        sa:{
            morning:Boolean,
            afternoon:Boolean,
            evening:Boolean
        },
        su:{
            morning:Boolean,
            afternoon:Boolean,
            evening:Boolean
        }
    },
    picture: String,
    conditionsofuse: Boolean
});

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});


userSchema.methods.toMe = function(callback) {
    return {
        id: this.id,
        gender: this.gender,
        name: this.name,
        tel: this.tel,
        mobil: this.mobil,
        email: this.email,
        role: user.role,
        availability: this.availability,
        picture: this.picture
    }
};


userSchema.methods.isHelper = function(callback) {
    return this.role == Roles.ADMIN;
};

userSchema.methods.isTeam = function(callback) {
    return this.role == Roles.ADMIN;
};

userSchema.methods.isOrganizer = function(callback) {
    return this.role == Roles.ADMIN;
};

userSchema.methods.isAdmin = function(callback) {
    return this.role == Roles.ADMIN;
};


userSchema.methods.atLeastAdmin = function(callback) {
    return this.role && role == Roles.ADMIN;
};

userSchema.methods.atLeastOrganizer = function(callback) {
    return this.atLeastAdmin() || this.role && role == Roles.ORGANIZER;
};

userSchema.methods.atLeastTeam = function(callback) {
    return this.atLeastOrganizer() || this.role && role == Roles.TEAM;
};

userSchema.methods.atLeastHelper = function(callback) {
    return this.atLeastTeam || this.role && role == Roles.HELPER;
};




var User = mongoose.model('user', userSchema);

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



User.canLogin = function(email, plainPw, cb){
    User.findOne({email: email.toLowerCase()}, function(err, user){
        if(user != null && !err){
            if(bcrypt.compareSync(plainPw, user.pw))
                cb(false, user);
            else
                cb(new Error('Invalid Pw'), null);
        }else
            cb(new Error('User not found'), null);
    });
}




User.hashPw = function(plainPw){
    if (!plainPw) {
        console.log("error@hashPw: no plainpw set");
        return undefined;
    }

    try {
        return bcrypt.hashSync(plainPw, bcrypt.genSaltSync(10), null);
    }catch(err) {
        console.log("error@hashPw:", err);
        return undefined;
    }
};

User.generatePw = function(){
    return generator.generate({
        length: 8,
        numbers: true
    });
}


User.findByEmail = function(email, callback){
    // TODO: sanitize email
    var email = email.toLowerCase();

    if (!email)
        return callback(new Error("No email set!"), undefined);

    var regEmail = new RegExp(email, 'i');

    User.findOne({email: regEmail}, function(err, user){
        if (err) console.log("error@User.findByEmail:", err);
        if(!user) err = new Error("no user found");
        return callback(err, user);
    });
};



module.exports = User;

