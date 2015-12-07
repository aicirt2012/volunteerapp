app.controller('UserCtrl', ['$scope', 'User', '$routeParams', function($scope, User, $routeParams) {


    var me = $scope;
    me.user = User.get({id: 'dd'}, function() {
        console.log(JSON.stringify(me.user));
    });

    me.genders = User.genders;

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



}]);

app.service('User', function($resource) {

    var User = $resource('/api/user/:id');
    var genders = [{id: 'male', label: 'Herr'},{id: 'female', label: 'Frau'}];
    var roles = [
        {id: 'helper', label: 'Helfer'},
        {id: 'team', label: 'Team'},
        {id: 'organizer', label: 'Organisator'}
    ];

    return {
        genders: genders,
        roles: roles,
        get: User.get
    }
});