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

validator.reset = function() {
    validations = [];
}

validator.isName = function(name) {
    validator.matches(name, /[a-zA-ZöüäßÜÖÄ ]*/);
}

validator.isPhone = function(phone, required){
    if(phone || required != false)
        validator.isMobilePhone(phone, 'de-DE');
}

validator.isRole = function(role) {
    validator.matches(role, /HELPER|TEAM|ORGANIZER|ADMIN/i);
}

validator.isGender = function(gender) {
    validator.matches(gender, /MALE|FEMALE/i);
}

module.exports = validator;
