var express = require('express');
var http = require('../util/http');


module.exports = {

    me: function(auth, cb){
        http.get('/users/me', auth, function (err, res) {
            if (!err) {
                var u = res.body;
                return cb(false, {
                    id: u.id,
                    name: u.name,
                    email: u.email
                });
            }else{
                return cb(true, null);
            }
        });
    },
    create: function (data, auth, cb) {
        http.post('')

    }

};

