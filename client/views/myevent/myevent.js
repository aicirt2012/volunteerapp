app.controller('MyEventCtrl', ['$scope', '$mdSidenav', 'myevents', 'MyData', function($scope, $mdSidenav, myevents, MyData) {


    var me = $scope;
    me.futureevents = [];
    me.pastevents = [];

    for(var i=0; i< myevents.length; i++){
        var e = myevents[i];
        var now = new Date().getTime();
        var eDate = new Date(e.startdate).getTime();
        if(now> eDate)
            me.pastevents.push(e);
        else
            me.futureevents.push(e);
    }


    me.breadcrumb = function(){
        return 'Meine Events';
    }

    me.selectEvent = function(eventId){
        window.location.href = '#/event/'+eventId;
    }


    $mdSidenav('left').open();

}]);

