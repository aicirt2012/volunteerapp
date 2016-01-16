app.controller('LoginCtrl', ['$scope', 'Authenticate', '$mdSidenav', function($scope, Authenticate, $mdSidenav) {

    var me = $scope;

    //TODO Remove only for simple testing
    me.email = 'user1@tum.de';
    me.pw = '123';

    me.login = function(){
        Authenticate.login(me.email,me.pw).then(function(data){
            console.log('logged in',data);
            window.location.href = '#/user';
        }, function(){
            console.log('login failed');
        });
    }

    $mdSidenav('left')
        .close();



}]);

