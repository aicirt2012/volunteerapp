app.controller('AddEventCtrl', ['$scope', '$mdSidenav', 'Event', '$mdpDatePicker', '$mdpTimePicker', 'Organization', function($scope, $mdSidenav, Event, $mdpDatePicker, $mdpTimePicker, Organization) {

    var me = $scope;
    me.event = {
        title: '',
        place: '',
        startdate: new Date(),
        enddate: new Date(),
        nrhelpers:1,
        description:'',
        organization:'',
        important:false
    };

    me.submitAddEvent = function(){
        if(me.event.description == '')
            me.event.description = null;
        Event.save(me.event, function(){
            console.log('event created');
        })
        window.location.href = '#/eventcalendar';
    }

    me.showCancel = function(){
        window.location.href = '#/eventcalendar';
    }

    me.pickStartTime = function(ev) {
        $mdpTimePicker(ev, me.event.startdate).then(function(time) {
            time.setSeconds(0);
            time.setMilliseconds(0);
            me.startTime = time;
            me.event.startdate.setHours(time.getHours());
            me.event.startdate.setMinutes(time.getMinutes());
        });
    }

    me.pickStartDay = function(ev) {
        $mdpDatePicker(ev, me.event.startdate).then(function(date) {
            me.startDay = date;
            me.event.startdate.setDate(date.getDate());
            me.event.startdate.setMonth(date.getMonth());
            me.event.startdate.setFullYear(date.getFullYear());
            //Also set end day for better usability
            me.endDay = date;
            me.event.enddate.setDate(date.getDate());
            me.event.enddate.setMonth(date.getMonth());
            me.event.enddate.setFullYear(date.getFullYear());
        });
    }

    me.pickEndTime = function(ev) {
        $mdpTimePicker(ev, me.event.endTime).then(function(time) {
            time.setSeconds(0);
            time.setMilliseconds(0);
            me.endTime = time;
            me.event.enddate.setHours(time.getHours());
            me.event.enddate.setMinutes(time.getMinutes());
        });
    }

    me.pickEndDay = function(ev) {
        $mdpDatePicker(ev, me.event.endDay).then(function(date) {
            me.endDay = date;
            me.event.enddate.setDate(date.getDate());
            me.event.enddate.setMonth(date.getMonth());
            me.event.enddate.setFullYear(date.getFullYear());
        });
    }

    me.myDate = new Date();

    me.back = function(){
        window.location.href = '#/eventcalendar';
    }

    me.loadOrganizations = function () {
        return Organization.list().$promise.then(
            function (organizations) {
                me.organizationlist = organizations;
            });
    }

    $mdSidenav('left')
        .open();

    me.breadcrumb = function(){
        return 'Eventverwaltung > Neues Event';
    }


}]);

