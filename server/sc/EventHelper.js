var express = require('express');
var http = require('../util/http');
var EntityType = require('../sc/EntityType');
var User = require('../sc/User');


var EventHelper = EntityType.define({
    registered: {type:'Date'},
    helper: {type: 'link', options:{entityType: {id:'user'}} },
    event: {type: 'link', options:{entityType: {id:'event'}} }
}, 'eventhelper');


EventHelper.findByEvent = function(eventId, cb){
    EventHelper.find2("find(\"1axvacwvavdrh\").get eventhelper whereis event.select({registered, helper})", function(err, users){
        if(users && users.length == 1){
            var user = users[0];
                cb(false, user);
        }else
            cb(new Error('User not found'), null);
    });
    //cb(false, {});
}


module.exports = EventHelper;
