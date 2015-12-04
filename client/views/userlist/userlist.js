app.controller('UserlistCtrl', ['$scope', 'UserList', function($scope, UserList) {


    var me = $scope;

    me.userlist = UserList.query();

    me.roles = [
        {id: 'helper', label: 'Helfer'},
        {id: 'team', label: 'Team'},
        {id: 'orga', label: 'Organisator'}
    ];

    me.selectedTabNr = 1;
    me.$watch('selectedTabNr', function(newValue) {
        var role = me.roles[me.selectedTabNr];
        me.breadcrumb = 'Personalverwaltung > '+ role.label;
    });

    me.selectUser = function(id){
        var role = me.roles[me.selectedTabNr].id;
        window.location.href = '#/user/'+role+'/'+id;
    }
}]);

app.service('UserList', function($resource) {
    return $resource('/api/user/list');
});