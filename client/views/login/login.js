app.controller('LoginCtrl', ['$scope', 'User', '$mdSidenav', '$mdDialog', function($scope, User, $mdSidenav, $mdDialog) {

    var me = $scope;

    //TODO Remove only for simple testing
    me.email = 'user2@tum.de';
    me.pw = '123';
    me.inAction = false;

    me.login = function(email, pw){
        me.inAction = true;
        User.login(email, pw).then(function(data){
            //me.inAction = false;
            $scope.$parent.initMenu();
            window.location.href = '#/eventcalendar';
        }, function(){
            me.inAction = false;
            console.log('login failed');
        });
    }

    me.openContact = function(){
        $mdDialog.show({
            controller: function ($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.close = function() {
                    $mdDialog.cancel();
                };
            },
            templateUrl: '/views/login/dialogContact.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        });
    };

    me.openImpressum = function(){
        $mdDialog.show({
            controller: function ($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.close = function() {
                    $mdDialog.cancel();
                };
                $scope.datenschutz = function() {
                    $mdDialog.cancel();
                    me.openDatenschutz();
                }
            },
            templateUrl: '/views/login/dialogImpressum.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        });
    };

    me.openDatenschutz = function(){
        $mdDialog.show({
            controller: function ($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.close = function() {
                    $mdDialog.cancel();
                };
            },
            templateUrl: '/views/login/dialogDatenschutz.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        });
    };

    $mdSidenav('left').close();

}]);

