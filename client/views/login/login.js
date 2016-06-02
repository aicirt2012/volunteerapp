app.controller('LoginCtrl', ['$scope', 'User', '$mdSidenav', '$mdDialog', 'deviceDetector', function($scope, User, $mdSidenav, $mdDialog, deviceDetector) {

    var me = $scope;
    me.inAction = false;
    me.data = deviceDetector;
    me.hideBrowserInfo = false;

    me.login = function(email, pw){
        me.inAction = true;
        User.login(email, pw).then(function(data){
            $scope.$parent.initMenu();
            window.location.href = '#/eventcalendar';
        }, function(){
            me.inAction = false;
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

