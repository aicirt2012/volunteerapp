app.controller('UserCtrl', ['$scope', '$mdSidenav', 'User', '$routeParams', 'user', 'userevents', function($scope, $mdSidenav, User, $routeParams, user, userevents) {


    var me = $scope;
    me.user = user;
    me.genders = User.genders;
    me.roles = User.roles;
    me.selectedTabNr = 1;
    me.tabs = [
        {id: 'personaldata', label: 'Persönliche Daten'},
        {id: 'availability', label: 'Verfügbarkeit'},
        {id: 'events', label: 'Events'}
    ];

    me.futureevents = [];

    for(var i=0; i< userevents.length; i++){
        var e = userevents[i];
        var now = new Date().getTime();
        var eDate = new Date(e.startdate).getTime();
        if(now< eDate)
            me.futureevents.push(e);
    }

    for(var i = 0; i<User.roles.length; i++)
       if(User.roles[i].id == $routeParams.role)
           me.selectedRole = User.roles[i];

    me.selectEvent = function(eventId){
        window.location.href = '#/event/'+eventId;
    }

    me.onCancel = function(){
        window.location.href = '#/user';
    }

    me.submitPersonalData = function(){
        User.update(me.user.id, me.user, function(){
            console.log('user updated');
        })
    }

    me.breadcrumb = function(){
        return 'Personalverwaltung > '+me.selectedRole.label + ' > ' + me.user.name;
    }

    $mdSidenav('left').open();

}]);
