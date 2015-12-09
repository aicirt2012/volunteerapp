var express = require('express');
var http = require('../util/http');

var config = require('../../config');

function deleteWorkspace(workspaceId, cb){
    http.del('/workspaces/'+workspaceId,{}, function(err, res, body){
        if(err || res.statusCode != 200) {
            console.error('Error during deleting Workspace "' + workspaceId + '"!');
            console.error(body);
            cb();
        }else {
            console.log('Workspace Deleted');
            cb();
        }
    });
}

function createWorkspace(workspaceId, cb){
    http.post('/workspaces', {name:workspaceId, id:workspaceId}, function(err, res, body){
        if(err || res.statusCode != 200) {
            console.error('Error during creating Workspace "' + workspaceId + '"!');
            console.error(body);
        }else {
            console.log('Workpsace Created');
            cb();
        }
    });
}

function createEntityType(workspaceId, typeId, cb){
    http.post('/workspaces/'+workspaceId+'/entityTypes/', {name:typeId, namePlural: typeId, id:typeId}, function(err, res, body){
        if(err || res.statusCode != 200){
            console.error('Error during creating Type "'+typeId+'" in workspace "'+workspaceId+'"!');
            console.error(body);
        }else{
            console.log('EntityType created');
            cb();
        }
    });
}

function createAttributeDefinition(workspaceId, typeId, name, type, cb) {
    var data = {
        name: name,
        attributeType: type
    };
    http.post('/entityTypes/'+typeId+'/attributeDefinitions', data, function (err, res, body) {
        if(err || res.statusCode != 200){
            console.error('Error during creating AttributeDefinition!');
            console.error(body);
        }else{
            console.log('AttributeDefinition Created');
            cb();
        }

    });
}


module.exports = {
    workspace:{
        create: createWorkspace,
        delete: deleteWorkspace
    },
    entityType:{
        create: createEntityType
    },
    attributeDefinition:{
        create: createAttributeDefinition
    }
};

