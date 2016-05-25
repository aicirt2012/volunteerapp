
var express = require('express');
var mongoose = require('mongoose');
var SObjectId = mongoose.Schema.Types.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var eventSchema = new mongoose.Schema({
    title: String, 
    description: String,
    nrhelpers: String,
    helpers: [SObjectId],
    emails: String,
    startdate: Date,
    enddate: Date,
    place: String,
    organization: SObjectId
});

var Event = mongoose.model('event', eventSchema);

Event.findByUserId = function(userId, cb){
    Event.find({helpers: {$in: arr}}, function(err, events){
        if(!err){
            cb(false, events)
        }else
            cb(new Error('No Events for User found'), null);
    });
}

module.exports = Event;
