app.controller('LoginCtrl', ['$scope', 'Login', '$mdSidenav', function($scope, Login, $mdSidenav) {

    var me = $scope;

    me.login = function(){
        Login.save({email: me.email, pw: me.pw}, function(data){
            console.log('saved',data.hallo);
        });
    }


}]);

app.service('Login', function($resource) {
    return $resource('/api/login');
});

