app.controller('DashboardCtrl', ['$scope', '$mdSidenav', 'overview', function($scope, $mdSidenav, overview) {


    var me = $scope;
    me.overview = overview;
    me.description = false;

    me.breadcrumb = function(){
        return 'Dashboard';
    };

    $mdSidenav('left').open();

}]);


