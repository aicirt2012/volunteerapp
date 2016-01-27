app.controller('AddEventCtrl', ['$scope', '$mdSidenav', 'Event', function($scope, $mdSidenav, Event) {

    var me = $scope;
    me.event = {
        title: '',
        place: '',
        startdate: new Date(),
        enddate: new Date(),
        nrhelpers:1,
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

    me.saveStartDate = function(date){
        if(date) {
            me.event.startdate.setDate(date.getDate());
            me.event.startdate.setMonth(date.getMonth());
            me.event.startdate.setFullYear(date.getFullYear());
        }
    }

    me.saveStartTime = function(time){
        if(time) {
            me.event.startdate.setHours(time.getHours());
            me.event.startdate.setMinutes(time.getMinutes());
        }
    }

    me.saveEndDate = function(date){
        if(date) {
            me.event.enddate.setDate(date.getDate());
            me.event.enddate.setMonth(date.getMonth());
            me.event.enddate.setFullYear(date.getFullYear());
        }
    }

    me.saveEndTime = function(time){
        if(time) {
            me.event.enddate.setHours(time.getHours());
            me.event.enddate.setMinutes(time.getMinutes());
        }
    }

    me.myDate = new Date();


    $mdSidenav('left')
        .open();

    me.breadcrumb = function(){
        return 'Eventverwaltung > Neues Event';
    }


}]);

