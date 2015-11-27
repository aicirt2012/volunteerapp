app.config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/event', {
                templateUrl: 'views/event/event.html'
                //controller: 'EventCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
}]);