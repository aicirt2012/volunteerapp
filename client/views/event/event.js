app.controller('EventCtrl', ['$scope', '$mdSidenav', 'Event', 'event', '$routeParams', function($scope, $mdSidenav, Event, event, $routeParams) {


    var me = $scope;
    me.currentId = $routeParams.id;
    me.event = event;
    console.log(JSON.stringify(event));
    //me.event.startTime = formatDate(me.event.startdate, me.event.starttime);
    //me.event.endTime = formatDate(me.event.enddate, me.event.endtime);

    me.breadcrumb = function(){
        return 'Eventverwaltung > ' + me.event.title;
    };


    /*function formatDate(day, time){
        var date = new Date(day + 'T' + time + ':00.000Z');
        return date;
    }*/

    me.register = function(){
        Event.register({id: me.currentId}, {helperId:'c3ztqpdyu86k'});
    };

    me.unregister = function(){
        Event.unregister({id: me.currentId}, {helperId:'c3ztqpdyu86k'});
    };

    $mdSidenav('left').open();
}]);
