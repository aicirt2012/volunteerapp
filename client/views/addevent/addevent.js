app.controller('AddEventCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {


    var me = $scope;
    me.event = {
        title: '',
        place: '',
        startdate:'',
        enddate:'',
        starttime:'',
        endtime:'',
        anzhelper:1,
        description:'',
        important:false
    };

    me.submitAddEvent = function(){
        Event.post(me.event, function(){
            console.log('event created');
        })
    };


    me.numbers = ('0 1 2 3 4 5 6 7 8 9 10').split(' ');

    me.myDate = new Date();


    $mdSidenav('left')
        .open();

    me.breadcrumb = function(){
        return 'Eventverwaltung > Neues Event';
    }


}]);


