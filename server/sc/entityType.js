var express = require('express');
var http = require('../util/http');
var async = require('async');
var config = require('../../config');
var SocioCortex = require('../sc/SocioCortex');

/** Note: EntityTypeId is similar with EntityTypeName etc.  */

module.exports = {
    define: function (attributes, entityTypeId){
         return {
            findById: function(id, cb){
                console.log('find byid');
            },
            findAll: function(cb){
                console.log('find all');
                SocioCortex.entity.find(entityTypeId, attributes, function(err, entities){
                    var results = [];
                    for(var i=0; i< entities.length; i++){
                        var e = entities[i];
                        var r = {};
                        r.id = e.id;
                        for(var j=0; j< e.attributes.length; j++) {
                            var attribute = e.attributes[j];
                            r[attribute.name] = attribute.values[0];
                        }
                        results.push(r);
                    }
                    cb(err, results);
                });
            },
            find: function(query, cb){
                var data = {expression: 'find '+entityTypeId+' .where('+query+')'};
                SocioCortex.workspace.mxl(config.sc.workspaceId, data, cb);
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

