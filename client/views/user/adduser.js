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
        },
        conditionsofuse: false
    };

    me.onCancel = function(){
        window.location.href = '#/user';
    }

    me.breadcrumb = function(){
        return 'Personalverwaltung > Benutzer Anlegen';
    };

    me.submitAddUser = function(){
        if(me.user.tel == '')
            me.user.tel = null;
        if(me.user.mobil == '')
            me.user.mobil = null;
        if(me.user.notes == '')
            me.user.notes = null;
        User.save(me.user, function(){
            console.log('user created');
        })
        window.location.href = '#/user';
    };

    me.back = function(){
        window.location.href = '#/user';
    }

    $mdSidenav('left').open();

}]);


