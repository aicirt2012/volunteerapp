app.controller('MyEventCtrl', ['$scope', '$mdSidenav', 'myevents', 'MyData', function($scope, $mdSidenav, myevents, MyData) {


    var me = $scope;
    me.myevents = myevents;


    me.breadcrumb = function(){
        return 'Meine Events';
    }



    me.submitPersonalData = function(){
        MyData.personal.update({
            gender: me.user.gender,
            name: me.user.name,
            tel: me.user.tel,
            mobil: me.user.mobil,
            email: me.user.email
        });
        console.log(JSON.stringify($flow.files[0]));
    }




    $mdSidenav('left').open();

}]);

