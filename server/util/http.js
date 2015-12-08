var express = require('express');
var config = require('../../config');
var request = require('request');

var headers = {
    'Authorization': 'Basic ' + new Buffer(config.sc.user + ':' + config.sc.pass).toString('base64'),
    'Content-Type': 'application/json'
};

var generateHeader = function(auth){
    console.log('auth gen'+auth.email+" "+auth.pw);
    return {
        'Authorization': 'Basic ' + new Buffer(auth.email + ':' + auth.pw).toString('base64'),
        'Content-Type': 'application/json'
    }
};

module.exports = {

    get: function(path, auth, cb){
        request.get({url: config.sc.url + path, headers: generateHeader(auth)}, function (err, res, body){
            if (!err && res.statusCode == 200) {
                res.body = JSON.parse(body);
                cb(false, res);
            }else{
                cb(true, res);
            }
        });
    },
    post: function(path, data, cb){
        request.post({
            url: config.sc.url + path,
            headers: headers,
            json: data
        }, cb);
    }
};

