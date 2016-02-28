app.directive('userPicture', function() {
    return {
        scope: {
            picture: '@',
            size: '@'
        },
        replace: true,
        template: '<div><user-avatar ng-if="!picture" size="{{size}}"></user-avatar>'+
                  '<img ng-if="picture" data-ng-src="{{picture}}" height="{{size}}" width="{{size}}" style="border-radius: {{size/2}}px;"/><span></span>'+
                   '</div>'
    };
});
