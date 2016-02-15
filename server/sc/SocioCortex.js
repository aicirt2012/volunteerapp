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
            console.log('Workspace Created');
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

function createAttributeDefinition(workspaceId, typeId, name, definition, cb) {
    var data = {
        name: name,
        attributeType: definition.type,
        options: definition.options
    };
    if(definition.multiplicity)
        data.multiplicity = definition.multiplicity;
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

function mxlWorkspace(workspaceId, entityTypeId, attributes, query, cb) {
    var data = {expression: 'find '+entityTypeId+' .where('+query+')'};
    http.post('/workspaces/' + workspaceId + '/mxlQuery?attributes=*&meta=', data, function (err, res, body) {
        if (err || res.statusCode != 200) {
            console.error('Error during mxl Query "' + JSON.stringify(data) + '"!');
            cb(err, null);
        } else {
            //console.log(JSON.stringify(body));
            cb(err, convertEntitiesToFlatJSON(attributes, body.value));
        }
    });
}

function mxlWorkspace2(workspaceId, query, attributes, cb) {
    var data = {expression: query};
    http.post('/workspaces/' + workspaceId + '/mxlQuery?attributes=*&meta=', data, function (err, res, body) {
        if (err || res.statusCode != 200) {
            console.error('Error during mxl Query "' + JSON.stringify(data) + '"!');
            cb(err, null);
        } else {
            console.log(JSON.stringify(body));
            cb(err, convertEntitiesToFlatJSON(attributes, body.value));
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

function updateEntity(entityId, attributes, data, cb){
    http.put('/entities/'+entityId, data, function (err, res, body) {
        if (err || res.statusCode != 200) {
            console.error('Error updating Entity "' + entityId + '"!');
            console.error(JSON.stringify(body));
        } else {
            console.log(JSON.stringify(body));
            cb(err, convertEntityToFlatJSON(attributes, body));
        }
    });
}

function findEntities(entityTypeId, attributes, cb){
    http.get('/entityTypes/'+entityTypeId+'/entities?attributes=*', function (err, res, body) {
        if (err || res.statusCode != 200) {
            console.error('Error listing all Entities "' + entityTypeId + '"!');
            console.error(body);
        } else {
            cb(err, convertEntitiesToFlatJSON(attributes, JSON.parse(body)));
        }
    });
}

function findEntityById(entityId, attributes, cb){
    http.get('/entities/'+entityId+'?attributes=*', function (err, res, body) {
        if (err || res.statusCode != 200) {
            console.error('Error finging Entity "' + entityId + '"!');
            console.error(body);
        } else {
            cb(err, convertEntityToFlatJSON(attributes, JSON.parse(body)));
        }
    });
}

//ToDO Remove this method, not needed anymore
function findAttributesByEntityId(entityId, cb){
    http.get('/entities/'+entityId+'/attributes', function (err, res, body) {
        if (err || res.statusCode != 200) {
            console.error('Error finging Attributes by Entity "' + entityId + '"!');
            console.error(body);
        } else {
            console.log(JSON.stringify(JSON.parse(body)));
            cb();
           // cb(err, convertEntityToFlatJSON(attributes, JSON.parse(body)));
        }
    });
}

function findAttributeIdByEntityIdAndAttibuteName(entityId, attributeName, cb){
    http.get('/entities/'+entityId+'/attributes', function (err, res, body) {
        if (err || res.statusCode != 200) {
            console.error('Error finging Attributes by Entity "' + entityId + '"!');
            console.error(body);
        } else {
            var attributes = JSON.parse(body);
            var attrId = null;
            for(var i =0; i<attributes.length; i++)
                if(attributes[i].name == attributeName) {
                    attrId = attributes[i].id;
                    break;
                }
            if(attrId != null)
                cb(err, attrId);
            else
                cb(new Error('Attribute name not found!'), null);
        }
    });
}

function createAttributeValue(entityId, attributeName, value, cb){
    findAttributeIdByEntityIdAndAttibuteName(entityId, attributeName, function(err, attrId){
        if(!err) {
            console.log(attrId);
            http.post('/attributes/' + attrId + '/values', value, function (err, res, body) {
                if (err || res.statusCode != 200) {
                    console.error('Error during creating Attribute '+attrId+' value "' + JSON.stringify(value)  + '"!');
                    console.error(body);
                    cb(err);
                } else
                    cb(err);
            });
        }else
            cb(err);
    });
}

function deleteAttributeValue(entityId, attributeName, value, cb){
    console.log('delAttibuteValue: '+entityId, attributeName, value);
    findAttributeIdByEntityIdAndAttibuteName(entityId, attributeName, function(err, attrId){
        if(!err) {
            console.log(attrId);
            http.del('/attributes/' + attrId + '/values', value, function (err, res, body) {
                if (err || res.statusCode != 200) {
                    console.error('Error during deleting Attribute '+attrId+' value "' + JSON.stringify(value)  + '"!');
                    console.error(body);
                    cb(err);
                } else
                    cb(err);
            });
        }else
            cb(err);
    });
}

function convertEntitiesToFlatJSON(attributes, entities){
    var results = [];
    for(var i=0; i< entities.length; i++)
        results.push(convertEntityToFlatJSON(attributes, entities[i]));
    return results;
}

function convertEntityToFlatJSON(attributes, entity){
    var e = entity;
    var r = {};
    for(var j=0; j< e.attributes.length; j++) {
        var attrInst = e.attributes[j];
        var attrDef = attributes[attrInst.name];
        if(attrDef && attrDef.multiplicity  && (attrDef.multiplicity == 'many' || attrDef.multiplicity == 'any')){
            r[attrInst.name] = [];
            for(var i=0; i<attrInst.values.length; i++)
                r[attrInst.name].push(attrInst.values[i]);
        }else
            r[attrInst.name] = attrInst.values[0];
    }
    r.id = e.id;
    return r;
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
    },
    entity:{
        create: createEntity,
        update: updateEntity,
        findById: findEntityById
    },
    entities:{
        find: findEntities
    },
    attribute:{
        value:{
            create: createAttributeValue,
            delete: deleteAttributeValue
        },
        findByEntity: findAttributesByEntityId,
        findByEntityAndAttributeName: findAttributeIdByEntityIdAndAttibuteName
    },
    mxl: mxlWorkspace,
    mxl2: mxlWorkspace2
};

