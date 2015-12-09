var express = require('express');
var router = express.Router();
var async = require('async');
var config = require('../../../config');
var schema = require('../../sc/schema');
var User = require('../../sc/User');
var Organization = require('../../sc/Organisation');
var Event = require('../../sc/Event');


router.get('/', function(req, res, next) {
    var asyncTasks = [];
    asyncTasks.push(function(cb){
        schema.workspace.delete(config.sc.workspaceId, cb);
    });
    asyncTasks.push(function(cb){
        schema.workspace.create(config.sc.workspaceId, cb);
    });
    asyncTasks.push(function(cb){
        User.schema.create(cb);
    });
    asyncTasks.push(function(cb){
        Organization.schema.create(cb);
    });
    asyncTasks.push(function(cb){
        Event.schema.create(cb);
    });
    async.series(asyncTasks, function(err){
        res.json({success:true});
    });
});

module.exports = router;




/*

 var workspaceId = 'refugeeapp';
 var query = 'gender = "male"';
 var entityTypeName = "user";

 var payload = {expression: 'find '+entityTypeName+' .where('+query+')'};
 http.post('/workspaces/'+workspaceId+'/mxlQuery',payload, function(err, res, body){
 if(err)
 console.err('Error during mxl query "'+workspaceId+'"!');
 else {
 console.log(body);
 }
 });



 */



/*
 // create workspace

 http.post('/workspaces', {name:'RefuggeeApp', id:'refugeeapp'}, function(err, res, body){
 //console.log(res);
 if(err)
 console.log('fail');
 else {
 console.log('success');
 http.post('/workspaces/refugeeapp/entityTypes/', {name:'Organization', namePlural: 'Organizations', id:'organization'}, function(err, res, body){
 if(err){

 }else{
 http.post('/entityTypes/organization/attributeDefinitions', {name:'age', attributeType: 'Number', multiplicity: 'exactlyOne'}, function(err, res, body){
 if(!err)
 http.post('/entityTypes/organization/entities', {name:'HansEv', attributes: [{name:'age', values:[18]}]}, function(err, res, body){

 });
 });

 }
 });


 }
 });


 // create type

 /*
 // create entity
 http.post('/entityTypes/', {name:'Organization'}, function(err, res, body){

 });
 */