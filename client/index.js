
app.controller('IndexCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdUtil', '$mdDialog', 'User', function($scope, $mdBottomSheet, $mdSidenav, $mdUtil, $mdDialog, User){
    var me = $scope;


    me.menu = [];
    me.mymenu = [];

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
                    icon: 'home'
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
        console.log('user is logged in');
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
