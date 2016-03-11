app.controller('LoginCtrl', ['$scope', 'User', '$mdSidenav', '$mdDialog', function($scope, User, $mdSidenav, $mdDialog) {

    var me = $scope;

    //TODO Remove only for simple testing
    me.email = 'user2@tum.de';
    me.pw = '123';

    me.login = function(){
        User.login(me.email, me.pw).then(function(data){
            $scope.$parent.initMenu();
            window.location.href = '#/eventcalendar';
        }, function(){
            console.log('login failed');
        });
    }

    me.openImpressum = function(){
        $mdDialog.show({
            controller: function ($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.close = function() {
                    $mdDialog.cancel();
                };
            },
            templateUrl: '/views/login/dialogImpressum.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        });
    };

    $mdSidenav('left').close();

}]);

