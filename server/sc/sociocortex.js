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
                http.post('/workspaces/'+config.sc.workspaceId+'/mxlQuery', data, function(err, res, body){
                    if(err) {
                        console.error('Error during mxl Query "' + JSON.stringify(data) + '"!');
                        cb(err, null);
                    }else {
                        cb(err, JSON.parse(body));
                    }
                });
            },
            save: function(attributs, cb){
                console.log('create new instance');
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
                        schema.createEntityType(config.sc.workspaceId, entityTypeId, cb);
                    });
                    var names = Object.keys(attributes);
                    for(var i=0; i< names.length; i++){
                        var name = names[i];
                        var type = attributes[name];
                        asyncTasks.push(function(cb){
                            schema.createAttributeDefinition(config.sc.workspaceId, entityTypeId, name, type, cb)
                        });
                    }
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

