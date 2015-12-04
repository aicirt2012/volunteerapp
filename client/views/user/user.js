app.controller('UserCtrl', ['$scope', '$resource', 'User', function($scope, $resource, User) {


    var me = $scope;
    me.userlist = User.get(function() {
        console.log(JSON.stringify(me.userlist));
    });


    me.selectedRoleTab = 1;

    me.gender = [{id: 'male', label: 'Herr'},{id: 'female', label: 'Frau'}];


    me.$watch('selectedRoleTab', function(newValue, oldValue) {
        switch (newValue){
            case 0: me.selectedRole = 'Helfer'; break;
            case 1: me.selectedRole = 'Team'; break;
            case 2: me.selectedRole = 'Organisator'; break;
        }
        console.log('Role: '+me.selectedRole);
    });


    me.load = function(){
/*
        var User = $resource('api/user/:userId', {userId:'@id'});
        var user = User.get({userId:123}, function() {
            user.abc = true;
        });
*/


    }



}]);

app.service('User', function($resource) {
    return $resource('/api/user');
});