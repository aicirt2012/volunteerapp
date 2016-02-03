app.controller('OrganizationCtrl', ['$scope', '$mdSidenav', 'organization', 'Organization', function($scope, $mdSidenav, organization, Organization) {


    var me = $scope;
    me.organization = organization;

    me.breadcrumb = function(){
        return 'Einrichtungsverwaltung > Einrichtung';
    }

    me.back = function(){
        window.location.href = '#/organization';
    }

    $mdSidenav('left').open();
}]);

