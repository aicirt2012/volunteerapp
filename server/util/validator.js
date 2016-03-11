var express = require('express');
var validator = require('validator');

var validations = [];

// decorate all functions beginning with is
for(var key in validator) {
    var fun = validator[key];
    // if validator has an function which begins with is
    if(validator.hasOwnProperty( key) && typeof fun === 'function' && /^is/.test( key)) {
        // decorate the function
        var dec = decorate(validator[key]);
        validator[key] = dec;
    }
}

// decorate the following functions
['contains', 'matches', 'equals'].forEach(function( key) {
    validator[key] =  decorate(validator[key]);
});

function decorate(fun) {
    return function decoratedFunction() {
        var isValid = fun.apply(validator, arguments);
        validations.push(isValid);
        return isValid;
    }
}

validator.allValid = function() {
    console.log(validations);
    return !validations.some(function( b) {
        return b === false;
    })
};

validator.init = function() {
    validations = [];
}

validator.isName = function(name) {
    validator.matches(name, /^[a-zA-ZöüäßÜÖÄ\- ]+$/);
}

validator.isPhone = function(phone, required){
    if(phone || required != false)
        validator.isMobilePhone(phone, 'de-DE');
}

validator.isRole = function(role) {
    validator.matches(role, /^(HELPER|TEAM|ORGANIZER|ADMIN)$/);
}

validator.isGender = function(gender) {
    validator.matches(gender, /^(MALE|FEMALE)$/);
}

validator.isTitle = function(name) {
    validator.matches(name, /^[a-zA-Z0-9öüäßÜÖÄ\- ]+$/);
}

validator.isCity = function(city) {
    validator.matches(city, /^[a-zA-ZöüäßÜÖÄ\.\- ]+$/);
}

validator.isStreet = function(street) {
    validator.matches(street, /^[a-zA-Z0-9öüäßÜÖÄ\.\- ]+$/);
}

validator.isZip = function(zip) {
    validator.matches(zip, /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/);
}

validator.startBeforeEndDate = function(startDate, endDate) {
    if(new Date(startDate) <= new Date(endDate)){
        validations.push(true);
    }else{
        validations.push(false)
    }
}

module.exports = validator;
