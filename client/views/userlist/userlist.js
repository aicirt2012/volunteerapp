app.controller('UserlistCtrl', ['$http', '$scope', '$location', '$resource', 'UserList', function($http, $scope, $location, $resource, UserList) {

    console.log('userlist');
    var me = $scope;
    me.userlist = UserList.query(function() {
        console.log(JSON.stringify(me.userlist));
    });


    me.selectedRoleTab = 1;



    me.gender = [{id: 'male', label: 'Herr'},{id: 'female', label: 'Frau'}];


    me.role = [
        {id: 'helper', label: 'Helfer'},
        {id: 'team', label: 'Team'},
        {id: 'orga', label: 'Organisator'}
    ];

    me.$watch('selectedRoleTab', function(newValue, oldValue) {
        switch (newValue){
            case 0: me.selectedRole = 'Helfer'; break;
            case 1: me.selectedRole = 'Team'; break;
            case 2: me.selectedRole = 'Organisator'; break;
        }
        console.log('Role: '+me.selectedRole);
    });


    me.selectUser = function(id){
        window.location.href = '#/user/helper/'+id;
    }



}]);

app.service('UserList', function($resource) {
    return $resource('/api/user/list');
});