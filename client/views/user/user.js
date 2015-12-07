app.controller('UserCtrl', ['$scope', 'User', '$routeParams', function($scope, User, $routeParams) {


    var me = $scope;
    me.user = User.get({id: 'dd'}, function() {
        console.log(JSON.stringify(me.user));
    });

    me.roles = [
        {id: 'helper', label: 'Helfer'},
        {id: 'team', label: 'Team'},
        {id: 'organizer', label: 'Organisator'}
    ];

    for(var i = 0; i<me.roles.length; i++)
       if(me.roles[i].id == $routeParams.role)
           me.selectedRole = me.roles[i];




    me.genders = [{id: 'male', label: 'Herr'},{id: 'female', label: 'Frau'}];

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
    return $resource('/api/user/:id');
});