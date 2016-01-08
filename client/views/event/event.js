app.controller('EventCtrl', ['$http', '$scope', '$mdSidenav', '$location', '$filter', '$http', '$q', 'EventList', function($http, $scope, $mdSidenav, $location, $filter, $http, $q, EventList) {



    var me = $scope;

    me.eventlist = EventList.query();
    me.selectedDate = null;
    me.firstDayOfWeek = 0;
    me.dayFormat = "d";
    me.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    me.tooltips = true;

    me.testDate = me.eventlist[0];

    for(var currentEvent in me.eventlist){
        //var d = new Date(event.startdate);
      // me.testDate = currentEvent;
        /*if(d === date){
         me.testDate = event;
         return event.title;
         }*/
    }

    me.showAdd = function(){
        window.location.href = '#/addevent';
    }

    $mdSidenav('left')
        .open();

    me.setDirection = function(direction) {
        me.direction = direction;
        me.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    me.dayClick = function(date) {
        me.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
    };

    me.prevMonth = function(data) {
        me.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    me.nextMonth = function(data) {
        me.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    me.setDayContent = function(date) {

        // You would inject any HTML you wanted for
        // that particular date here.
        //var event = null;


        /*for(var event in me.eventlist){
            var d = new Date(event.startdate);
            me.testDate = event;
            if(d === date){
                me.testDate = event;
                return event.title;
            }
        }*/
        //return me.eventlist.get;

        //return me.eventlist;

    };


}]);

app.service('EventList', function($resource) {
    return $resource('/api/event/list');
});