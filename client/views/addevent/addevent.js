app.controller('AddEventCtrl', ['$scope', '$mdSidenav', 'Event', function($scope, $mdSidenav, Event) {


    var me = $scope;
    me.event = {
        title: '',
        place: '',
        startdate:'2016-01-13:12:00.000Z',
        enddate:'2016-01-13T11:12:00.000Z',
        starttime:'',
        endtime:'',
        anzhelper:1,
        description:'',
        important:false
    };

    me.submitAddEvent = function(){
        Event.save(me.event, function(){
            console.log('event created');
        })
    }

    me.showCancel = function(){
        window.location.href = '#/eventcalendar';
    }

    me.myDate = new Date();


    $mdSidenav('left')
        .open();

    me.breadcrumb = function(){
        return 'Eventverwaltung > Neues Event';
    }


}]);
app.service('Event', function($resource) {
    return $resource('/api/event');
});

