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
            cb(err);
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
            cb(err);
        }
    });
}

function createEntityType(workspaceId, typeId, cb){
    var data = {name: typeId, namePlural: typeId, id: typeId};
    http.post('/workspaces/'+workspaceId+'/entityTypes/', data, function(err, res, body){
        if(err || res.statusCode != 200){
            console.error('Error during creating EntityType "'+typeId+'" in workspace "'+workspaceId+'"!');
            console.error(body);
        }else{
            console.log('EntityType created');
            cb(err);
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
            cb(err);
        }
    });
}

function mxlWorkspace(workspaceId, data, cb) {
    http.post('/workspaces/' + workspaceId + '/mxlQuery', data, function (err, res, body) {
        if (err || res.statusCode != 200) {
            console.error('Error during mxl Query "' + JSON.stringify(data) + '"!');
            cb(err, null);
        } else {
            cb(err, JSON.parse(body));
        }
    });
}

function createEntity(entityTypeId, data, cb){
    http.post('/entityTypes/'+entityTypeId+'/entities', data, function (err, res, body) {
        if (err || res.statusCode != 200) {
            console.error('Error during creating Entity "' + entityTypeId + '"!');
            console.error(body);
        } else {
            cb(err);
        }
    });
}

module.exports = {
    workspace:{
        create: createWorkspace,
        delete: deleteWorkspace,
        mxl: mxlWorkspace
    },
    entityType:{
        create: createEntityType
    },
    attributeDefinition:{
        create: createAttributeDefinition
    },
    entity:{
        create: createEntity
    },
    attribute:{

    }
};
