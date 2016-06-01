app.controller('DashboardCtrl', ['$scope', '$mdSidenav', 'overview', 'Dashboard', function($scope, $mdSidenav, overview, Dashboard) {


    var me = $scope;
    me.overview = overview;
    me.description = false;

    me.breadcrumb = function(){
        return 'Dashboard';
    };

    $scope.$watch('selectedTabNr', function(current, old){
       if(current != old && current==1){
           console.log('load data');
           Dashboard.logs(function(logs) {
               console.log('finish loading',JSON.parse(JSON.stringify(logs)));
               me.logs = JSON.parse(JSON.stringify(logs));
           });
       }
    });

    $mdSidenav('left').open();

}]);


