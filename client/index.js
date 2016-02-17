
app.controller('IndexCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdUtil', '$mdDialog', 'User', function($scope, $mdBottomSheet, $mdSidenav, $mdUtil, $mdDialog, User){
    var me = $scope;


    me.user = User.me();

    $scope.leftOpen = false;

    me.menu = [
        {
            link : 'eventcalendar',
            title: 'Eventkalender',
            icon: 'event'
        },
        {
            link : 'user',
            title: 'Personalverwaltung',
            icon: 'group'
        },
        {
            link : 'organization',
            title: 'Einrichtungsverwaltung',
            icon: 'home'
        }
    ];
    me.admin = [
        {
            link : 'myevents',
            title: 'Meine Events',
            icon: 'event_available'
        },
        {
            link : 'mydata',
            title: 'Meine Daten',
            icon: 'settings'
        },
        {
            link: 'logout',
            title: 'Logout',
            icon: 'logout'
        }
    ];
    me.openView = function(url){
        if(url == 'logout'){
            User.logout();
            window.location.href = '#/login';
            $scope.leftOpen = false;
        }else
            window.location.href = '#/'+url;
            $scope.leftOpen = true;
    };


}]);
