app.controller('EventCalendarCtrl', ['$scope', '$mdSidenav', 'eventlist', function($scope, $mdSidenav, eventlist) {



    var me = $scope;
    me.eventList = eventlist;

    me.selectedDate = null;
    me.firstDayOfWeek = 0;
    me.dayFormat = "d";
    me.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    me.tooltips = true;


    me.setDirection = function(direction) {
        me.direction = direction;
        me.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    me.dayClick = function(date) {
        //var dateString = formatDate(date);
        for(var i=0; i < me.eventList.length; i++) {
            var event = me.eventList[i];
            var startdate = new Date(event.startdate);
            if (startdate.getDate() == date.getDate() &&
                startdate.getMonth() == date.getMonth() &&
                startdate.getYear() == date.getYear()) {
                window.location.href = '#/event/' + event.id;
            }
        }
    };

    me.prevMonth = function(data) {
        me.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    me.nextMonth = function(data) {
        me.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    me.setDayContent = function(date) {
        for(var i=0; i < me.eventList.length; i++) {
            var event = me.eventList[i];
            var startdate = new Date(event.startdate);
            console.log("startdate: ", startdate);
            console.log("date: ", date);
            if( startdate.getDate() == date.getDate() &&
                startdate.getMonth() == date.getMonth() &&
                startdate.getYear() == date.getYear()) {
                return event.title;
            }
        }
    };



    me.selectEvent = function(id){
        window.location.href = '#/event/'+id;
    };

    me.showAdd = function(){
        window.location.href = '#/addevent';
    };

    $mdSidenav('left').open();

    me.breadcrumb = function(){
        return 'Eventverwaltung';
    };

    function formatDate(date){
        var day = date.getDate();
        var month = date.getMonth().valueOf()+1;
        if(day < 10)
            day = '0' + day;
        if(month < 10)
            month = '0' + month;
        return month + "-" + day +"-"+ date.getFullYear();
    }

}]);
