app.controller('AddUserCtrl', ['$scope', 'User', function($scope, User) {


    var me = $scope;
    me.user = User.get({id: 'dd'}, function() {
        console.log(JSON.stringify(me.user));
    });





    me.breadcrumb = function(){
        return 'Personalverwaltung > Benutzer Anlegen';
    }



}]);

