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

app.controller('ToolbarCtrl', ['$scope', '$mdSidenav', '$mdMedia', function($scope, $mdSidenav, $mdMedia) {


    var me = $scope;

    $mdSidenav('left').open();

    me.hideSidenavButton = function(componentId) {
        return $mdMedia('gt-md') && $mdSidenav(componentId).isOpen();
    };

    me.toggleSidenav = function(componentId){
        $mdSidenav(componentId).open();
    }

}]);
