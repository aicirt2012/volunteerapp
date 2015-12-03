app.controller('UserlistCtrl', ['$http', '$scope', '$location', '$resource', 'UserList', function($http, $scope, $location, $resource, UserList) {

    console.log('userlist');
    var me = $scope;
    me.userlist = UserList.query(function() {
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
      // $location.path("/user/org", false);
    });

    me.hello = function(){
        me.userview = 'detailview';
       // $location.path("/user/heler/id", false);
        window.location.href = '#/user/helper/id';
    }


    me.load = function(){
/*
        var User = $resource('api/user/:userId', {userId:'@id'});
        var user = User.get({userId:123}, function() {
            user.abc = true;
        });
*/


    }



}]);

app.factory('UserList', function($resource) {
    return $resource('/api/user/list');
});