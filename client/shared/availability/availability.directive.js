app.directive('availability', function() {
    return {
        scope: {
            data: '='
        },
        replace: true,
        templateUrl: '/shared/availability/availability.html'
    };
});