app.controller('UserCtrl', ['$scope', '$mdSidenav', 'User', '$routeParams', 'user', 'userevents', '$mdDialog', function($scope, $mdSidenav, User, $routeParams, user, userevents, $mdDialog) {


    var me = $scope;
    me.user = user;
    me.user.genderLabel = User.userGenderLabel(user);
    me.user.roleLabel = User.userRoleLabel(user);
    me.genders = User.genders;
    me.roles = User.roles;
    me.selectedTabNr = 1;
    me.editMode = false;
    me.editVisible = User.isAdmin() || User.isOrganizer();
    me.tabs = [
        {id: 'personaldata', label: 'Persönliche Daten'},
        {id: 'availability', label: 'Verfügbarkeit'},
        {id: 'events', label: 'Events'}
    ];

    me.futureevents = [];
    me.pastevents = [];

    for(var i=0; i< userevents.length; i++){
        var e = userevents[i];
        var now = new Date().getTime();
        var eDate = new Date(e.startdate).getTime();
        if(now< eDate)
            me.futureevents.push(e);
        else
            me.pastevents.push(e);
    }

    me.openEdit = function(){
        me.editMode = true;
    }

    me.abortEdit = function(){
        me.editMode = false;
    }

    me.selectEvent = function(eventId){
        window.location.href = '#/event/'+eventId;
    }

    me.submitPersonalData = function(){
        User.update(me.user.id, me.user, function(){
            console.log('user updated');
        });
        me.editMode = false;
    }

    me.submitPhotoUpload = function (dataUrl) {
        me.user.picture = dataUrl;
        User.updatePicture(me.user.id, me.user.picture, function(){
            me.editMode = false;
        });
    }


    me.resetPw = function(helper){
        $mdDialog.show({
            controller: function ($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.resetPw = function() {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/user/dialogResetPw.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function() {
            User.resetPw(me.user.id, function(){});
        });
    };



    $mdSidenav('left').open();

}]);
