app.config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/event', {
                templateUrl: 'views/event/event.html'
                //controller: 'EventCtrl'
            })
            .when('/user/', {redirectTo: '/user/helper'})
            .when('/user/:role', {
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