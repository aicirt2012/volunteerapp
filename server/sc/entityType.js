var express = require('express');
var http = require('../util/http');
var async = require('async');
var config = require('../../config');
var SocioCortex = require('../sc/SocioCortex');


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
        var attribute = e.attributes[j];
        r[attribute.name] = attribute.values[0];
    }
    r.id = e.id;
    return r;
}

/** Note: EntityTypeId is similar with EntityTypeName etc.  */
module.exports = {
    define: function (attributes, entityTypeId){
         return {
            findById: function(entityId, cb){
                SocioCortex.entity.findById(entityId, attributes, cb);
            },
            findAll: function(cb){
                SocioCortex.entities.find(entityTypeId, attributes, cb);
            },
            find: function(query, cb){
                SocioCortex.mxl(config.sc.workspaceId, entityTypeId, attributes, query, cb);
            },
            save: function(attrs, cb){
                var keys = Object.keys(attrs);
                var formattedAttrs = [];
                for(var i=0; i<keys.length; i++){
                    var key = keys[i];
                    var value = attrs[key];
                    formattedAttrs.push({name: key, values: [value]});
                }
                var data = {
                    name: entityTypeId+'_'+new Date().getTime(),
                    attributes: formattedAttrs
                };
                SocioCortex.entity.create(entityTypeId, data, cb)
            },
            update: function(attributes, cb){
                console.log('update instance');
            },
            schema:{
                create: function(cb){
                    var asyncTasks = [];
                    asyncTasks.push(function(cb){
                        SocioCortex.entityType.create(config.sc.workspaceId, entityTypeId, cb);
                    });
                    asyncTasks.push(function(cb){
                        var names = Object.keys(attributes);
                        async.forEach(names, function(name, cb){
                            var type = attributes[name];
                            SocioCortex.attributeDefinition.create(config.sc.workspaceId, entityTypeId, name, type, cb)
                        }, function(err){
                            cb();
                        });
                    });
                    async.series(asyncTasks, function(err){
                        console.log('Schema "'+entityTypeId+'" successfully created!');
                        cb();
                    });
                },
                update: function(){

                },
                delete: function(){

                }
            }

        }
    }
};

