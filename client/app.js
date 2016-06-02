var app = angular.module('VolunteerApp', ['ngMaterial', 'ngMdIcons', 'ngRoute', 'materialCalendar', 'ngSanitize', 'ngResource', 'angular-jwt', 'base64', 'ngFileUpload', 'ngImgCrop', 'mdPickers', 'ngMessages', 'angulartics', 'angulartics.google.analytics', 'ng.deviceDetector']);

app.config(function ($mdThemingProvider) {
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

app.run(['$route', '$rootScope', '$location', 'User', function ($route, $rootScope, $location, User) {
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


    // redirect to eventcalendar if user is already logged in
    $rootScope.$on('$routeChangeStart', function (event, futureRoute, currentRoute) {
        var route = (futureRoute.$$route || {}).originalPath;
        if (User.isLoggedIn() && route === '/login') {
            // interrupt current routing
            event.preventDefault();
            // route to event calendar
            $location.path('/eventcalendar');
        }
    });
}]);

app.config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = function () {
        return localStorage.getItem('JWT');
    }
    $httpProvider.interceptors.push('jwtInterceptor');
});

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
}]);


app.factory('authInterceptorService', ['$q', '$location', function ($q, $location) {
    var responseError = function (rejection) {
        if (rejection.status === 403) {
            localStorage.removeItem("JWT");
            window.location.href = '#/login';
        }
        return $q.reject(rejection);
    };
    return {
        responseError: responseError
    };
}]);
