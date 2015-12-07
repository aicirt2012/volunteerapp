app.controller('LoginCtrl', ['$scope', 'User', '$mdSidenav', function($scope, User, $mdSidenav) {

    console.log($mdSidenav('left'));
    $mdSidenav('left').toggle();
    var me = $scope;
    console.log('login');
    

    me.login = function(){
        console.log(me.email+" "+me.pw);
    }


}]);

