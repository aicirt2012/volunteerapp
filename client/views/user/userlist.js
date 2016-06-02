app.controller('UserListCtrl', ['$scope', '$mdSidenav', 'userlist', 'User', function($scope, $mdSidenav, userlist, User) {


    var me = $scope;
    me.userlist = userlist;
    me.roles = User.roles;
    me.isAdmin = User.isAdmin();
    me.searchText = "";

    var start = new Date();
    setTimeout( function () {
        console.log('Process time: ' + (new Date() - start));
    });

    me.selectedTabNr = 0;
    me.$watch('selectedTabNr', function(newValue) {
        me.selectedRole = me.roles[me.selectedTabNr];
        me.breadcrumb = 'Personalverwaltung > '+ me.selectedRole.label;
    });

    me.filterUser = function(user){
        var roleBool = me.selectedRole.id == user.role;
        var nameBool = true;
        var telBool = true;
        var mobilBool = true;
        var emailBool = true;
        if(me.searchText != "") {
            nameBool = user.name.toLowerCase().indexOf(me.searchText.toLowerCase()) > -1;
            emailBool = user.email.indexOf(me.searchText.toLowerCase()) > -1;
            if(user.tel)
                telBool = user.tel.indexOf(me.searchText) > -1;
            else
                telBool = false;
            if(user.mobil)
                mobilBool = user.mobil.indexOf(me.searchText) > -1;
            else
                mobilBool = false;
        }
        return roleBool && (nameBool || emailBool || telBool || mobilBool);
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

    me.highlight = function(search, text){
        if (search)
            return text.replace(new RegExp('('+search+')', 'gi'),'<b>$1</b>');
        else
            return text;
    }

    $mdSidenav('left').open();

}]);

