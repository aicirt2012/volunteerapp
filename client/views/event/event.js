'use strict';

angular.module('myApp.event', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'views/event/event.html',
            controller: 'EventCtrl'
        });
    }])

    .controller('EventCtrl', [function() {

    }]);