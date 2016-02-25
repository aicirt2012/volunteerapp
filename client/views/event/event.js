app.controller('EventCtrl', ['$scope', '$mdSidenav', 'Event', 'event', 'User', 'Util', '$mdDialog', function($scope, $mdSidenav, Event, event, User, Util, $mdDialog) {


    var me = $scope;
    me.editMode = false;
    me.isOrganizer = User.isOrganizer();
    me.isTeam = User.isTeam();
    me.isHelper = User.isHelper();

    me.event = event;
    me.event.startdate = Util.initDateFromJSON(me.event.startdate);
    me.event.enddate = Util.initDateFromJSON(me.event.enddate);

    console.log(JSON.stringify(me.event));
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
            Event.register(me.event.id, User.getUserId(), function(){
                if(err){
                    console.error('Error during registering helper on event!');
                }else{
                    /*TODO
                    console.log('Update Event data after registering helper!');
                    me.event = data;
                    me.event.startdate = Util.initDateFromJSON(me.event.startdate);
                    me.event.enddate = Util.initDateFromJSON(me.event.enddate);
                    */
                }
            });
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
            Event.register(me.event.id, User.getUserId(), function(data){
                console.log(JSON.stringify(me.event));
                me.event = data;
                me.event.startdate = Util.initDateFromJSON(me.event.startdate);
                me.event.enddate = Util.initDateFromJSON(me.event.enddate);
            });
        });
    };

    me.meUnregister = function(){
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
            console.log('unregister ', me.event.id, User.getUserId());
            Event.unregister(me.event.id, User.getUserId(), function(){
                me.event = data;
                me.event.startdate = Util.initDateFromJSON(me.event.startdate);
                me.event.enddate = Util.initDateFromJSON(me.event.enddate);
            });
        });
    };
}]);
