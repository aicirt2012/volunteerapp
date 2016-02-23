app.controller('EventCtrl', ['$scope', '$mdSidenav', 'Event', 'event', 'User', '$mdDialog', function($scope, $mdSidenav, Event, event, User, $mdDialog) {


    var me = $scope;
    me.editMode = false;
    me.editVisible = User.isOrganizer();
    me.helperListVisible = User.isOrganizer();

    me.event = event;
    me.event.startdate = new Date(me.event.startdate);
    me.event.startdate.setSeconds(0);
    me.event.startdate.setMilliseconds(0);
    me.event.enddate = new Date(me.event.enddate);
    me.event.enddate.setSeconds(0);
    me.event.enddate.setMilliseconds(0);
    if(me.event.organization) {
        me.event.organization = JSON.parse(me.event.organization);
    }

    me.edit = function(){
        me.editMode = true;
    }

    me.breadcrumb = function(){
        return 'Eventverwaltung > Event';
    };

    me.register = function(){
        Event.register(me.event.id, User.getUserId());
    };

    me.unregister = function(helperId){
        $mdDialog.show({
            controller: function ($scope, $mdDialog, event) {
                $scope.event = event;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.unregister = function() {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/event/dialogUnregister.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
                event: me.event
            }
        }).then(function() {
            Event.unregister(me.event.id, helperId);
        });
    };

    $mdSidenav('left').open();

    me.back = function(){
        window.location.href = '#/eventcalendar';
    }


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
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/event/dialogRegister.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
               event: me.event
            }
        }).then(function() {
             me.register();
        });
    };
}]);
