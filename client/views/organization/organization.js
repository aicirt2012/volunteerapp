app.controller('OrganizationCtrl', ['$scope', '$mdSidenav', 'organization', 'Organization', '$mdDialog', function($scope, $mdSidenav, organization, Organization, $mdDialog) {


    var me = $scope;
    me.organization = organization;
    me.editMode = false;
    me.accountView = false;

    me.breadcrumb = function(){
        return 'Einrichtungsverwaltung > Einrichtung';
    }

    me.back = function(){
        window.location.href = '#/organization';
    }

    me.openEdit = function(){
        me.organizationCopy = JSON.parse(JSON.stringify(me.organization));
        me.editMode = true;
    }

    me.abortEdit = function(){
        me.editMode = false;
        me.organization = me.organizationCopy;
    }

    me.submitEdit = function(){
        Organization.update(me.organization.id, me.organization, function(){
            console.log('organization updated');
        });
        me.editMode = false;
    }

    me.deleteOrganization = function(){
        $mdDialog.show({
            controller: function ($scope, $mdDialog, organization) {
                $scope.organization = organization;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.deleteOrganization = function() {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/organization/dialogDeleteOrganization.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            locals: {
                organization: me.organization
            }
        }).then(function() {
            Organization.del(me.organization.id, function(){
                window.location.href = '#/organization';
            });
       });
    }

    me.toggleSidenav = function(componentId){
        $mdSidenav(componentId).open();
    }

    $mdSidenav('left').open();
}]);

