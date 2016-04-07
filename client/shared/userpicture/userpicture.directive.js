app.directive('userPicture', function () {
    return {
        scope: {
            picture: '@',
            size: '@'
        },
        link: function (scope, ele, attr) {
            scope.getStyle = function () {
                return {
                    "height": scope.size + "px",
                    "width": scope.size + "px",
                    "border-radius": (scope.size / 2) + "px"
                };
            };
        },
        replace: true,
        template: '<div><user-avatar ng-if="!picture" size="{{size}}"></user-avatar>' +
        '<img ng-style="getStyle()" ng-if="picture" data-ng-src="{{picture}}" style="opacity: 1"/>' +
        '</div>'
    };
});
