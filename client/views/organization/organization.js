app.controller('OrganizationCtrl', ['$scope', '$mdSidenav', 'organization', 'Organization', '$routeParams', function($scope, $mdSidenav, organization, Organization, $routeParams) {


    var me = $scope;
    $routeParams.id
    me.organization = organization;

    me.breadcrumb = function(){
        return 'Einrichtungsverwaltung > ' + me.organization.name;
    }


    $mdSidenav('left')
        .open();
}]);

app.service('Organization', function($resource) {
    return $resource('/api/organization/:id');
});