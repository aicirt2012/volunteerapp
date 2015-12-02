app.controller('UserCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {



    var me = $scope;
    me.selectedRoleTab = 1;


    me.$watch('selectedRoleTab', function(newValue, oldValue) {
        var role = null;
        switch (newValue){
            case 0: role = 'helper'; break;
            case 1: role = 'team'; break;
            case 2: role = 'org'; break;
        }
        console.log('Role: '+role);
      // $location.path("/user/org", false);
    });







}]);