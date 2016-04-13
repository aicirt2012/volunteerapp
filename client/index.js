
app.controller('IndexCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdUtil', '$mdDialog', 'User', '$mdMedia', function($scope, $mdBottomSheet, $mdSidenav, $mdUtil, $mdDialog, User, $mdMedia){
    var me = $scope;

    me.menu = [];
    me.mymenu = [];

    // if the window is going to be smaller than md hide sidenav
    // and vice versa
    $scope.$watch(function() { return $mdMedia('gt-md')}, function(newVal, oldVal, scope) {
        if(newVal === false && oldVal === true) {
            $mdSidenav('left').close();
        } else if(newVal === true && oldVal === false) {
            $mdSidenav('left').open();
        }
    });

    me.initMenu = function(){
        User.me().then(function(data){
            me.user = data;
            me.user.roleLabel = User.roleLabel();
            me.menu = [];
            if(User.isAdmin() || User.isOrganizer() || User.isTeam() || User.isHelper())
                me.menu.push({
                    link : 'eventcalendar',
                    title: 'Eventkalender',
                    icon: 'event'
                });

            if(User.isAdmin() || User.isOrganizer() || User.isTeam())
                me.menu.push({
                    link : 'user',
                    title: 'Personalverwaltung',
                    icon: 'group'
                });

            if(User.isAdmin() || User.isOrganizer() || User.isTeam())
                me.menu.push({
                    link : 'organization',
                    title: 'Einrichtungsverwaltung',
                    icon: 'home'
                });
            if(User.isAdmin())
                me.menu.push({
                    link : 'log',
                    title: 'Systemlog',
                    icon: 'rotate_right'
                });
        });
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
    }

    if(User.isLoggedIn()){
        me.initMenu();
    }

    me.leftOpen = false;


    me.openView = function(url){
        if(url == 'logout'){
            User.logout();
            window.location.href = '#/login';
            me.leftOpen = false;
        }else
            window.location.href = '#/'+url;
        me.leftOpen = true;
    };


}]);
