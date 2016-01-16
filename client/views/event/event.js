app.controller('EventCtrl', ['$scope', '$mdSidenav', 'event', '$routeParams', function($scope, $mdSidenav, event, $routeParams) {


    var me = $scope;
    //$routeParams.id;
    me.currentId = $routeParams.id;
    //rme.event = Event.get(me.currentId);
    me.event = event;
    console.log(JSON.stringify(event));
    console.log($routeParams.id);
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

    };

    me.unregister = function(){

    };

    $mdSidenav('left')
        .open();
}]);

app.service('Event', function($resource) {
    var Event = $resource('/api/event/:id');
    var EventHelper = $resource('/api/event/:id/register');
    return {
        save: Event.save,
        get: Event.get,
        register: EventHelper.save
    }
});