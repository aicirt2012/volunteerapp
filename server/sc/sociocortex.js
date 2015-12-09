var express = require('express');
var http = require('../util/http');
var async = require('async');


module.exports = {
    model: function (attibutes, modelName){
        var entityTypeId = modelName;
        return {
            attributes: attibutes,
            findById: function(id, cb){
                console.log('find byid');
            },
            findAll: function(id, cb){
                console.log('find all');
            },
            find: function(query, cb){
                console.log('find with query params');

                http.post('/workspaces/'+workspaceId+'/mxlQuery', {name:workspaceId, id:workspaceId}, function(err, res, body){
                    if(err)
                        console.err('Error during creating Workspace "'+workspaceId+'"!');
                    else {
                        cb();
                    }
                });
            },
            save: function(attributs, cb){
                console.log('create new instance');
            },
            update: function(attributs, cb){
                console.log('update instance');
            },
            schema:{
                create: function(){

                },
                update: function(){

                },
                delete: function(){

                }
            }

        }
    }
};

