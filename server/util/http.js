var express = require('express');
var config = require('../../config');
var request = require('request');


module.exports = {

    get: function(url, cb){
        var req = {
            url: 'http://vmmatthes21.informatik.tu-muenchen.de/api/0.1'+url,
            headers: {
                'Authorization': 'Basic ' + new Buffer(config.sc.user + ':' + config.sc.pass).toString('base64'),
                'Content-Type': 'application/json'
            }
        };
        console.log('request prepared', JSON.stringify(req));
        request(req, cb);
    }
};

