app.controller('UserCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {



    var me = $scope;
    me.selectedRoleTab = 1;
    me.userview = 'listview';


    me.$watch('selectedRoleTab', function(newValue, oldValue) {
        switch (newValue){
            case 0: me.selectedRole = 'Helfer'; break;
            case 1: me.selectedRole = 'Team'; break;
            case 2: me.selectedRole = 'Organisator'; break;
        }
        console.log('Role: '+me.selectedRole);
      // $location.path("/user/org", false);
    });







}]);