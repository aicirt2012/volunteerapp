app.controller('EventCtrl', ['$scope', '$mdSidenav', 'Event', 'event', 'User', '$mdDialog', function($scope, $mdSidenav, Event, event, User, $mdDialog) {


    var me = $scope;
    me.editMode = false;
    me.isOrganizer = User.isOrganizer();
    me.isTeam = User.isTeam();
    me.isHelper = User.isHelper();

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

    me.userlist = User.list(function(users){
        me.userlist = users;
    });


    me.openEdit = function(){
        me.eventCopy = me.event;
        me.editMode = true;
    }

    me.abortEdit = function(){
        me.editMode = false;
        me.event = me.eventCopy;
    }

    me.submitEdit = function(){
        me.editMode = false;
        //TODO update event here
    }

    me.breadcrumb = function(){
        return 'Eventverwaltung > Event';
    };

    $mdSidenav('left').open();

    me.back = function(){
        window.location.href = '#/eventcalendar';
    }


    me.helperRegister = function(ev) {
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
            templateUrl: '/views/event/dialogHelperRegister.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
                event: me.event
            }
        }).then(function() {
            //TODO cahnge this here
            Event.register(me.event.id, User.getUserId());
        });
    };

    me.helperUnregister = function(helperId){
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
            templateUrl: '/views/event/dialogHelperUnregister.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
                event: me.event
            }
        }).then(function() {
            //TODO change this here
            Event.unregister(me.event.id, helperId);
        });
    };

    me.meRegister = function(ev) {
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
            templateUrl: '/views/event/dialogMeRegister.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
               event: me.event
            }
        }).then(function() {
            Event.register(me.event.id, User.getUserId());
        });
    };

    me.meUnregister = function(helperId){
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
            templateUrl: '/views/event/dialogMeUnregister.html',
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
}]);
