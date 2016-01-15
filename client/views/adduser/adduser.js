app.controller('AddUserCtrl', ['$scope', '$mdSidenav', 'User', function($scope, $mdSidenav, User) {


    var me = $scope;

    me.genders = User.genders;

    me.user = {
        gender: '',
        name: '',
        tel: '',
        mobil: '',
        email: '',
        notes: '',
        role: 'helper',
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
        console.log("Before save: " + JSON.stringify(me.user));
        User.save(me.user, function(){
            console.log("After save: " + JSON.stringify(me.user));
            console.log('user created');
        })
    };

    $mdSidenav('left')
        .open();

}]);


