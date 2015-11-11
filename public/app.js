'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngResource',
  'ngRoute',
  'myApp.event',
  'myApp.login',
  'myApp.user',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
