app.controller('AddUserCtrl', ['$scope', '$mdSidenav', 'User', function($scope, $mdSidenav, User) {


    var me = $scope;
    me.user = {
        gender: '',
        name: '',
        tel: '',
        mobil: '',
        email: '',
        notes: '',
        availability: {
            "mo": {"morning": false, "afternoon": false, "evening": false},
            "tu": {"morning": false, "afternoon": false, "evening": false},
            "we": {"morning": false, "afternoon": false, "evening": false},
            "th": {"morning": false, "afternoon": false, "evening": false},
            "fr": {"morning": false, "afternoon": false, "evening": false},
            "sa": {"morning": false, "afternoon": false, "evening": false},
            "su": {"morning": false, "afternoon": false, "evening": false}
        }
    };





    me.breadcrumb = function(){
        return 'Personalverwaltung > Benutzer Anlegen';
    };

    me.submitAddUser = function(){
        User.save(me.user, function(){
            console.log('user created');
        })
    };

    $mdSidenav('left')
        .open();



}]);
app.service('User', function($resource) {
    return $resource('/api/user');
});


