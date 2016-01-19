app.controller('EventCtrl', ['$scope', '$mdSidenav', 'Event', 'event', '$routeParams', function($scope, $mdSidenav, Event, event, $routeParams) {


    var me = $scope;
    me.currentId = $routeParams.id;
    me.event = event;
    console.log(JSON.stringify(event));
    //TODO load this form backend
    me.event.helpers = [
        {name: 'Felix Michel', date: ''}, {name: 'Niklas', data: ''}, {name: 'albert', date: ''}
    ]
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
        Event.register({id: me.currentId}, {
            helperId:'e0d0z60fjjyh'
        });
    };

    me.unregister = function(){
        Event.unregister({id: me.currentId}, {helperId:'c3ztqpdyu86k'});
    };

    $mdSidenav('left').open();
}]);
