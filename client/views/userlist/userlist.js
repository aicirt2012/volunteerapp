app.controller('UserlistCtrl', ['$scope', '$resource', 'UserList', function($scope, $resource, UserList) {


    var me = $scope;

    me.userlist = UserList.query();

    me.roles = [
        {id: 'helper', label: 'Helfer'},
        {id: 'team', label: 'Team'},
        {id: 'orga', label: 'Organisator'}
    ];

    me.selectedTabNr = 1;
    me.$watch('selectedTabNr', function(newSelectedTabNr) {
        me.selectedTabNr = newSelectedTabNr;
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