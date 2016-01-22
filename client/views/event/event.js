app.controller('EventCtrl', ['$scope', '$mdSidenav', 'Event', 'event', '$routeParams', 'User', function($scope, $mdSidenav, Event, event, $routeParams, User) {


    var me = $scope;
    me.eventId = $routeParams.id;
    me.event = event;
    me.event.startdate = new Date(me.event.startdate);
    me.event.enddate = new Date(me.event.enddate);

    me.breadcrumb = function(){
        return 'Eventverwaltung > ' + me.event.title;
    };

    me.register = function(){
        Event.register({id: me.eventId}, {
            helperId: User.getUserId()
        });
    };

    me.unregister = function(){
        Event.unregister({id: me.eventId}, {helperId:'c3ztqpdyu86k'});
    };

    $mdSidenav('left').open();
}]);
