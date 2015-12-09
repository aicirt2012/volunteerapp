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
    console.log('/entityTypes/'+typeId+'/attributeDefinitions');
    console.log({
        name: name,
        attributeType: type,
        multiplicity: multiplicity
    });
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

function createEnity(typeId){
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
            organization: 'scorganization',
            user: 'scuser',
            event: 'scevent'
        };
        var types = {
            string : 'Text',
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
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.organization, 'namex', types.number, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.organization, 'address', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.organization, 'email', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.organization, 'tel', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createEntityType(workspaceId, entityTypeId.user, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.user, 'gender', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.user, 'name', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.user, 'tel', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.user, 'email', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.user, 'pw', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.user, 'availability', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.user, 'role', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createEntityType(workspaceId, entityTypeId.event, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.event, 'title', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.event, 'nrOfHelpers', types.number, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.event, 'description', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.event, 'emails', types.string, multiplicity.exactlyOne, cb);
        });
        asyncTasks.push(function(cb){
            createAttributeDefinition(workspaceId, entityTypeId.event, 'termin', types.string, multiplicity.exactlyOne, cb);
        });
        async.series(asyncTasks, function(err){
            cb();
        });


    }

};

