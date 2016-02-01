app.controller('EventCtrl', ['$scope', '$mdSidenav', 'Event', 'event', '$routeParams', 'User', function($scope, $mdSidenav, Event, event, $routeParams, User) {


    var me = $scope;
    me.eventId = $routeParams.id;
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
        Event.register(me.eventId, User.getUserId());
    };

    me.unregister = function(helperId){
        Event.unregister(me.eventId, helperId);
    };

    $mdSidenav('left').open();
}]);
