app.directive('toolbar', function() {
    return {
        scope: {
            title: '@',
            picture: '@'
        },
        replace: true,
        templateUrl: '/shared/toolbar/toolbar.html'
    };
});