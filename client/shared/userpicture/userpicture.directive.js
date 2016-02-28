app.directive('userPicture', function() {
    return {
        scope: {
            picture: '@'
        },
        replace: true,
        template: '<div><user-avatar ng-if="!picture"></user-avatar>'+
                  '<img ng-if="picture" data-ng-src="{{picture}}" height="64" width="64" style="border-radius: 32px;"/><span></span>'+
                   '</div>'
    };
});
