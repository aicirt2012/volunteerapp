var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
var generator = require('generate-password');

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
    email: {type: String, index: { unique: true }, lowercase: true },
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


userSchema.methods.isHelper = function() {
    return this.role == Roles.HELPER;
};

userSchema.methods.isTeam = function() {
    return this.role == Roles.TEAM;
};

userSchema.methods.isOrganizer = function() {
    return this.role == Roles.ORGANIZER;
};

userSchema.methods.isAdmin = function() {
    return this.role == Roles.ADMIN;
};


userSchema.methods.atLeastAdmin = function() {
    return this.role && this.role == Roles.ADMIN;
};

userSchema.methods.atLeastOrganizer = function() {
    return this.atLeastAdmin() || this.role && role == Roles.ORGANIZER;
};

userSchema.methods.atLeastTeam = function() {
    return this.atLeastOrganizer() || this.role && role == Roles.TEAM;
};

userSchema.methods.atLeastHelper = function() {
    return this.atLeastTeam() || this.role && role == Roles.HELPER;
};

userSchema.methods.toMe = function(){
    return {
        id: this.id,
        gender: this.gender,
        name: this.name,
        tel: this.tel,
        mobil: this.mobil,
        email: this.email,
        role: this.role,
        availability: this.availability,
        picture: this.picture
    }
}


var User = mongoose.model('user', userSchema);

User.findAvailableUsers = function(start, end, cb){
    //TODO change to mongo

    var matches = [];
    do{
        matches['availability.'+dayOfWeekLabel(start)+'.'+timeSlotLabel(start)]=true;
        start = new Date(start.getTime()+3600*1000);
    }while(start.getTime() < end.getTime())

    matches = Object.keys(matches);

    //find user.where(availability.mo.morning or availability.mo.afternoon)
    query = {
        $or:[]
    };
    for(var i=0; i<matches.length; i++){
        var m = "'"+matches[i]+"'";
        query.$or.push({m: true}); //+= matches[i];
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

User.exists = function(email, uId, cb){
    User.findByEmail(email, function(err, user){
        cb(err || user == null)
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

