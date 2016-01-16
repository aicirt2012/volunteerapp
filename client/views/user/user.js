app.controller('UserCtrl', ['$scope', '$mdSidenav', 'User', '$routeParams', 'user', function($scope, $mdSidenav, User, $routeParams, user) {


    var me = $scope;

    me.user = user;


    me.genders = User.genders;
    me.roles = User.roles;

    for(var i = 0; i<User.roles.length; i++)
       if(User.roles[i].id == $routeParams.role)
           me.selectedRole = User.roles[i];

    me.tabs = [
        {id: 'personaldata', label: 'Persönliche Daten'},
        {id: 'availability', label: 'Verfügbarkeit'},
        {id: 'events', label: 'Events'}
    ];
    me.selectedTabNr = 1;


    me.$watch('selectedTabNr', function(newValue) {
        console.log('Tab: ');
    });

    me.breadcrumb = function(){
        return 'Personalverwaltung > '+me.selectedRole.label + ' > ' + me.user.name;
    }

    $mdSidenav('left')
        .toggle();

    $mdSidenav('left')
        .open();

}]);

