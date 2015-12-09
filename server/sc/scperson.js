var express = require('express');
var http = require('../util/http');
var async = require('async');



function model(attibute, modelName){

    var entityTypeId = modelName;
    return {
        findById: function(id, cb){
            console.log('find byid');
        },
        findAll: function(id, cb){
            console.log('find all');
        },
        find: function(query, cb){
            console.log('find with query params');
        }
    }
}


var Person = model({
    id: String,
    gender: String,
    name: String,
    tel: String,
    mobil: String,
    email: String,
    pw: String,
    notes: String,
    role: String,
    availability: String
}, 'user');

Person.findSpecialPerson = function(d, cb){
    console.log('find special person');
}

module.exports = Person;

