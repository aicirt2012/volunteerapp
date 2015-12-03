app.controller('UserCtrl', ['$http', '$scope', '$location', '$resource', function($http, $scope, $location, $resource) {



    var me = $scope;
    me.selectedRoleTab = 1;
    me.userview = 'listview';




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
    }


    me.load = function(){
        console.log('load');
        var User = $resource('/user/:userId', {userId:'@id'});
        var user = User.get({userId:123}, function() {
            console.log('loaded');
            user.abc = true;
        });
    }

    me.load();




}]);