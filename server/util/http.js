var express = require('express');
var config = require('../../config');
var request = require('request');


var headers = {
    'Authorization': 'Basic ' + new Buffer(config.sc.user + ':' + config.sc.pass).toString('base64'),
    'Content-Type': 'application/json'
};


module.exports = {

    get: function(path, cb){
        request.get({url: config.sc.url + path, headers: headers}, function (err, res, body){
            if (!err && res.statusCode == 200) {
                res.body = JSON.parse(body);
                cb(false, res);
            }else{
                cb(true, res);
            }
        });
    },
    post: function(path, data, cb){
        //console.log('POST: '+ config.sc.url + path + " "+JSON.stringify(data));
        request.post({
            url: config.sc.url + path,
            headers: headers,
            json: data
        }, cb);
    },
    del: function(path, data, cb){
        request.del({
            url: config.sc.url + path,
            headers: headers,
            json: data
        }, cb);
    }
};

