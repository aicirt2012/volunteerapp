app.controller('UserlistCtrl', ['$scope', 'UserList', function($scope, UserList) {


    var me = $scope;

    me.userlist = UserList.query();

    me.roles = [
        {id: 'helper', label: 'Helfer'},
        {id: 'team', label: 'Team'},
        {id: 'orga', label: 'Organisator'}
    ];

    me.selectedTabNr = 1;
   // me.selectedRole = me.roles[1];
    me.$watch('selectedTabNr', function(newValue) {
        me.selectedRole = me.roles[me.selectedTabNr];
        me.breadcrumb = 'Personalverwaltung > '+ me.selectedRole.label;
    });

    me.isSelectedRole = function(user){
        return me.selectedRole.id == user.role;
    }

    me.selectUser = function(id){
        window.location.href = '#/user/'+me.selectedRole.id+'/'+id;
    }
}]);

app.service('UserList', function($resource) {
    return $resource('/api/user/list');
});