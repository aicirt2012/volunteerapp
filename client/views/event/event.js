app.controller('EventCtrl', ['$scope', '$mdSidenav', 'Event', 'event', 'User', '$mdDialog', function($scope, $mdSidenav, Event, event, User, $mdDialog) {


    var me = $scope;
    me.event = event;
    me.event.startdate = new Date(me.event.startdate);
    me.event.startdate.setSeconds(0);
    me.event.startdate.setMilliseconds(0);
    me.event.enddate = new Date(me.event.enddate);
    me.event.enddate.setSeconds(0);
    me.event.enddate.setMilliseconds(0);

    me.breadcrumb = function(){
        return 'Eventverwaltung > ' + me.event.title;
    };

    me.register = function(){
        Event.register(me.event.id, User.getUserId());
    };

    me.unregister = function(helperId){
        Event.unregister(me.event.id, helperId);
    };

    $mdSidenav('left').open();




    $scope.showTabDialog = function(ev) {
        $mdDialog.show({
            controller: function ($scope, $mdDialog, event) {
                $scope.event = event;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.register = function() {
                    $mdDialog.hide('d');
                };
            },
            templateUrl: '/views/event/dialogRegister.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
               event: me.event
            }
        }).then(function(a) {
             me.register();
        }, function() {
            // dialog canceled
        });
    };
}]);
