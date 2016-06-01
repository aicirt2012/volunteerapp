app.controller('EventCalendarCtrl', ['$scope', '$mdSidenav', 'eventlist', 'User', 'Util', function($scope, $mdSidenav, eventlist, User, Util) {


    var me = $scope;
    me.events = eventlist;
    for(var i=0; i<me.events.length; i++){
        var e = me.events[i];
        me.events[i].duration = Util.diffInH(e.startdate, e.enddate);
        me.events[i].description = Util.shortenDescription(me.events[i].description);
    }

    me.selectedDate = null;
    me.firstDayOfWeek = 0;
    me.dayFormat = "d";
    me.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    me.tooltips = true;
    me.isCalendarView = false;


    me.toggleView = function(){
        me.isCalendarView = !me.isCalendarView;
    }

    me.setDirection = function(direction) {
        me.direction = direction;
        me.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    me.dayClick = function(date) {
        for(var i=0; i < me.events.length; i++) {
            var event = me.events[i];
            var startdate = new Date(event.startdate);
            if (startdate.getDate() == date.getDate() &&
                startdate.getMonth() == date.getMonth() &&
                startdate.getYear() == date.getYear()) {
                window.location.href = '#/event/' + event.id;
            }
        }
    };

    me.selectEvent = function(eventId){
        window.location.href = '#/event/' + eventId;
    }

    me.prevMonth = function(data) {
        me.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    me.nextMonth = function(data) {
        me.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    me.setDayContent = function(date) {
        for(var i=0; i < me.events.length; i++) {
            var e = me.events[i];
            var s = new Date(e.startdate);
            if( s.getDate() == date.getDate() && s.getMonth() == date.getMonth() &&  s.getYear() == date.getYear())
                return e.title;
        }
    };

    me.selectEvent = function(id){
        window.location.href = '#/event/'+id;
    };

    me.addVisible = User.isOrganizer() || User.isAdmin();

    me.add = function(){
        window.location.href = '#/addevent';
    };


    me.toggleSidenav = function(componentId){
        $mdSidenav(componentId).open();
    }

    $mdSidenav('left').open();

    me.breadcrumb = function(){
        return 'Eventkalender';
    };


}]);
