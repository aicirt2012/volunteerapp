app.controller('MyDataCtrl', ['$scope', '$mdSidenav', 'user', 'User', 'MyData', 'Upload', '$timeout', '$mdDialog', function ($scope, $mdSidenav, user, User, MyData, Upload, $timeout, $mdDialog) {


    var me = $scope;

    // extracted from backend modules/validator/lib/isMobilePhone.js
    me.phoneSchema = /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/;
    me.editMode = false;
    me.user = user;
    me.user.genderLabel = User.userGenderLabel(user);
    me.genders = User.genders;


    me.breadcrumb = function () {
        return 'Meine Daten';
    };

    me.abortEdit = function () {
        me.user = me.userCopy;
        me.editMode = false;
    };

    me.openEdit = function () {
        me.userCopy = JSON.parse(JSON.stringify(me.user));
        me.editMode = true;
    };

    me.submitPersonalData = function () {
        MyData.personal.update({
            gender: me.user.gender,
            name: me.user.name,
            tel: me.user.tel,
            mobil: me.user.mobil,
            email: me.user.email
        }).$promise
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
                    case 400:
                        preset = $mdDialog
                            .alert()
                            .title('Validierungsfehler')
                            .textContent('Die Daten des Formulars wurden vom Server nicht angeommen. Bitte überprüfen Sie alle Daten und versuchen Sie es dann erneut.')
                            .ok('Ok');
                        break;
                }
            });
    };

    me.submitAvailability = function () {
        MyData.availability.update(me.user.availability);
        me.editMode = false;
    };

    me.submitPhotoUpload = function (dataUrl) {
        me.pictureButtonsDisabled = true;

        MyData.photo.save({picture: dataUrl})
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
            .textContent('Wollen Sie wirklich Ihr Profilbild löschen?')
            .ok('Ja')
            .cancel('Nein!')
            .targetEvent($event);

        $mdDialog
            .show(preset)
            .then(deleteProfileImage);
    };

    function deleteProfileImage() {
        me.pictureButtonsDisabled = true;

        MyData.photo.save({picture: undefined})
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

    $mdSidenav('left').open();
}]);
