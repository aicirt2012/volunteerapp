'use strict';

angular.module('myApp.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'views/event/event.html',
            controller: 'EventCtrl'
        });
    }])

    .controller('EventCtrl', [function() {

    }]);