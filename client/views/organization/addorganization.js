app.controller('AddOrganizationCtrl', ['$scope', '$mdSidenav', 'Organization', function ($scope, $mdSidenav, Organization) {


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
            .catch(function () {
                var preset = $mdDialog.alert()
                    .title("Fehler")
                    .textContent("Es ist ein Fehler aufgetreten.")
                    .ok("Ok");

                $mdDialog.show(preset);
                console.error('could not persist orga:', arguments);
            });
    }

    $mdSidenav('left').open();
}]);

