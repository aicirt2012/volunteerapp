var express = require('express');
var http = require('../util/http');
var async = require('async');
var config = require('../../config');

/** Note: EntityTypeId is similar with EntityTypeName etc.  */

module.exports = {
    model: function (attibutes, entityTypeId){
         var workspaceId = config.sc.workspaceId;
         return {
            attributes: attibutes,
            findById: function(id, cb){
                console.log('find byid');
            },
            findAll: function(id, cb){
                console.log('find all');
            },
            find: function(query, cb){
                var data = {expression: 'find '+entityTypeId+' .where('+query+')'};
                http.post('/workspaces/'+workspaceId+'/mxlQuery', data, function(err, res, body){
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

