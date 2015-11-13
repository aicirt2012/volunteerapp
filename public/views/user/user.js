'use strict';

angular.module('myApp.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', ['$http', '$scope', '$resource', 'User', function($http, $scope, $resource, User) {

        $scope.selectedRole = 'HELPER';
        $scope.setSelectedRole = function(role){
            $scope.selectedRole = role;
        }

        $scope.isSelectedRole = function(user){
           return user.role == $scope.selectedRole;
        }

        $scope.selectUser = function(user){
            $scope.selectedUser = user;
        }

        $scope.submitPersonalData = function(){

        }

        $scope.submitAvailability = function(){
            console.log(JSON.stringify($scope.selectedUser));
        }

        
        User.query(function(data){
            console.log(JSON.stringify(data));
        });


        $scope.user =  [
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
        ];
    }])

    .factory('User', function($resource) {
        return $resource('/views/user/user.json',  {'get':  {method:'GET', isArray:true}});
    });