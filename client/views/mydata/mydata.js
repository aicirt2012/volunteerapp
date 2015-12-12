app.controller('MyDataCtrl', ['$scope', 'user', function($scope, user) {


    var me = $scope;
    me.user = user;

    me.breadcrumb = function(){
        return 'Meine Daten';
    }



}]);

