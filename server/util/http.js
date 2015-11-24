var express = require('express');
var config = require('../../config');
var request = require('request');

var headers = {
    'Authorization': 'Basic ' + new Buffer(config.sc.user + ':' + config.sc.pass).toString('base64'),
    'Content-Type': 'application/json'
};

module.exports = {

    get: function(path, cb){
        request.get({url: config.sc.url + path, headers: headers}, cb);
    },
    post: function(path, cb){
        request.post({
            url: config.sc.url + path,
            headers: headers,
            json: {
                name: "testworkspace"
            }
        }, cb);
    }
};

