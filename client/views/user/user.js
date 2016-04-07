app.controller('UserCtrl', ['$scope', '$mdSidenav', 'User', '$routeParams', 'user', 'userevents', '$mdDialog', function ($scope, $mdSidenav, User, $routeParams, user, userevents, $mdDialog) {


    var me = $scope;
    // extracted from backend modules/validator/lib/isMobilePhone.js
    me.phoneSchema = /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/;
    me.user = user;
    me.user.genderLabel = User.userGenderLabel(user);
    me.user.roleLabel = User.userRoleLabel(user.role);
    me.newUserRole = me.user.role;
    me.genders = User.genders;
    me.roles = User.roles;
    me.selectedTabNr = 0;
    me.editMode = false;
    me.editVisible = User.isAdmin() || User.isOrganizer();
    me.accountView = false;
    me.isAdmin = User.isAdmin();
    me.tabs = [
        {id: 'personaldata', label: 'Persönliche Daten'},
        {id: 'availability', label: 'Verfügbarkeit'},
        {id: 'events', label: 'Events'}
    ];

    me.futureevents = [];
    me.pastevents = [];

    for (var i = 0; i < userevents.length; i++) {
        var e = userevents[i];
        var now = new Date().getTime();
        var eDate = new Date(e.startdate).getTime();
        if (now < eDate)
            me.futureevents.push(e);
        else
            me.pastevents.push(e);
    }

    me.openEdit = function () {
        me.editMode = true;
    }

    me.abortEdit = function () {
        me.editMode = false;
    }

    me.selectEvent = function (eventId) {
        window.location.href = '#/event/' + eventId;
    }

    me.submitPersonalData = function () {
        User.update(me.user.id, me.user)
            .$promise
            .then(function success() {
                me.editMode = false;
            })
            .catch(function error(err) {
                switch (err.status) {
                    case 409:
                        var preset = $mdDialog
                            .alert()
                            .title('Konflikt')
                            .textContent('Die ausgewählte E-Mail existiert bereits für einen anderen Nutzer.')
                            .ok('Ok');
                        $mdDialog.show(preset);
                        break;
                }
            });
    }

    me.deleteUser = function () {
        $mdDialog.show({
            controller: function ($scope, $mdDialog, user) {
                $scope.user = user;
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.deleteUser = function () {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/user/dialogDeleteUser.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            locals: {
                user: me.user
            }
        }).then(function () {
            User.del(me.user.id, function () {
                window.location.href = '#/user';
            });
        });
    }

    me.submitPhotoUpload = function (dataUrl) {
        me.pictureButtonsDisabled = true;

        User.updatePicture(me.user.id, dataUrl)
            .$promise
            .then(function () {
                me.user.picture = dataUrl;
                me.editMode = false;
            })
            .catch(showErrorAlert)
            .finally(function () {
                me.pictureButtonsDisabled = false;
            });
    };

    me.askDeleteProfileImage = function ($event) {
        var preset = $mdDialog.confirm()
            .title('Profilbild löschen')
            .textContent('Wollen Sie wirklich das Profilbild löschen?')
            .ok('Ja')
            .cancel('Nein!')
            .targetEvent($event);

        $mdDialog
            .show(preset)
            .then(deleteProfileImage);
    };

    function deleteProfileImage() {
        me.pictureButtonsDisabled = true;

        User.updatePicture(me.user.id, undefined)
            .$promise
            .then(function () {
                me.user.picture = undefined;
            })
            .catch(showErrorAlert)
            .finally(function () {
                me.pictureButtonsDisabled = false;
            });
    }

    function showErrorAlert() {
        var preset = $mdDialog.alert()
            .title('Ein Fehler ist aufgetreten')
            .textContent('Das Foto konnte nicht gelöscht werden. Bitte versuchen Sie es noch einmal.')
            .ok('Ok');

        $mdDialog.show(preset);
    }


    me.resetPw = function (helper) {
        $mdDialog.show({
            controller: function ($scope, $mdDialog, user) {
                $scope.user = user;
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.resetPw = function () {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/user/dialogResetPw.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            locals: {
                user: me.user
            }
        }).then(function () {
            User.resetPw(me.user.id, function () {
            });
        });
    };

    me.changeRole = function (newUserRole) {
        $mdDialog.show({
            controller: function ($scope, $mdDialog, User, user) {
                $scope.user = user;
                $scope.newUserRole = newUserRole;
                $scope.newUserRoleLabel = User.userRoleLabel(newUserRole);
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.changeRole = function () {
                    $mdDialog.hide($scope.newUserRole);
                };
            },
            templateUrl: '/views/user/dialogChangeRole.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            locals: {
                user: me.user,
                newUserRole: me.newUserRole
            }
        }).then(function (newUserRole) {
            User.changeRole(me.user.id, newUserRole, function () {
            });
            window.location.href = '#/user';
        });
    };

    me.toggleSidenav = function (componentId) {
        $mdSidenav(componentId).open();
    }

    $mdSidenav('left').open();

}]);
