app.controller('EventCalendarCtrl', ['$http', '$scope', '$mdSidenav', '$location', '$filter', '$http', '$q', 'EventList', 'eventlist', function($http, $scope, $mdSidenav, $location, $filter, $http, $q, EventList, eventlist) {



    var me = $scope;

    me.selectedDate = null;
    me.firstDayOfWeek = 0;
    me.dayFormat = "d";
    me.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    me.tooltips = true;

    var json = [
        {
            "id": "dd",
            "title": "Kinoabend Ice Age 2",
            "place": "schleißheimerstraße 4",
            "startdate": "01-22-2016",
            "enddate": "01-22-2016",
            "starttime": "18:00",
            "endtime": "20:00",
            "anzhelper": 3,
            "description": "Wir planen eine Kinobesuch im Kino ...",
            "important": false
        },

        {
            "id": "ff",
            "title": "Fussballtunier",
            "place": "Alianz Arena",
            "startdate": "01-08-2016",
            "enddate": "01-08-2016",
            "starttime": "15:00",
            "endtime": "19:00",
            "anzhelper": 6,
            "description": "Wir planen ein Fussballtunier ...",
            "important": false
        }
    ];

    //me.eventList = EventList.query(function(){
    me.eventList = eventlist;
        me.testDate = me.eventList[0];

        me.setDirection = function(direction) {
            me.direction = direction;
            me.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
        };

        me.dayClick = function(date) {
            var dateString = formatDate(date);

            for(var i=0; i < eventlist.length; i++) {
                var event = eventlist[i];
                if(event.startdate == dateString){
                    window.location.href = '#/event/'+event.id;
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

            var dateString = formatDate(date);

            for(var i=0; i < me.eventList.length; i++) {
                var event = me.eventList[i];
                if(event.startdate == dateString){
                    return event.title;
                }
            }

        };


    //});

    me.selectEvent = function(id){
        window.location.href = '#/event/'+id;
    };

    /*me.setDayContent = function(date) {

        console.log(JSON.stringify(me.eventList));
        var dateString = formatDate(date);

        for(var i=0; i < me.eventList.length; i++) {
            var event = me.eventList[i];
            if(event.startdate == dateString){
                return event.title;
            }
        }

    };*/

    me.showAdd = function(){
        window.location.href = '#/addevent';
    };

    $mdSidenav('left')
        .open();

    me.breadcrumb = function(){
        return 'Eventverwaltung';
    };

    function formatDate(date){
        var day = date.getDate();
        var month = date.getMonth().valueOf()+1;
        if(day < 10){
            day = '0' + day;
        }
        if(month < 10){
            month = '0' + month;
        }
        return month + "-" + day +"-"
            + date.getFullYear();
    }


}]);

app.service('EventList', function($resource) {
    return $resource('/api/event/list');
});
