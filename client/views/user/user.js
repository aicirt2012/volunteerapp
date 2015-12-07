app.controller('UserCtrl', ['$scope', 'User', function($scope, User) {


    var me = $scope;
    me.user = User.get({id: 'dd'}, function() {
        console.log(JSON.stringify(me.user));
    });


    me.genders = [{id: 'male', label: 'Herr'},{id: 'female', label: 'Frau'}];

    me.tabs = [
        {id: 'personaldata', label: 'Persönliche Daten'},
        {id: 'availability', label: 'Verfügbarkeit'},
        {id: 'events', label: 'Events'}
    ];
    me.selectedTabNr = 1;


    me.$watch('selectedTabNr', function(newValue) {
        console.log('Tab: '+me.selectedRole);
    });



}]);

app.service('User', function($resource) {
    return $resource('/api/user/:id');
});