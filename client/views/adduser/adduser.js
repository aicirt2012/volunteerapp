app.controller('AddUserCtrl', ['$scope', 'User', function($scope, User) {


    var me = $scope;
    me.user = User.get({id: 'dd'}, function() {
        console.log(JSON.stringify(me.user));
    });

    me.genders = [{id: 'male', label: 'Herr'},{id: 'female', label: 'Frau'}];
    me.roles = [
        {id: 'helper', label: 'Helfer'},
        {id: 'team', label: 'Team'},
        {id: 'organizer', label: 'Organisator'}
    ];



    me.breadcrumb = function(){
        return 'Personalverwaltung > Benutzer Anlegen';
    }



}]);

