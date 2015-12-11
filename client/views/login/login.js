app.controller('LoginCtrl', ['$scope', 'Authenticate', '$mdSidenav', function($scope, Authenticate, $mdSidenav) {

    var me = $scope;

    me.login = function(){
        Authenticate.login({email: me.email, pw: me.pw}, function(data){
            console.log('saved',data);
        });
    }


}]);

app.service('Authenticate', function($resource) {
    var Login = $resource('/api/login');

    this.login = function(email, pw){
        var p = Login.save({
            email : email,
            pw: pw
        }).$promise;
        p.then(function(data){
            localStorage.setItem('JWT', data.token);
        },function(){
            console.error("fail@loginUser");
        });
        return p;
    };
});

