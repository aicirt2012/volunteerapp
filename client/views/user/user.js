app.controller('UserCtrl', ['$http', '$scope', function($http, $scope) {

    var me = $scope;

    me.selectRole = function(role){
        console.log('help');
        window.location.href = '#/user/'+role;
    };





}]);