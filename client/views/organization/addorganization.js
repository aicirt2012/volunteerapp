app.controller('AddOrganizationCtrl', ['$scope', '$mdSidenav', 'Organization', '$mdDialog', function ($scope, $mdSidenav, Organization, $mdDialog) {


    var me = $scope;
    me.organization = {
        "name": '',
        "zip": '',
        "city": '',
        "street": '',
        "tel": '',
        "email": ''
    };

    me.breadcrumb = function () {
        return 'Einrichtungsverwaltung > Einrichtung Anlegen';
    }

    me.back = function () {
        window.location.href = '#/organization';
    }

    me.submitEdit = function () {
        Organization.save(null, me.organization)
            .$promise
            .then(function () {
                window.location.href = '#/organization';
            })
            .catch(function (err) {
                var preset;
                switch (err.status) {
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
                            .textContent('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
                            .ok('Ok');
                        break;
                }

                if (angular.isDefined(preset)) {
                    $mdDialog.show(preset);
                }
                console.error('could not create orga:', arguments)
            });
    }

    $mdSidenav('left').open();
}]);

