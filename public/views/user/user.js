'use strict';

angular.module('myApp.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', ['$http', '$scope', function($http, $scope) {

        $scope.selectedRole = 'HELPER';
        $scope.setSelectedRole = function(role){
            $scope.selectedRole = role;
        }

        $scope.isSelectedRole = function(user){
           return user.role == $scope.selectedRole;
        }

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
                avalability: {
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
                role: "ORGA",
                avalability: {
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

/*
$http.get('/views/user/user.json', {}).then(function(data) {

},function(){});
/*
$http.get('/views/user/user.json').success(function(user){
    //console.log(JSON.stringify(user));
    JSON.parse(user);
});
*/
//        var User = $resource('/views/user/user.json',{});
  //      var user = User.get().than(function(data){
      //      console.log(JSON.stringify(user));
    //    });

    }]);