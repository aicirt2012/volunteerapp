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


        var u = User.query(function(users){
            me.users = u.$re
            console.log(u);
                        /*
            me.users =  [
                {
                    id: "sdhfu309",
                    name: "Max Mustermann",
                    gender: "MALE",
                    email: "Maxmustermann@tum.de",
                    tel: "012378495",
                    mobil: "0723843434",
                    notes: "Some notes",
                    role: "HELPER",
                    availability: {
                        mo: {morning: true, afternoon: false, evening: false},
                        tu: {morning: true, afternoon: false, evening: false},
                        we: {morning: true, afternoon: false, evening: false},
                        th: {morning: true, afternoon: false, evening: false},
                        fr: {morning: true, afternoon: false, evening: false},
                        sa: {morning: true, afternoon: false, evening: false},
                        su: {morning: true, afternoon: false, evening: true}
                    },
                    events:[]
                },
                {
                    id: "sdhddfu309",
                    name: "Max Mustermann",
                    gender: "MALE",
                    email: "Maxmustermann@tum.de",
                    tel: "012378495",
                    mobil: "0723843434",
                    notes: "Some notes",
                    role: "ORGANIZER",
                    availability: {
                        mo: {morning: true, afternoon: false, evening: false},
                        tu: {morning: true, afternoon: false, evening: false},
                        we: {morning: true, afternoon: false, evening: false},
                        th: {morning: true, afternoon: false, evening: false},
                        fr: {morning: true, afternoon: false, evening: false},
                        sa: {morning: true, afternoon: false, evening: false},
                        su: {morning: true, afternoon: false, evening: true}
                    },
                    events:[]
                }
            ];*/
        });




        /*
        var u = User.query().then(function(users){
            console.log(users);
        },function(r){

        });
*/



    }])

    .factory('User', function($resource) {
        return $resource('/api/user/list');
    });