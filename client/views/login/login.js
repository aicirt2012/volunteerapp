app.controller('LoginCtrl', ['$scope', 'User', '$routeParams', '$mdSidenav', function($scope, User, $routeParams, $mdSidenav) {

    console.log($mdSidenav('left'));
    $mdSidenav('left').toggle();
    var me = $scope;
    console.log('login');

    me.login = function(){
        console.log(me.email+" "+me.pw);
    }


}]);

