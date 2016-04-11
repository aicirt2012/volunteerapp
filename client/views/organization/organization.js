app.controller('OrganizationCtrl', ['$scope', '$mdSidenav', 'organization', 'Organization', '$mdDialog', 'User', function ($scope, $mdSidenav, organization, Organization, $mdDialog, User) {


    var me = $scope;
    me.organization = organization;
    me.editMode = false;
    me.accountView = false;
    me.isAdmin = User.isAdmin();

    me.breadcrumb = function () {
        return 'Einrichtungsverwaltung > Einrichtung';
    }

    me.back = function () {
        window.location.href = '#/organization';
    }

    me.openEdit = function () {
        me.organizationCopy = JSON.parse(JSON.stringify(me.organization));
        me.editMode = true;
    }

    me.abortEdit = function () {
        me.editMode = false;
        me.organization = me.organizationCopy;
    }

    me.submitEdit = function () {
        Organization.update(me.organization.id, me.organization)
            .$promise
            .then(function () {
                me.editMode = false;
            })
            .catch(function () {
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
                console.error('could not persist orga:', arguments);
            });
    }

    me.deleteOrganization = function () {
        $mdDialog.show({
            controller: function ($scope, $mdDialog, organization) {
                $scope.organization = organization;
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.deleteOrganization = function () {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/organization/dialogDeleteOrganization.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            locals: {
                organization: me.organization
            }
        }).then(function () {
            Organization.del(me.organization.id, function () {
                window.location.href = '#/organization';
            });
        });
    }

    me.toggleSidenav = function (componentId) {
        $mdSidenav(componentId).open();
    }

    $mdSidenav('left').open();
}]);

