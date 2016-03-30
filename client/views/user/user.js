app.controller('UserCtrl', ['$scope', '$mdSidenav', 'User', '$routeParams', 'user', 'userevents', '$mdDialog', function ($scope, $mdSidenav, User, $routeParams, user, userevents, $mdDialog) {


    var me = $scope;
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
        me.user.picture = compressB64PNG(dataUrl);
        User.updatePicture(me.user.id, me.user.picture, function (err) {
            if(err) {
                console.error(err);
            }
            me.editMode = false;
        });

        function compressB64PNG(b64Url) {
            var size = 64;

            var img = new Image;
            img.src = b64Url;

            var cvs = document.createElement('canvas');
            cvs.height = size;
            cvs.width = size;

            var ctx = cvs.getContext('2d');
            ctx.drawImage(img, 0, 0, size, size);

            // a png can not have a quality (png is a lossless compression)
            // giving a compression value will return a invalid png
            // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
            var b64UrlCompressed = cvs.toDataURL();

            // console.log('uncompressed size: ' + b64Url.length);
            // console.log('compressed size: ' + b64UrlCompressed.length);
            // console.log(b64UrlCompressed);
            return b64UrlCompressed;
        }
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
