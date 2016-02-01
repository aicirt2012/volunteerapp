app.controller('LoginCtrl', ['$scope', 'User', '$mdSidenav', function($scope, User, $mdSidenav) {

    var me = $scope;

    //TODO Remove only for simple testing
    me.email = 'user1@tum.de';
    me.pw = '123';

    me.login = function(){
        User.login(me.email,me.pw).then(function(data){
            window.location.href = '#/user';
        }, function(){
            console.log('login failed');
        });
    }

    $mdSidenav('left').close();



}]);

