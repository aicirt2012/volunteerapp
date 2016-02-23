
app.controller('IndexCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdUtil', '$mdDialog', 'User', function($scope, $mdBottomSheet, $mdSidenav, $mdUtil, $mdDialog, User){
    var me = $scope;


    me.menu = [];

    User.me().then(function(data){
        me.user = data;
        me.user.roleLabel = User.roleLabel();

        if(User.isOrganizer() || User.isTeam() || User.isHelper())
            me.menu.push({
                link : 'eventcalendar',
                title: 'Eventkalender',
                icon: 'event'
            });

        if(User.isOrganizer() || User.isTeam())
            me.menu.push({
                link : 'user',
                title: 'Personalverwaltung',
                icon: 'group'
            });

        if(User.isOrganizer() || User.isTeam())
            me.menu.push({
                link : 'organization',
                title: 'Einrichtungsverwaltung',
                icon: 'home'
            });
    });

    $scope.leftOpen = false;

    me.mymenu = [
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
