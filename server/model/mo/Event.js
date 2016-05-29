
var express = require('express');
var mongoose = require('mongoose');
var SObjectId = mongoose.Schema.Types.ObjectId;

var eventSchema = new mongoose.Schema({
    title: String, 
    description: String,
    nrhelpers: Number,
    helpers: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    emails: String,
    startdate: Date,
    enddate: Date,
    place: String,
    organization: {type: mongoose.Schema.Types.ObjectId, ref: 'organization'}
});

eventSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

eventSchema.set('toJSON', {
    virtuals: true
});

var Event = mongoose.model('event', eventSchema);

Event.findByUserId = function(userId, cb){
    Event.find({helpers: userId}, function(err, events){
        if(!err){
            cb(false, events)
        }else
            cb(new Error('No Events for User found'), null);
    });
}

Event.findByIdPopulated =function findEvent(eId, user, cb) {
    Event.findOne({_id: eId}).populate('organization').populate('helpers').exec(function(err, e) {
        if (err)
            cb(err, null);
        else {
            e = JSON.parse(JSON.stringify(e));
            e.nrhelpersregistered = e.helpers.length;
            e.imregistered = false;
            for (var i = 0; i < e.helpers.length; i++)
                if (e.helpers[i].id == user.id)
                    e.imregistered = true;

            if (user.isHelper())
                delete e.helpers;
            cb(false, e);
        }
    });
}

module.exports = Event;
