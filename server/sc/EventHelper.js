var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');


var EventHelper = EntityType.define({
    registered: {type:'Date'},
    helper: {type: 'link', options:{entityType: {id:'user'}} },
    event: {type: 'link', options:{entityType: {id:'event'}} }
}, 'eventhelper');


EventHelper.findByEvent = function(eventId, cb){
    User.find('email="'+email.toLowerCase()+'"', function(err, users){
        if(users && users.length == 1){
            var user = users[0];
            //find EventHelper.where(get Event whereis Location.any(id = '1xpbrfl4uqcs5'))
                cb(false, user);
        }else
            cb(new Error('User not found'), null);
    });
}


module.exports = EventHelper;
