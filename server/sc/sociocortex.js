var express = require('express');
var http = require('../util/http');
var async = require('async');
var config = require('../../config');
var schema = require('../sc/schema');

/** Note: EntityTypeId is similar with EntityTypeName etc.  */

module.exports = {
    model: function (attributes, entityTypeId){
         return {
            findById: function(id, cb){
                console.log('find byid');
            },
            findAll: function(id, cb){
                console.log('find all');
            },
            find: function(query, cb){
                var data = {expression: 'find '+entityTypeId+' .where('+query+')'};
                schema.workspace.mxl(config.sc.workspaceId, data, cb);
            },
            save: function(attributes, cb){
                var data = {
                    name: 'HansEv',
                    attributes: [{name: 'age', values: [18]}]
                };
                http.post('/entityTypes/'+entityTypeId+'/entities', data, function (err, res, body) {

                });
            },
            update: function(attributs, cb){
                console.log('update instance');
            },
            schema:{
                create: function(cb){
                    var asyncTasks = [];
                    asyncTasks.push(function(cb){
                        schema.entityType.create(config.sc.workspaceId, entityTypeId, cb);
                    });
                    var names = Object.keys(attributes);
                    for(var i=0; i< names.length; i++){
                        var name = names[i];
                        var type = attributes[name];
                        asyncTasks.push(function(cb){
                            schema.entityType.create(config.sc.workspaceId, entityTypeId, name, type, cb)
                        });
                    }
                    async.series(asyncTasks, function(err){
                        console.log('schema "'+entityTypeId+'" successfully created!');
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

