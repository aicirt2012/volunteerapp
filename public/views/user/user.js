'use strict';

angular.module('myApp.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', ['$http', '$scope', 'User', function($http, $scope, User) {

        var me = $scope;
        me.selectedRole = 'HELPER';
        me.setSelectedRole = function(role){
            me.selectedRole = role;
        }

        me.isSelectedRole = function(user){
           return user.role == me.selectedRole;
        }

        me.selectUser = function(user){
            me.selectedUser = user;
        }

        me.submitPersonalData = function(){

        }

        me.submitAvailability = function(){
            console.log(JSON.stringify(me.selectedUser));
        }


        User.query(function(users){
            console.log(JSON.stringify(users));
            me.users = users;
            me.users =    me.$apply;
        });



    }])

    .factory('User', function($resource) {
        return $resource('/api/user/list',  {});
    });