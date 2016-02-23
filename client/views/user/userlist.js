app.controller('UserListCtrl', ['$scope', '$mdSidenav', 'userlist', 'User', function($scope, $mdSidenav, userlist, User) {


    var me = $scope;
    me.userlist = userlist;
    me.roles = User.roles;
    me.addVisible = User.isOrganizer();

    me.selectedTabNr = 1;
    me.$watch('selectedTabNr', function(newValue) {
        me.selectedRole = me.roles[me.selectedTabNr];
        me.breadcrumb = 'Personalverwaltung > '+ me.selectedRole.label;
    });

    me.isSelectedRole = function(user){
        return me.selectedRole.id == user.role;
    }

    me.selectUser = function(id){
        window.location.href = '#/user/'+me.selectedRole.id.toLowerCase()+'/'+id;
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

