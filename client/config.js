app.config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/event', {
                templateUrl: 'views/event/event.html',
                controller: 'EventCtrl'
            })
            .when('/adduser', {
                templateUrl: 'views/adduser/adduser.html',
                controller: 'AddUserCtrl'
            })
            .when('/user/', {
                redirectTo: '/user/helper'

            })
            .when('/user/:role', {
                templateUrl: 'views/userlist/userlist.html',
                controller: 'UserlistCtrl'
            })
            .when('/user/:role/:id', {
                templateUrl: 'views/user/user.html',
                controller: 'UserCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
}]);

app.config(function($mdThemingProvider) {
    var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        })
        .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);