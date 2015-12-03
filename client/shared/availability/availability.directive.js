app.directive('availability', function() {
    return {
        scope: {
            title: '@'
        },
        replace: true,
        templateUrl: '/shared/availability/availability.html'
    };
});