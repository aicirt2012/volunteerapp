'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngMaterial',
    'ngMdIcons',
    'ngResource',
    'ngRoute',
  'myApp.event',
  'myApp.login',
  'myApp.user',
  'myApp.version',
    'myApp.index'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
