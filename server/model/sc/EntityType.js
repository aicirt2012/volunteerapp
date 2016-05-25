var express = require('express');
var http = require('../util/http');
var async = require('async');
var config = require('../../config');
var SocioCortex = require('../model/sc/SocioCortex');


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
            find2: function(query, cb){
                SocioCortex.mxl2(config.sc.workspaceId, query, attributes, cb);
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
            update: function(entityId, attrs, cb){
                var data = {
                    id: entityId,
                    attributes: []
                };
                var keys = Object.keys(attrs);
                for(var i=0; i<keys.length; i++){
                    var key = keys[i];

                    //TODO check if attr belong to model
                    var value = attrs[key];
                    data.attributes.push({name: key, values: [value]});
                }
                SocioCortex.entity.update(entityId, attributes, data, cb)
            },
            delete: function(entityId, cb){
                SocioCortex.entity.delete(entityId, cb);
            },
            addAttributeValue: function(entityId, attrName, value, cb){
                SocioCortex.attribute.value.create(entityId, attrName, value, cb);
            },
            delAttributeValue: function(entityId, attrName, value, cb){
                SocioCortex.attribute.value.delete(entityId, attrName, value, cb);
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
                update: function(){},
                delete: function(){}
            }

        }
    }
};

