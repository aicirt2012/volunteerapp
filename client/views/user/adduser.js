app.controller('AddUserCtrl', ['$scope', '$mdSidenav', 'User', '$mdDialog', function ($scope, $mdSidenav, User, $mdDialog) {


    var me = $scope;

    // extracted from backend modules/validator/lib/isMobilePhone.js
    me.phoneSchema = /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/;
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
            "mo": {"morning": true, "afternoon": true, "evening": true},
            "tu": {"morning": true, "afternoon": true, "evening": true},
            "we": {"morning": true, "afternoon": true, "evening": true},
            "th": {"morning": true, "afternoon": true, "evening": true},
            "fr": {"morning": true, "afternoon": true, "evening": true},
            "sa": {"morning": true, "afternoon": true, "evening": true},
            "su": {"morning": true, "afternoon": true, "evening": true}
        },
        conditionsofuse: false
    };

    me.onCancel = function () {
        window.location.href = '#/user';
    }

    me.breadcrumb = function () {
        return 'Personalverwaltung > Benutzer Anlegen';
    };

    me.submitAddUser = function () {
        if (me.user.tel == '')
            me.user.tel = null;
        if (me.user.mobil == '')
            me.user.mobil = null;
        if (me.user.notes == '')
            me.user.notes = null;
        User.save(me.user)
            .$promise
            .then(function () {
                window.location.href = '#/user';
            })
            .catch(function error(err) {
                var preset;
                switch (err.status) {
                    case 409:
                        preset = $mdDialog
                            .alert()
                            .title('Konflikt')
                            .textContent('Die ausgewählte E-Mail existiert bereits für einen anderen Nutzer.')
                            .ok('Ok');
                        break;
                    case 400:
                        preset = $mdDialog
                            .alert()
                            .title('Validierungsfehler')
                            .textContent('Die Daten des Formulars wurden vom Server nicht angenommen. Bitte überprüfen Sie alle Daten und versuchen Sie es dann erneut.')
                            .ok('Ok');
                        break;
                    default:
                        preset = $mdDialog
                            .alert()
                            .title('Fehler')
                            .textContent('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es noch einmal.')
                            .ok('Ok');

                        console.error(err);
                }

                if (preset) {
                    $mdDialog.show(preset);
                }
            });
    };

    me.back = function () {
        window.location.href = '#/user';
    }

    me.openDataguidelines = openDialog('/views/login/dialogDatenschutz.html');
    me.openImpressum = openDialog('/views/login/dialogImpressum.html');

    function openDialog(templateUrl) {
        return function openDialogFunction($event) {
            $event.stopPropagation();
            return $mdDialog.show({
                controller: function ($scope, $mdDialog) {
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                    $scope.close = function () {
                        $mdDialog.cancel();
                    };
                },
                templateUrl: templateUrl,
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        }
    }

    $mdSidenav('left').open();


}]);


