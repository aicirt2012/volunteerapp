app.directive('toolbar', function() {
    return {
        scope: {
            title: '@'
        },
        replace: true,
        templateUrl: '/shared/toolbar/toolbar.html',
        controller: 'ToolbarCtrl',
        bindToController: true
    };
});

app.controller('ToolbarCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {


    var me = $scope;

    $mdSidenav('left').open();

    me.toggleSidenav = function(componentId){
        $mdSidenav(componentId).open();
    }

}]);
