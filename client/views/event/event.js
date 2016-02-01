app.controller('EventCtrl', ['$scope', '$mdSidenav', 'Event', 'event', 'User', function($scope, $mdSidenav, Event, event, User) {


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
}]);
