var express = require('express');
var http = require('../util/http');
var async = require('async');
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

function createAttributeDefinition(workspaceId, typeId, name, type, multiplicity, cb) {
    var data = {
        name: name,
        attributeType: type,
        multiplicity: multiplicity
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

function createEnity(typeId){
    var data = {
        name: 'HansEv',
        attributes: [{name: 'age', values: [18]}]
    };
    http.post('/entityTypes/'+typeId+'/entities', data, function (err, res, body) {

    });
}

module.exports = {
    create: function(cb){
        var workspaceId = config.sc.workspaceId;
        var entityTypeId = {
            organization: 'scorganization',
            user: 'scuser',
            event: 'scevent'
        };
        var types = {
            text : 'Text',
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
            setTimeout(function(){
                createAttributeDefinition(workspaceId, entityTypeId.organization, 'name', types.number, multiplicity.exactlyOne, cb);
            }, 3000);
        });
        asyncTasks.push(function(cb){
            setTimeout(function(){
                createAttributeDefinition(workspaceId, entityTypeId.organization, 'address', types.text, multiplicity.exactlyOne, cb);
            }, 3000);
        });
        /*
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
        */
        async.series(asyncTasks, function(err){
            cb();
        });


    }

};

