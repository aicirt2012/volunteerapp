var express = require('express');
var http = require('../util/http');
var async = require('async');

function deleteWorkspace(workspaceId, cb){
    http.del('/workspaces/'+workspaceId,{}, function(err, res, body){
        if(err) {
            console.err('Error during deleting Workspace "' + workspaceId + '"!');
            cb();
        }else {
            cb();
        }
    });
}

function createWorkspace(workspaceId, cb){
    http.post('/workspaces', {name:workspaceId, id:workspaceId}, function(err, res, body){
        if(err)
            console.err('Error during creating Workspace "'+workspaceId+'"!');
        else {
            cb();
        }
    });
}

function createEntityType(workspaceId, typeId, cb){
    http.post('/workspaces/'+workspaceId+'/entityTypes/', {name:typeId, namePlural: typeId, id:typeId}, function(err, res, body){
        if(err){
            console.err('Error during creating Type "'+typeId+'" in workspace "'+workspaceId+'"!');
        }else{
            console.log('entity Type created');
            cb();
        }
    });
}

function createAttributeDefinition(workspaceId, typeId, name, type, multiplicity, cb) {
    http.post('/entityTypes/'+typeId+'/attributeDefinitions', {
        name: name,
        attributeType: type,
        multiplicity: multiplicity
    }, function (err, res, body) {
        if(err){
            console.err('Error during creating AttributeDefinition!');
        }else{
            cb();
        }

    });
}

function createAttribute(typeId){
    http.post('/entityTypes/'+typeId+'/entities', {
        name: 'HansEv',
        attributes: [{name: 'age', values: [18]}]
    }, function (err, res, body) {

    });
}

module.exports = {
    create: function(cb){
        var workspaceId = 'refugeeapp';
        var entityTypeId = {
            organization: 'organization',
            person: 'person',
            event: 'event'
        };
        var types = {
            string : 'String',
            number: 'Number'
        }
        var multiplicity = {
            exactlyOne: 'exactlyOne'
        }


        var asyncTasks = [];
        
        asyncTasks.push(function(cb){
            deleteWorkspace(workspaceId, cb);
        });

        asyncTasks.push(function(cb){
            createWorkspace(workspaceId, cb);
        });
        asyncTasks.push(function(cb){
            createEntityType(workspaceId, entityTypeId.organization, cb);
        });
        /*
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.organization, 'name', types.string, multiplicity.exactlyOne, cb);
        });*/
        asyncTasks.push(function(cb){
            createEntityType(workspaceId, entityTypeId.person, cb);
        });
        asyncTasks.push(function(cb){
            createEntityType(workspaceId, entityTypeId.event, cb);
        });
        async.series(asyncTasks, function(err){
            cb();
        });


    }

};

