app.controller('UserListCtrl', ['$scope', '$mdSidenav', 'userlist', function($scope, $mdSidenav, userlist) {


    var me = $scope;

    me.userlist = userlist;

    me.roles = [
        {id: 'helper', label: 'Helfer'},
        {id: 'team', label: 'Team'},
        {id: 'organizer', label: 'Organisator'}
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

    me.hasSelectedRole = function(){
        for(var i=0; i<me.userlist.length; i++)
            if (me.userlist[i].role == me.selectedRole.id)
                return true;
        return false;
    }

    me.addUser = function(){
        window.location.href = '#/adduser';
    }

    $mdSidenav('left').open();

}]);

