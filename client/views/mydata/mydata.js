app.controller('MyDataCtrl', ['$scope', '$mdSidenav', 'user', 'User', 'MyData', function($scope, $mdSidenav, user, User, MyData) {


    var me = $scope;
    me.user = user;
    me.genders = User.genders;

    me.breadcrumb = function(){
        return 'Meine Daten';
    }

    me.onCancel = function(){
        window.location.href = '#/user';
    }

    me.submitPersonalData = function(){
        MyData.personal.update({
            gender: me.user.gender,
            name: me.user.name,
            tel: me.user.tel,
            mobil: me.user.mobil,
            email: me.user.email
        });
    }

    me.submitAvailability = function(){
        MyData.availability.update(me.user.availability);
    }

    $mdSidenav('left').open();

}]);

