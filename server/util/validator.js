'use strict';

var express = require('express');
var validator = require('validator');

var validations = [];

// decorate all functions beginning with is
for (var key in validator) {
    var fun = validator[key];
    // if validator has an function which begins with is
    if (validator.hasOwnProperty(key) && typeof fun === 'function' && /^is/.test(key)) {
        // decorate the function
        var dec = decorate(validator[key]);
        validator[key] = dec;
    }
}

// additionally decorate the following functions
['contains', 'matches', 'equals'].forEach(function (key) {
    validator[key] = decorate(validator[key]);
});

// let to several 'unfindable' errors, added more logs
var orgBlacklist = validator.blacklist;
validator.blacklist = function() {
    try {
        return orgBlacklist.apply(validator, arguments);
    } catch(e) {
        // convert arguments to a real array for better readability
        console.error('could not blacklist because:', e, '; arguments:', Array.prototype.slice.call(arguments));
        throw e;
    }
};

function decorate(fun) {
    return function decoratedFunction() {
        try {
            var isValid = fun.apply(validator, arguments);
            validations.push(isValid);
            if(!isValid) {
                console.log('validation error: ', arguments);
            }

            return isValid;
        } catch (e) {
            console.error(e, fun);

            return false;
        }
    }
}

validator.allValid = function () {
    console.log(validations);
    return !validations.some(function (b) {
        return b === false;
    })
};

validator.init = function () {
    validations = [];
}

validator.conditionsofuseIsTrue = function (conditionsofuse) {
    if (conditionsofuse)
        validations.push(true);
    else
        validations.push(false);
}

validator.isName = function (name) {
    validator.matches(name, /^[a-zA-ZöüäßÜÖÄ.\- ]+$/);
}

validator.isPhone = function (phone, required) {
    if (phone || required != false)
        validator.isMobilePhone(phone, 'de-DE');
}

validator.isRole = function (role) {
    validator.matches(role, /^(HELPER|TEAM|ORGANIZER|ADMIN)$/);
}

validator.isGender = function (gender) {
    validator.matches(gender, /^(MALE|FEMALE)$/);
}

validator.isTitle = function (name) {
    validator.matches(name, /^[a-zA-Z0-9öüäßÜÖÄ\- ]+$/);
}

validator.isCity = function (city) {
    validator.matches(city, /^[a-zA-ZöüäßÜÖÄ\.\- ]+$/);
}

validator.isStreet = function (street) {
    validator.matches(street, /^[a-zA-Z0-9öüäßÜÖÄ\.\- ]+$/);
}

validator.isZip = function (zip) {
    validator.matches(zip, /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/);
}

validator.startBeforeEndDate = function (startDate, endDate) {
    if (new Date(startDate) <= new Date(endDate))
        validations.push(true);
    else
        validations.push(false)
}

validator.isAvailability = function (availabilities) {
    var valid = true;
    var expectedDays = ["mo", "tu", "we", "th", "fr", "sa", "su"];
    var expectedDayValues = ["morning", "afternoon", "evening"];

    var keys = Object.keys(availabilities);
    if (arraysEqual(keys, expectedDays)) {
        for (var i = 0; i < expectedDays.length; i++) {
            var day = expectedDays[i];
            var availability = availabilities[day];
            var dayValues = Object.keys(availability);

            if (!arraysEqual(dayValues, expectedDayValues)) {
                valid = false;
                break;
            }
        }
    } else
        valid = false;

    validations.push(valid);


    // put into isAvailability to make it private
    function arraysEqual(toProve, real) {
        for (var i = 0; i < toProve.length; i++) {
            var element = toProve[i];
            var index = real.indexOf(element);

            if (index == -1)
                return false;
        }
        return real.length === toProve.length;
    }
};

module.exports = validator;
