app.controller('LogCtrl', ['$scope', '$mdSidenav', 'logs', function($scope, $mdSidenav, logs) {


    var me = $scope;
    console.log(JSON.stringify(logs));
    me.logs = logs;


    me.breadcrumb = function(){
        return 'Systemlog';
    };

    $mdSidenav('left').open();

}]);


