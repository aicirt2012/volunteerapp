app.controller('LogCtrl', ['$scope', '$mdSidenav', 'log', function($scope, $mdSidenav, log) {


    var me = $scope;
    me.log = log;


    me.breadcrumb = function(){
        return 'Systemlog';
    };

    $mdSidenav('left').open();

}]);


